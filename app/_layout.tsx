import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';

import { GlobalContext } from '@/context/GlobalContext';
import { getToken, setToken, removeToken } from '@/utils/token';
import { getUser } from '@/services/user';
import { User } from '@/types';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const [loaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  const checkToken = async () => {
    const token = await getToken();
    if (token) {
      try {
        const { data } = await getUser();
        setUser(data);
        setIsLogged(true);
      } catch (error) {
        await removeToken();
      }
    }
  };

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    checkToken().then(() => {
      if (loaded) {
        SplashScreen.hideAsync();
      }
    });
  }, [loaded]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <GlobalContext.Provider value={{ user, setUser, isLogged, setIsLogged, setToken, removeToken }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(screens)" options={{ headerShown: false }} />
      </Stack >
      <Toast />
      <StatusBar style="inverted" />
    </GlobalContext.Provider >
  )
}