import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import Toast from 'react-native-toast-message';
import { useGlobalContext } from '@/context/GlobalContext';
import { signin } from '@/services/auth';
import { setLoggedInUserId, setUserAccounts } from '@/utils/authUtils';

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

    Keyboard.dismiss()

    try {
      const { data } = await signin(credentials.email, credentials.password)
      await setLoggedInUserId(data.user._id)
      await setToken(`accessToken:${data.user._id}`, data.accessToken)
      await setToken(`refreshToken:${data.user._id}`, data.refreshToken)
      await setUserAccounts(data.user)
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
    <SafeAreaView className='h-full bg-gray-50'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1 }}>
          <View className='mt-28 items-center justify-center p-4'>
            <Text className="text-5xl font-pbold text-green">fundfolio<Text className='text-red'>.</Text></Text>
            <Text className='text-base font-pregular text-slate-400'>Money Matters !</Text>
          </View>
          <View className='flex-1 items-center justify-end px-8 py-4 gap-4'>
            <TextInput
              placeholder='Email'
              keyboardType='email-address'
              className='w-full border border-slate-400 p-4 rounded-xl font-pregular text-base text-black'
              placeholderTextColor={'gray'}
              onChangeText={(text) => setCredentials({ ...credentials, email: text })}
            />
            <TextInput
              placeholder='Password'
              secureTextEntry
              className='w-full border border-slate-400 p-4 rounded-xl font-pregular text-base text-black'
              placeholderTextColor={'gray'}
              onChangeText={(text) => setCredentials({ ...credentials, password: text })}
            />
            <TouchableOpacity onPress={handleSignIn} className='w-full border border-green bg-green/50 p-4 rounded-xl'>
              <Text className='text-center font-psemibold text-lg'>Sign In</Text>
            </TouchableOpacity>
            {/* <Text className='text-right font-pregular text-base'>Forgot Password ?</Text> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}