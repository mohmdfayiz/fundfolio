import { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Redirect, router } from 'expo-router'
import Toast from 'react-native-toast-message';
import { useGlobalContext } from '@/context/GlobalContext';
import { signin } from '@/services/auth';

export default function SingIn() {

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { setUser, isLogged, setIsLogged, setToken } = useGlobalContext();

  async function handleSignIn() {
    if (!credentials.email || credentials.password.length < 6) {
      return Toast.show({
        type: 'error',
        text1: 'Invalid credentials',
        position: 'top',
      })
    }

    try {
      const response = await signin(credentials.email, credentials.password)
      await setToken(response?.data.token);
      setUser(response?.data.user);
      setIsLogged(true);
      router.replace('/home');
    } catch (error) {
      console.log(error)
      Toast.show({
        type: 'error',
        text1: 'Invalid credentials',
        position: 'top',
      })
    }
  }

  if (isLogged) {
    return <Redirect href='/home' />
  }

  return (
    <SafeAreaView className='h-full'>
      <View className='h-1/2 items-center justify-center p-4'>
        <Text className="text-4xl font-pbold text-green">fundfolio<Text className='text-red'>.</Text></Text>
        <Text className='text-sm font-pregular text-slate-400'>Money Matters !</Text>
      </View>
      <View className='h-1/2 items-center justify-end px-8 gap-4'>
        <TextInput
          placeholder='Email'
          keyboardType='email-address'
          className='w-full border border-slate-400 p-4 rounded-xl font-pregular '
          onChangeText={(text) => setCredentials({ ...credentials, email: text })}
        />
        <TextInput
          placeholder='Password'
          secureTextEntry
          className='w-full border border-slate-400 p-4 rounded-xl font-pregular'
          onChangeText={(text) => setCredentials({ ...credentials, password: text })}
        />
        <Pressable onPress={handleSignIn} className='w-full border border-green bg-green/50 p-4 rounded-xl'>
          <Text className='text-center font-psemibold text-base'>Sing In</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}