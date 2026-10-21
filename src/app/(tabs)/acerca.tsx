import { StyleSheet, Text, View } from 'react-native';
import { Eyebrow, Screen } from '../../components/Screen';
import { theme } from '../../theme';

export default function Acerca() {
  return <Screen><View style={styles.logo}><Text style={styles.logoText}>L</Text></View><Eyebrow>Sobre el proyecto</Eyebrow><Text style={styles.title}>Libre es tu lugar para leer.</Text><Text style={styles.intro}>Una biblioteca digital sencilla para descubrir libros, consultar fichas y guardar tus próximos favoritos.</Text>
    <View style={styles.chips}>{['React Native', 'Expo Router', 'TypeScript', 'Open Library API', 'AsyncStorage'].map((item) => <Text key={item} style={styles.chip}>{item}</Text>)}</View>
    <View style={styles.note}><Text style={styles.noteTitle}>Datos abiertos</Text><Text style={styles.noteText}>Las búsquedas y portadas proceden de Open Library. Los favoritos se guardan en este dispositivo.</Text></View>
    <Text style={styles.origin}>Adaptación móvil del proyecto PE-Lab3 de iccoscco.</Text>
  </Screen>;
}
const styles = StyleSheet.create({ logo: { width: 68, height: 68, backgroundColor: theme.ink, borderRadius: 17, borderBottomLeftRadius: 5, justifyContent: 'center', alignItems: 'center', marginBottom: 35 }, logoText: { color: theme.white, fontSize: 43, fontWeight: '700', fontFamily: 'Georgia' }, title: { color: theme.ink, fontSize: 45, lineHeight: 48, fontWeight: '800', letterSpacing: -1.8, marginTop: 14 }, intro: { color: theme.muted, fontSize: 16, lineHeight: 25, marginTop: 19 }, chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 30 }, chip: { color: theme.ink, backgroundColor: theme.soft, borderRadius: 8, paddingHorizontal: 11, paddingVertical: 8, fontSize: 12, fontWeight: '700' }, note: { backgroundColor: theme.white, borderColor: theme.line, borderWidth: 1, borderRadius: 16, padding: 20, marginTop: 31 }, noteTitle: { color: theme.ink, fontWeight: '800' }, noteText: { color: theme.muted, fontSize: 13, lineHeight: 20, marginTop: 6 }, origin: { color: theme.muted, fontSize: 11, marginTop: 22 } });
