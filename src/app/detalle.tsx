import { router, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Eyebrow, Screen } from '../components/Screen';
import { useLibrary } from '../context/LibraryContext';
import { coverUrl } from '../data/books';
import { theme } from '../theme';

export default function Detalle() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { findBook, isFavorite, toggleFavorite } = useLibrary();
  const book = findBook(id || '');
  if (!book) return <Screen><Pressable onPress={() => router.back()}><Text style={styles.back}>‹ Volver</Text></Pressable><Text style={styles.missing}>No se encontró la ficha del libro.</Text></Screen>;
  const image = coverUrl(book);
  return <Screen><Pressable accessibilityRole="button" onPress={() => router.back()}><Text style={styles.back}>‹ Volver al catálogo</Text></Pressable>
    <View style={styles.card}>{image ? <Image source={{ uri: image }} style={styles.cover} contentFit="cover" /> : <View style={styles.fallback}><Text style={styles.fallbackText}>{book.title.slice(0, 1)}</Text></View>}
      <Eyebrow>Ficha del libro</Eyebrow><Text style={styles.title}>{book.title}</Text><Text style={styles.author}>{book.author_name.join(', ') || 'Autor desconocido'}</Text>
      <View style={styles.rule} /><Text style={styles.label}>Primera publicación</Text><Text style={styles.value}>{book.first_publish_year ?? 'Fecha desconocida'}</Text>
      <Text style={styles.label}>Temas</Text><Text style={styles.value}>{book.subject?.slice(0, 3).join(' · ') || 'Sin temas disponibles'}</Text>
      <Text style={styles.description}>Consulta la ficha y guarda este libro para volver a él desde Favoritos.</Text>
      <Pressable accessibilityRole="button" onPress={() => toggleFavorite(book)} style={styles.button}><Text style={styles.buttonText}>{isFavorite(book) ? '♥  Guardado en favoritos' : '♡  Guardar en favoritos'}</Text></Pressable>
    </View>
  </Screen>;
}
const styles = StyleSheet.create({ back: { color: theme.ink, fontSize: 14, fontWeight: '800', marginBottom: 20 }, missing: { color: theme.muted, fontSize: 15 }, card: { backgroundColor: theme.white, borderColor: theme.line, borderWidth: 1, borderRadius: 20, padding: 22 }, cover: { width: 130, height: 185, borderRadius: 9, marginBottom: 23, backgroundColor: theme.soft }, fallback: { width: 130, height: 185, borderRadius: 9, marginBottom: 23, backgroundColor: theme.soft, alignItems: 'center', justifyContent: 'center' }, fallbackText: { fontFamily: 'Georgia', fontSize: 65, color: '#A7ADB5' }, title: { color: theme.ink, fontFamily: 'Georgia', fontWeight: '700', fontSize: 30, lineHeight: 34, marginTop: 11 }, author: { color: theme.muted, fontSize: 15, marginTop: 8 }, rule: { height: 1, backgroundColor: theme.line, marginVertical: 21 }, label: { color: theme.ink, fontSize: 12, fontWeight: '800', marginTop: 7 }, value: { color: theme.muted, fontSize: 14, lineHeight: 20, marginTop: 5, marginBottom: 12 }, description: { color: theme.muted, lineHeight: 22, marginTop: 10 }, button: { backgroundColor: theme.ink, borderRadius: 11, padding: 15, alignItems: 'center', marginTop: 22 }, buttonText: { color: theme.white, fontWeight: '800' } });
