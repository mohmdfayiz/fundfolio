import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';

import AppLock from '@/components/AppLock';
import { GlobalContext } from '@/context/GlobalContext';
import { getToken, setToken, removeToken } from '@/utils/token';
import { authenticateAppLock, getAppLockPreference } from '@/utils/helpers';
import { initializeGlobalAuthFunctions } from '@/utils/authUtils';
import { APP_LOCK_ENUM } from '@/constants/data';
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
  const [useAppLock, setUseAppLock] = useState(false);
  const [isAppLockAuthenticated, setIsAppLockAuthenticated] = useState(false);

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

  const checkAuth = async () => {
    const token = await getToken('refreshToken');
    if (!isLogged && token) {
      try {
        const { data } = await getUser();
        setUser(data);
        setIsLogged(true);
      } catch (error) {
        // console.log('failed to get user', error);
      }
    }
  };

  const checkAppLock = async () => {
    const appLockPreference = await getAppLockPreference();
    setUseAppLock(appLockPreference);
    if (appLockPreference && isLogged) {
      const result = await authenticateAppLock();
      setIsAppLockAuthenticated(result === APP_LOCK_ENUM.AUTHENTICATED);
    } else {
      setIsAppLockAuthenticated(true);
    }
  };

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    initializeGlobalAuthFunctions(setIsLogged, setUseAppLock);
  }, []);

  useEffect(() => {
    const initialize = async () => {
      await checkAuth();
      await checkAppLock();
      if (loaded) {
        SplashScreen.hideAsync();
      }
    };

    initialize();
  }, [loaded]);

  if (!loaded && !error) {
    return null;
  }

  if (useAppLock && !isAppLockAuthenticated) {
    return (
      <AppLock onAuthenticate={() => setIsAppLockAuthenticated(true)} />
    );
  }

  return (
    <GlobalContext.Provider value={{ user, setUser, isLogged, setIsLogged, setToken, removeToken, useAppLock, setUseAppLock }}>
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