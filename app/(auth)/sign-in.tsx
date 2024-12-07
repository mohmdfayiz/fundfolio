import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Redirect, router } from 'expo-router'
import Toast from 'react-native-toast-message';
import { useGlobalContext } from '@/context/GlobalContext';
import { signin } from '@/services/auth';

export default function SingIn() {

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { setUser, setIsLogged, setToken } = useGlobalContext();

  async function handleSignIn() {
    if (!credentials.email || credentials.password.length < 6) {
      return Toast.show({
        type: 'error',
        text1: 'Invalid credentials',
      })
    }

    try {
      const { data } = await signin(credentials.email, credentials.password)
      await setToken('accessToken', data.accessToken)
      await setToken('refreshToken', data.refreshToken)
      setUser(data.user);
      setIsLogged(true);
      router.replace('/home');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Invalid credentials',
      })
    }
  }

  return (
    <SafeAreaView className='h-full'>
      <View className='h-1/2 items-center justify-center p-4'>
        <Text className="text-4xl font-pbold text-green">fundfolio<Text className='text-red'>.</Text></Text>
        <Text className='text-sm font-pregular text-slate-400'>Money Matters !</Text>
      </View>
      <View className='h-1/2 items-center justify-end px-8 py-4 gap-4'>
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
        <TouchableOpacity onPress={handleSignIn} className='w-full border border-green bg-green/50 p-4 rounded-xl'>
          <Text className='text-center font-psemibold text-base'>Sign In</Text>
        </TouchableOpacity>
        {/* <Text className='text-right font-pregular text-sm'>Forgot Password ?</Text> */}
      </View>
    </SafeAreaView>
  )
}