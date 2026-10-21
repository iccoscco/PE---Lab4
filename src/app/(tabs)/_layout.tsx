import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { theme } from '../../theme';

const icons: Record<string, string> = { index: '⌂', explorar: '⌕', favoritos: '♡', colecciones: '▦', acerca: 'ⓘ' };
export default function TabLayout() {
  return <Tabs screenOptions={({ route }) => ({
    headerShown: false,
    tabBarActiveTintColor: theme.ink,
    tabBarInactiveTintColor: '#9298A1',
    tabBarStyle: { backgroundColor: theme.white, borderTopColor: theme.line, height: 64, paddingBottom: 6, paddingTop: 5 },
    tabBarLabelStyle: { fontSize: 10, fontWeight: '700' },
    tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 24, lineHeight: 27 }}>{icons[route.name]}</Text>,
  })}>
    <Tabs.Screen name="index" options={{ title: 'Inicio' }} />
    <Tabs.Screen name="explorar" options={{ title: 'Explorar' }} />
    <Tabs.Screen name="favoritos" options={{ title: 'Favoritos' }} />
    <Tabs.Screen name="colecciones" options={{ title: 'Colecciones' }} />
    <Tabs.Screen name="acerca" options={{ title: 'Acerca' }} />
  </Tabs>;
}
