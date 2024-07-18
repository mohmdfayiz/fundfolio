// components/AppLock.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '@/context/GlobalContext';
import { authenticateAppLock } from '@/utils/helpers';
import { APP_LOCK_ENUM } from '@/constants/data';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';

interface AppLockProps {
  children: React.ReactNode;
}

let globalLogout: () => void = () => { };

export default function AppLock({ children }: AppLockProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { useAppLock, setIsLogged, setUseAppLock } = useGlobalContext();

  useEffect(() => {
    checkAppLockPreference();
  }, []);

  const checkAppLockPreference = async () => {
    if (useAppLock) {
      const result = await authenticateAppLock();
      if (result !== APP_LOCK_ENUM.NOT_AUTHENTICATED) {
        setIsAuthenticated(true);
      }
    } else {
      setIsAuthenticated(true);
    }
  };

  const handleRetry = async () => {
    const result = await authenticateAppLock();
    if (result === APP_LOCK_ENUM.AUTHENTICATED) {
      setIsAuthenticated(true);
    }
  };


  const logout = () => {
    setUseAppLock(false);
    setIsLogged(false);
    router.replace('/sign-in');
    Toast.show({
      type: 'info',
      text1: 'Session Expired, Please Login Again.',
    })
  };

  globalLogout = logout;

  if (useAppLock && !isAuthenticated) {
    return (
      <SafeAreaView className='h-full'>
        <View className='h-1/2 items-center justify-center p-4'>
          <Text className="text-4xl font-pbold text-green">fundfolio<Text className='text-red'>.</Text></Text>
          <Text className='text-sm font-pregular text-slate-400'>Money Matters !</Text>
        </View>
        <View className='h-1/2 w-full items-center justify-end px-8 py-4'>
          <TouchableOpacity className='w-full border border-green bg-green/50 p-4 rounded-xl' onPress={handleRetry}>
            <Text className='text-center font-psemibold text-base'>Unlock App</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return <>{children}</>;
}

export { globalLogout };