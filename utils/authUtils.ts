// utils/authUtils.ts
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import { setAppLockPreference } from '@/utils/helpers';
import { removeToken } from './token';

let setIsLoggedGlobal: (value: boolean) => void = () => { };
let setUseAppLockGlobal: (value: boolean) => void = () => { };

export const initializeGlobalAuthFunctions = (
  setIsLogged: (value: boolean) => void,
  setUseAppLock: (value: boolean) => void
) => {
  setIsLoggedGlobal = setIsLogged;
  setUseAppLockGlobal = setUseAppLock;
};

export const globalLogout = async (logoutType : 'MANUAL_LOGOUT' | 'SESSION_EXPIRED' = 'SESSION_EXPIRED') => {
  
  await removeToken('accessToken');
  await removeToken('refreshToken');
  await setAppLockPreference(false);
  setIsLoggedGlobal(false);
  setUseAppLockGlobal(false);

  if (logoutType === 'SESSION_EXPIRED') {
    router.replace('/sign-in');
    return Toast.show({
      type: 'info',
      text1: 'Session Expired, Please Login Again.',
    });
  }

  router.replace('/');
};