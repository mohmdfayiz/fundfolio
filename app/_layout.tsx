import { useCallback, useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
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

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [initialized, setInitialized] = useState(false);
  const [isLogged, setIsLogged] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [appLockState, setAppLockState] = useState({
    useAppLock: false,
    isAuthenticated: false,
  });

  // Load fonts
  const [fontsLoaded, fontError] = useFonts({
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

  // Check authentication status and fetch user data
  const checkAuth = useCallback(async () => {
    try {
      const token = await getToken('refreshToken');
      if (token) {
        const { data } = await getUser();
        setUser(data);
        setIsLogged(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Authentication check failed:', error);
      return false;
    }
  }, []);

  // Check app lock status
  const checkAppLock = useCallback(async () => {
    try {
      const appLockPreference = await getAppLockPreference();
      setAppLockState(prev => ({ ...prev, useAppLock: appLockPreference }));

      if (appLockPreference) {
        const result = await authenticateAppLock();
        const isAuthenticated = result === APP_LOCK_ENUM.AUTHENTICATED;
        setAppLockState(prev => ({ ...prev, isAuthenticated }));
        return isAuthenticated;
      }

      setAppLockState(prev => ({ ...prev, isAuthenticated: true }));
      return true;
    } catch (error) {
      console.error('App lock check failed:', error);
      return false;
    }
  }, []);

  // Initialize the app
  const initializeApp = useCallback(async () => {
    try {
      // Wait for fonts to load
      if (!fontsLoaded) return;

      // Check authentication and fetch user data
      const isAuthenticated = await checkAuth();

      // Check app lock
      const isAppLockAuthenticated = await checkAppLock();

      // Initialize global auth functions
      initializeGlobalAuthFunctions(
        setIsLogged,
        (useAppLock) => setAppLockState(prev => ({ ...prev, useAppLock }))
      );

      setInitialized(true);
      await SplashScreen.hideAsync();
    } catch (error) {
      console.error('App initialization failed:', error);
      setInitialized(true);
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, checkAuth, checkAppLock]);

  // Handle font loading error
  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  // Initialize app when fonts are loaded
  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  // Show nothing while loading
  if (!initialized || !fontsLoaded) {
    return null;
  }

  // Show app lock screen if needed
  if (appLockState.useAppLock && !appLockState.isAuthenticated) {
    return (
      <AppLock
        onAuthenticate={() =>
          setAppLockState(prev => ({ ...prev, isAuthenticated: true }))
        }
      />
    );
  }

  // Global context value
  const globalContextValue = {
    user,
    setUser,
    isLogged,
    setIsLogged,
    setToken,
    removeToken,
    useAppLock: appLockState.useAppLock,
    setUseAppLock: (value: boolean) => {
      setAppLockState(prev => ({ ...prev, useAppLock: value }));
    }
  };

  return (
    <GlobalContext.Provider value={globalContextValue}>
      <Slot />
      <StatusBar style="inverted" />
      <Toast />
    </GlobalContext.Provider>
  );
}