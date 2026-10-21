import { Stack } from 'expo-router';
import { LibraryProvider } from '../context/LibraryContext';
import { theme } from '../theme';

export default function RootLayout() {
  return <LibraryProvider><Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.paper } }} /></LibraryProvider>;
}
