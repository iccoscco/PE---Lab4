import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Eyebrow, Intro, PageTitle, Screen } from '../../components/Screen';
import { useLibrary } from '../../context/LibraryContext';
import { theme } from '../../theme';

export default function Colecciones() {
  const { favorites, searchBooks } = useLibrary();
  const openSearch = (term: string) => { void searchBooks(term); router.navigate('/explorar'); };
  return <Screen><Eyebrow>Organiza tus lecturas</Eyebrow><PageTitle>Colecciones.</PageTitle><Intro>Rutas rápidas para explorar lecturas por tema.</Intro>
    <Pressable accessibilityRole="button" onPress={() => router.navigate('/favoritos')} style={[styles.card, styles.sand]}><Text style={styles.symbol}>✦</Text><View><Text style={styles.cardTitle}>Lecturas pendientes</Text><Text style={styles.cardSub}>{favorites.length} {favorites.length === 1 ? 'libro guardado' : 'libros guardados'}</Text></View><Text style={styles.arrow}>→</Text></Pressable>
    <Pressable accessibilityRole="button" onPress={() => openSearch('classic literature')} style={[styles.card, styles.rose]}><Text style={styles.symbol}>◒</Text><View><Text style={styles.cardTitle}>Clásicos para volver</Text><Text style={styles.cardSub}>Buscar clásicos en Open Library</Text></View><Text style={styles.arrow}>→</Text></Pressable>
    <Pressable accessibilityRole="button" onPress={() => openSearch('fantasy adventure')} style={[styles.card, styles.sage]}><Text style={styles.symbol}>◌</Text><View><Text style={styles.cardTitle}>Viajes imaginarios</Text><Text style={styles.cardSub}>Buscar fantasía y aventura</Text></View><Text style={styles.arrow}>→</Text></Pressable>
    <View style={styles.tip}><Text style={styles.tipSymbol}>✎</Text><View style={styles.tipText}><Text style={styles.tipTitle}>Consejo de lectura</Text><Text style={styles.tipCopy}>Reserva unos minutos cada día para continuar tu lectura.</Text></View></View>
  </Screen>;
}
const styles = StyleSheet.create({ card: { borderRadius: 17, padding: 20, minHeight: 145, marginBottom: 13, justifyContent: 'space-between', borderWidth: 1, borderColor: theme.line }, sand: { backgroundColor: '#EEF0F3' }, rose: { backgroundColor: '#E8EAEE' }, sage: { backgroundColor: '#E1E4E9' }, symbol: { color: theme.ink, fontSize: 27 }, cardTitle: { color: theme.ink, fontSize: 17, fontWeight: '800' }, cardSub: { color: theme.muted, fontSize: 12, marginTop: 3 }, arrow: { color: theme.ink, fontSize: 22, position: 'absolute', right: 18, bottom: 16 }, tip: { flexDirection: 'row', backgroundColor: theme.white, borderColor: theme.line, borderWidth: 1, borderRadius: 15, padding: 20, marginTop: 20, gap: 14 }, tipSymbol: { color: theme.ink, fontSize: 24 }, tipText: { flex: 1 }, tipTitle: { color: theme.ink, fontWeight: '800' }, tipCopy: { color: theme.muted, fontSize: 13, lineHeight: 19, marginTop: 5 } });
