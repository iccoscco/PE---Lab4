export type Book = {
  key: string;
  title: string;
  author_name: string[];
  first_publish_year?: number;
  cover_i?: number;
  subject?: string[];
};

// Selección inicial tomada del proyecto web PE-Lab3.
export const recommendedBooks: Book[] = [
  { key: '/works/OL274505W', title: 'Cien años de soledad', author_name: ['Gabriel García Márquez'], first_publish_year: 1967, cover_i: 12627383, subject: ['Realismo mágico', 'Familia'] },
  { key: '/works/OL10263W', title: 'El principito', author_name: ['Antoine de Saint-Exupéry'], first_publish_year: 1943, cover_i: 10708272, subject: ['Amistad', 'Fantasía'] },
  { key: '/works/OL66554W', title: 'Orgullo y prejuicio', author_name: ['Jane Austen'], first_publish_year: 1813, cover_i: 14348537, subject: ['Romance', 'Clásicos'] },
  { key: '/works/OL1905255W', title: 'La casa de los espíritus', author_name: ['Isabel Allende'], first_publish_year: 1982, cover_i: 3205226, subject: ['Familia', 'Realismo mágico'] },
  { key: '/works/OL1168083W', title: '1984', author_name: ['George Orwell'], first_publish_year: 1949, cover_i: 9267242, subject: ['Distopía', 'Ciencia ficción'] },
  { key: '/works/OL2625457W', title: 'Tokio blues', author_name: ['Haruki Murakami'], first_publish_year: 1987, cover_i: 2237620, subject: ['Romance', 'Ficción'] },
];

export function coverUrl(book: Book, size: 'M' | 'L' = 'M') {
  return book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-${size}.jpg` : null;
}

export function normalizeBook(value: unknown): Book | null {
  if (!value || typeof value !== 'object') return null;
  const raw = value as Record<string, unknown>;
  if (typeof raw.key !== 'string' || typeof raw.title !== 'string') return null;
  return {
    key: raw.key,
    title: raw.title,
    author_name: Array.isArray(raw.author_name) ? raw.author_name.filter((x): x is string => typeof x === 'string') : [],
    first_publish_year: typeof raw.first_publish_year === 'number' ? raw.first_publish_year : undefined,
    cover_i: typeof raw.cover_i === 'number' ? raw.cover_i : undefined,
    subject: Array.isArray(raw.subject) ? raw.subject.filter((x): x is string => typeof x === 'string') : undefined,
  };
}
