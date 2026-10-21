import { router } from 'expo-router';
import { type ReactNode } from 'react';
import { Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';

export function Screen({ children }: { children: ReactNode }) {
  return <SafeAreaView style={styles.safe}><StatusBar barStyle="dark-content" /><View style={styles.topbar}>
    <Pressable accessibilityRole="button" accessibilityLabel="Ir a Inicio" onPress={() => router.navigate('/')} style={styles.brand}><View style={styles.mark}><Text style={styles.markText}>L</Text></View><Text style={styles.brandText}>libre</Text></Pressable>
    <Pressable accessibilityRole="button" accessibilityLabel="Abrir colecciones" onPress={() => router.navigate('/colecciones')} style={styles.iconButton}><Text style={styles.icon}>▦</Text></Pressable>
  </View><ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">{children}</ScrollView></SafeAreaView>;
}

export function Eyebrow({ children }: { children: ReactNode }) { return <Text style={styles.eyebrow}>{children}</Text>; }
export function PageTitle({ children }: { children: ReactNode }) { return <Text style={styles.pageTitle}>{children}</Text>; }
export function Intro({ children }: { children: ReactNode }) { return <Text style={styles.intro}>{children}</Text>; }

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.paper }, topbar: { height: 65, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomColor: theme.line, borderBottomWidth: 1 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 9 }, mark: { width: 33, height: 33, borderRadius: 9, borderBottomLeftRadius: 3, backgroundColor: theme.ink, alignItems: 'center', justifyContent: 'center' }, markText: { color: theme.white, fontSize: 23, fontWeight: '700', fontFamily: 'Georgia' }, brandText: { color: theme.ink, fontSize: 21, fontWeight: '800', letterSpacing: -1 }, iconButton: { padding: 8 }, icon: { fontSize: 24, color: theme.ink },
  content: { paddingHorizontal: 20, paddingTop: 27, paddingBottom: 35, width: '100%', maxWidth: 700, alignSelf: 'center' }, eyebrow: { color: theme.ink, fontSize: 10, fontWeight: '800', letterSpacing: 1.4, textTransform: 'uppercase' }, pageTitle: { color: theme.ink, fontSize: 40, lineHeight: 44, fontWeight: '800', letterSpacing: -1.6, marginTop: 11, marginBottom: 12 }, intro: { color: theme.muted, fontSize: 15, lineHeight: 22, marginBottom: 22 },
});
