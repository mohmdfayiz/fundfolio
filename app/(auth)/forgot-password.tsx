import { useState } from 'react'
import { router } from 'expo-router'
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { forgotPassword } from '@/services/auth'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    if (!email || !email.includes('@')) {
      return Toast.show({
        type: 'error',
        text1: 'Please enter a valid email',
      })
    }

    Keyboard.dismiss()
    setLoading(true)

    const normalizedEmail = email.trim().toLowerCase()

    try {
      await forgotPassword(normalizedEmail)
      router.push({
        pathname: '/otp',
        params: {
          email: normalizedEmail,
          purpose: 'reset',
        },
      })
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Could not send reset code',
        text2: 'Please try again in a moment.',
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
            <View className='w-full items-center gap-1 mb-1'>
              <Text className='font-psemibold text-xl text-black'>Forgot Password?</Text>
              <Text className="font-pregular text-sm text-slate-400 text-center">
                Recover account with your email.
              </Text>
            </View>
            <TextInput
              placeholder='Email'
              keyboardType='email-address'
              autoCapitalize='none'
              value={email}
              className='w-full border border-slate-400 p-4 rounded-xl font-pregular text-base text-black'
              placeholderTextColor={'gray'}
              onChangeText={setEmail}
            />
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={loading}
              className='w-full border border-green bg-green/50 p-4 rounded-xl'
            >
              <Text className='text-center font-psemibold text-lg'>
                {loading ? 'Sending...' : 'Send Code'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
