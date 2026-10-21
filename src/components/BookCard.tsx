import { router } from 'expo-router';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useLibrary } from '../context/LibraryContext';
import { type Book, coverUrl } from '../data/books';
import { theme } from '../theme';

export function BookCard({ book }: { book: Book }) {
  const { width } = useWindowDimensions();
  const { isFavorite, toggleFavorite } = useLibrary();
  const image = coverUrl(book);
  const cardWidth = Math.min(260, (Math.min(width, 700) - 54) / 2);
  return <View style={[styles.card, { width: cardWidth }]}>
    <Pressable accessibilityRole="button" accessibilityLabel={`Ver ficha de ${book.title}`} onPress={() => router.push({ pathname: '/detalle', params: { id: book.key } })} style={styles.coverWrap}>
      {image ? <Image source={{ uri: image }} style={styles.cover} contentFit="cover" transition={180} /> : <Text style={styles.fallback}>{book.title.slice(0, 1)}</Text>}
    </Pressable>
    <View style={styles.body}>
      <View style={styles.meta}><Text style={styles.year}>{book.first_publish_year ?? 's/f'}</Text><Pressable accessibilityRole="button" accessibilityLabel={isFavorite(book) ? `Quitar ${book.title} de favoritos` : `Guardar ${book.title} en favoritos`} onPress={() => toggleFavorite(book)}><Text style={styles.heart}>{isFavorite(book) ? '♥' : '♡'}</Text></Pressable></View>
      <Text style={styles.title} numberOfLines={2}>{book.title}</Text>
      <Text style={styles.author} numberOfLines={1}>{book.author_name[0] || 'Autor desconocido'}</Text>
      <Pressable accessibilityRole="button" onPress={() => router.push({ pathname: '/detalle', params: { id: book.key } })}><Text style={styles.link}>Ver ficha  ↗</Text></Pressable>
    </View>
  </View>;
}

export function BookGrid({ books }: { books: Book[] }) {
  return <View style={styles.grid}>{books.map((book) => <BookCard key={book.key} book={book} />)}</View>;
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between' },
  card: { backgroundColor: theme.white, borderColor: theme.line, borderWidth: 1, borderRadius: 16, overflow: 'hidden', marginBottom: 4 },
  coverWrap: { width: '100%', aspectRatio: 0.82, backgroundColor: theme.soft, alignItems: 'center', justifyContent: 'center' },
  cover: { width: '100%', height: '100%' }, fallback: { fontSize: 70, fontFamily: 'Georgia', color: '#A7ADB5' },
  body: { padding: 12, minHeight: 126 }, meta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, year: { color: theme.muted, fontSize: 11 }, heart: { color: theme.ink, fontSize: 24, lineHeight: 25 },
  title: { color: theme.ink, fontSize: 15, fontWeight: '700', marginTop: 7, minHeight: 35 }, author: { color: theme.muted, fontSize: 12, marginTop: 3 }, link: { color: theme.ink, fontSize: 12, fontWeight: '700', marginTop: 11 },
});
