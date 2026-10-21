import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { BookGrid } from '../../components/BookCard';
import { Eyebrow, Intro, PageTitle, Screen } from '../../components/Screen';
import { useLibrary } from '../../context/LibraryContext';
import { theme } from '../../theme';

export default function Explorar() {
  const { books, query, setQuery, loading, error, searchBooks } = useLibrary();
  const search = () => void searchBooks(query);
  return <Screen><Eyebrow>Explorar</Eyebrow><PageTitle>Descubre tu próxima historia.</PageTitle><Intro>Busca libros por título, autor o tema en Open Library.</Intro>
    <View style={styles.search}><TextInput accessibilityLabel="Buscar en Open Library" placeholder="Buscar libros..." placeholderTextColor="#9AA0A8" style={styles.input} value={query} onChangeText={setQuery} onSubmitEditing={search} returnKeyType="search" /><Pressable accessibilityRole="button" onPress={search} style={styles.button}><Text style={styles.buttonText}>Buscar</Text></Pressable></View>
    <Text style={styles.count}>{loading ? 'Buscando...' : `${books.length} ${books.length === 1 ? 'resultado' : 'resultados'}`}</Text>
    {loading ? <ActivityIndicator color={theme.ink} size="large" style={styles.loading} /> : error ? <View style={styles.message}><Text style={styles.error}>{error}</Text><Pressable onPress={search}><Text style={styles.retry}>Reintentar</Text></Pressable></View> : books.length ? <BookGrid books={books} /> : <View style={styles.message}><Text style={styles.error}>No se encontraron libros. Prueba otra búsqueda.</Text></View>}
  </Screen>;
}
const styles = StyleSheet.create({
  search: { flexDirection: 'row', backgroundColor: theme.white, borderWidth: 1, borderColor: theme.line, borderRadius: 13, alignItems: 'center', paddingLeft: 13, paddingRight: 5, minHeight: 54 }, input: { flex: 1, minWidth: 0, color: theme.ink, fontSize: 14 }, button: { backgroundColor: theme.ink, borderRadius: 9, paddingHorizontal: 15, paddingVertical: 11 }, buttonText: { color: theme.white, fontWeight: '700', fontSize: 12 }, count: { color: theme.muted, fontSize: 12, marginVertical: 22 }, loading: { marginTop: 50 }, message: { backgroundColor: theme.white, padding: 28, borderRadius: 16, borderWidth: 1, borderColor: theme.line, alignItems: 'center' }, error: { color: theme.muted, fontSize: 14, lineHeight: 21, textAlign: 'center' }, retry: { color: theme.ink, fontWeight: '800', marginTop: 15 },
});
