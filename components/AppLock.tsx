import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';

import { useGlobalContext } from '@/context/GlobalContext';
import { authenticateAppLock } from '@/utils/helpers';
import { APP_LOCK_ENUM } from '@/constants/data';

interface AppLockProps {
  onAuthenticate: () => void;
}

let globalLogout: () => void = () => { };

export default function AppLock({ onAuthenticate }: AppLockProps) {

  const { setIsLogged, setUseAppLock } = useGlobalContext();

  const handleRetry = async () => {
    const result = await authenticateAppLock();
    if (result === APP_LOCK_ENUM.AUTHENTICATED) {
      onAuthenticate();
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

export { globalLogout };