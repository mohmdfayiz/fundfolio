import { useState } from 'react';
import { router } from 'expo-router'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message';
import { useGlobalContext } from '@/context/GlobalContext';
import { signup } from '@/services/auth'

export default function SignUp() {

  const [userData, setUserData] = useState({ username: '', email: '' });
  const { setUser, setToken } = useGlobalContext();

  const handleSignUp = async () => {
    if (!userData.username || !userData.email || !userData.email.includes('@')) {
      return Toast.show({
        type: 'error',
        text1: 'Please enter a valid username and email',
      })
    }
    try {
      const { data } = await signup(userData.username, userData.email)
      await setToken('accessToken', data.accessToken)
      await setToken('refreshToken', data.refreshToken)
      setUser(data.user)
      router.push('/password')
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Oops! Something went wrong!',
        text2: 'Make sure you havent already signed up with this email.',
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
          placeholder='Username'
          keyboardType='default'
          className='w-full border border-slate-400 p-4 rounded-xl font-pregular '
          onChangeText={(text) => setUserData({ ...userData, username: text })}
        />
        <TextInput
          placeholder='Email'
          keyboardType='email-address'
          className='w-full border border-slate-400 p-4 rounded-xl font-pregular '
          onChangeText={(text) => setUserData({ ...userData, email: text })}
        />
        <TouchableOpacity onPress={handleSignUp} className='w-full border border-green bg-green/50 p-4 rounded-xl'>
          <Text className='text-center font-psemibold text-base'>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}