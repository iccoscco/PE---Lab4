import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { BookGrid } from '../../components/BookCard';
import { Eyebrow, Screen } from '../../components/Screen';
import { useLibrary } from '../../context/LibraryContext';
import { recommendedBooks } from '../../data/books';
import { theme } from '../../theme';

export default function Inicio() {
  const { favorites, searchBooks } = useLibrary();
  const [term, setTerm] = useState('');
  const search = () => { void searchBooks(term); router.navigate('/explorar'); };
  return <Screen>
    <Eyebrow>Biblioteca personal  ·  {favorites.length} guardados</Eyebrow>
    <Text style={styles.title}>Leer es otra forma de <Text style={styles.italic}>viajar.</Text></Text>
    <Text style={styles.subtitle}>Encuentra historias para tu próximo destino.</Text>
    <View style={styles.search}><Text style={styles.searchIcon}>⌕</Text><TextInput accessibilityLabel="Buscar libros" placeholder="Título, autor o tema" placeholderTextColor="#9AA0A8" value={term} onChangeText={setTerm} onSubmitEditing={search} returnKeyType="search" style={styles.input} /><Pressable accessibilityRole="button" onPress={search} style={styles.searchButton}><Text style={styles.searchButtonText}>Buscar</Text></Pressable></View>
    <View style={styles.sectionRow}><View><Eyebrow>Para empezar</Eyebrow><Text style={styles.sectionTitle}>Recomendados para ti</Text></View><Pressable onPress={() => router.navigate('/explorar')}><Text style={styles.link}>Ver todos  →</Text></Pressable></View>
    <BookGrid books={recommendedBooks.slice(0, 4)} />
    <View style={styles.quote}><Text style={styles.quoteText}>“Cada libro abre un camino distinto.”</Text><Text style={styles.quoteSmall}>Encuentra tu próxima lectura en Libre.</Text></View>
  </Screen>;
}

const styles = StyleSheet.create({
  title: { color: theme.ink, fontSize: 44, lineHeight: 47, fontWeight: '800', letterSpacing: -2, marginTop: 20 }, italic: { fontFamily: 'Georgia', fontWeight: '400', fontStyle: 'italic' }, subtitle: { color: theme.muted, fontSize: 15, marginTop: 14, marginBottom: 26 },
  search: { backgroundColor: theme.white, borderWidth: 1, borderColor: theme.line, borderRadius: 14, minHeight: 56, flexDirection: 'row', alignItems: 'center', paddingLeft: 14, paddingRight: 6 }, searchIcon: { fontSize: 25, color: theme.ink }, input: { flex: 1, marginLeft: 8, minWidth: 0, color: theme.ink, fontSize: 13 }, searchButton: { backgroundColor: theme.ink, paddingHorizontal: 13, paddingVertical: 12, borderRadius: 9 }, searchButtonText: { color: theme.white, fontWeight: '700', fontSize: 12 },
  sectionRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 44, marginBottom: 19, gap: 8 }, sectionTitle: { color: theme.ink, fontSize: 23, fontWeight: '800', marginTop: 6, letterSpacing: -0.6 }, link: { color: theme.ink, fontWeight: '700', fontSize: 12, marginBottom: 2 },
  quote: { backgroundColor: theme.soft, borderRadius: 18, padding: 26, marginTop: 32, alignItems: 'center' }, quoteText: { color: theme.ink, fontFamily: 'Georgia', fontStyle: 'italic', fontSize: 19, textAlign: 'center' }, quoteSmall: { color: theme.muted, fontSize: 12, marginTop: 10 },
});
