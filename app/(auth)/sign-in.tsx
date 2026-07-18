import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import Toast from 'react-native-toast-message';
import { useGlobalContext } from '@/context/GlobalContext';
import PasswordInput from '@/components/PasswordInput';
import { resendOtp, signin } from '@/services/auth';
import { setLoggedInUserId, setUserAccounts } from '@/utils/authUtils';

export default function SingIn() {

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { setUser, setIsLogged, setToken } = useGlobalContext();

  async function handleSignIn() {
    if (!credentials.email || credentials.password.length < 6) {
      return Toast.show({
        type: 'error',
        text1: 'Invalid credentials',
      })
    }

    Keyboard.dismiss()
    setLoading(true)

    const normalizedEmail = credentials.email.trim().toLowerCase()

    try {
      const { data } = await signin(normalizedEmail, credentials.password)
      await setLoggedInUserId(data.user._id)
      await setToken(`accessToken:${data.user._id}`, data.accessToken)
      await setToken(`refreshToken:${data.user._id}`, data.refreshToken)
      await setUserAccounts(data.user)
      setUser(data.user);
      setIsLogged(true);
      router.replace('/home');
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Invalid credentials'
      const isUnverified = typeof message === 'string'
        && message.toLowerCase().includes('verify your email')

      if (isUnverified) {
        try {
          await resendOtp(normalizedEmail, 'signup')
        } catch {
          // cooldown or send failure — still route to OTP screen
        }
        Toast.show({
          type: 'info',
          text1: 'Please verify your email',
          text2: 'Enter the code sent to your inbox',
        })
        router.push({
          pathname: '/otp',
          params: {
            email: normalizedEmail,
            purpose: 'signup',
          },
        })
        return
      }

      Toast.show({
        type: 'error',
        text1: 'Invalid credentials',
      })
    } finally {
      setLoading(false)
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
              autoCapitalize='none'
              className='w-full border border-slate-400 p-4 rounded-xl font-pregular text-base text-black'
              placeholderTextColor={'gray'}
              onChangeText={(text) => setCredentials({ ...credentials, email: text })}
            />
            <PasswordInput
              placeholder='Password'
              onChangeText={(text) => setCredentials({ ...credentials, password: text })}
            />
            <TouchableOpacity
              onPress={() => router.push('/forgot-password')}
              className='w-full -mt-2'
            >
              <Text className='text-right font-pregular text-sm text-slate-400'>
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSignIn}
              disabled={loading}
              className='w-full border border-green bg-green/50 p-4 rounded-xl'
            >
              <Text className='text-center font-psemibold text-lg'>
                {loading ? 'Signing in...' : 'Sign In'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
