import { useState } from 'react';
import { router } from 'expo-router'
import { View, Text, Pressable, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message';
import { useGlobalContext } from '@/context/GlobalContext';
import { setPassword } from '@/services/auth';

export default function SignUp() {

  const [entry, setEntry] = useState({ password: '', confirmPassword: '' });
  const { isLogged, setIsLogged } = useGlobalContext();

  async function handlePassword() {
    // password validation
    if (entry.password !== entry.confirmPassword || entry.password.length < 6) {
      return Toast.show({
        type: 'error',
        text1: entry.password.length < 6 ? 'Password too short' : 'Passwords do not match',
        position: 'top',
      })
    };

    try {
      await setPassword(entry.password);
      if (!isLogged) {
        setIsLogged(true);
        router.replace('/home');
      } else {
        router.back();
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Oops, Something went wrong!',
        position: 'top',
      })
    }
  }

  return (
    <SafeAreaView className='h-full'>
      <View className='h-1/2 items-center justify-center p-4'>
        <Text className="text-4xl font-pbold text-green">fundfolio<Text className='text-red'>.</Text></Text>
        <Text className='text-sm font-pregular text-slate-400'>Money Matters !</Text>
      </View>
      <View className='h-1/2 items-center justify-end px-8 gap-4'>
        <TextInput
          secureTextEntry
          placeholder='Password'
          className='w-full border border-slate-400 p-4 rounded-xl font-pregular '
          onChangeText={(text) => setEntry({ ...entry, password: text })}
        />
        <TextInput
          secureTextEntry
          placeholder='Confirm Password'
          className='w-full border border-slate-400 p-4 rounded-xl font-pregular '
          onChangeText={(text) => setEntry({ ...entry, confirmPassword: text })}
        />
        <Pressable onPress={handlePassword} className='w-full border border-green bg-green/50 p-4 rounded-xl'>
          <Text className='text-center font-psemibold text-base'>Save Password</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}