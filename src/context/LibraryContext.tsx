import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { type Book, normalizeBook, recommendedBooks } from '../data/books';

const FAVORITES_KEY = 'libre-favorites-v1';
type LibraryState = {
  books: Book[];
  favorites: Book[];
  query: string;
  setQuery: (value: string) => void;
  loading: boolean;
  error: string;
  searchBooks: (query: string) => Promise<void>;
  toggleFavorite: (book: Book) => void;
  isFavorite: (book: Book) => boolean;
  findBook: (key: string) => Book | undefined;
};
const LibraryContext = createContext<LibraryState | null>(null);

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>(recommendedBooks);
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const hydrated = useRef(false);
  const requestId = useRef(0);

  useEffect(() => {
    AsyncStorage.getItem(FAVORITES_KEY)
      .then((saved) => {
        if (!saved) return;
        const values: unknown = JSON.parse(saved);
        if (Array.isArray(values)) setFavorites(values.map(normalizeBook).filter((x): x is Book => x !== null));
      })
      .catch(() => setError('No se pudieron cargar los favoritos guardados.'))
      .finally(() => { hydrated.current = true; });
  }, []);

  useEffect(() => {
    if (hydrated.current) AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)).catch(() => setError('No se pudieron guardar los favoritos.'));
  }, [favorites]);

  const searchBooks = useCallback(async (input: string) => {
    const term = input.trim();
    setQuery(term);
    setError('');
    const current = ++requestId.current;
    if (!term) { setBooks(recommendedBooks); setLoading(false); return; }
    setLoading(true);
    try {
      const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(term)}&limit=12&fields=key,title,author_name,first_publish_year,cover_i,subject`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data: unknown = await response.json();
      const docs = (data as { docs?: unknown[] }).docs;
      if (current === requestId.current) setBooks(Array.isArray(docs) ? docs.map(normalizeBook).filter((x): x is Book => x !== null) : []);
    } catch {
      if (current === requestId.current) { setBooks([]); setError('No se pudo consultar Open Library. Comprueba tu conexión e inténtalo de nuevo.'); }
    } finally { if (current === requestId.current) setLoading(false); }
  }, []);

  const toggleFavorite = useCallback((book: Book) => {
    setFavorites((current) => current.some((item) => item.key === book.key)
      ? current.filter((item) => item.key !== book.key) : [...current, book]);
  }, []);
  const isFavorite = useCallback((book: Book) => favorites.some((item) => item.key === book.key), [favorites]);
  const findBook = useCallback((key: string) => [...books, ...favorites, ...recommendedBooks].find((item) => item.key === key), [books, favorites]);

  return <LibraryContext.Provider value={{ books, favorites, query, setQuery, loading, error, searchBooks, toggleFavorite, isFavorite, findBook }}>{children}</LibraryContext.Provider>;
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (!context) throw new Error('LibraryProvider requerido');
  return context;
}
