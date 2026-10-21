import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BookGrid } from '../../components/BookCard';
import { Eyebrow, Intro, PageTitle, Screen } from '../../components/Screen';
import { useLibrary } from '../../context/LibraryContext';
import { theme } from '../../theme';

export default function Favoritos() {
  const { favorites } = useLibrary();
  return <Screen><Eyebrow>Tu espacio</Eyebrow><PageTitle>Favoritos.</PageTitle><Intro>Guarda los libros que quieres leer después.</Intro>
    {favorites.length ? <BookGrid books={favorites} /> : <View style={styles.empty}><Text style={styles.heart}>♡</Text><Text style={styles.title}>Aún no tienes favoritos</Text><Text style={styles.copy}>Explora el catálogo y toca el corazón de un libro para guardarlo aquí.</Text><Pressable accessibilityRole="button" onPress={() => router.navigate('/explorar')} style={styles.button}><Text style={styles.buttonText}>Explorar libros</Text></Pressable></View>}
  </Screen>;
}
const styles = StyleSheet.create({ empty: { backgroundColor: theme.white, borderColor: theme.line, borderWidth: 1, borderRadius: 18, padding: 28, alignItems: 'center', marginTop: 10 }, heart: { color: theme.ink, fontSize: 55 }, title: { color: theme.ink, fontSize: 19, fontWeight: '800', marginTop: 12 }, copy: { color: theme.muted, textAlign: 'center', lineHeight: 21, marginTop: 9, marginBottom: 20 }, button: { backgroundColor: theme.ink, borderRadius: 10, paddingVertical: 13, paddingHorizontal: 20 }, buttonText: { color: theme.white, fontWeight: '700' } });
