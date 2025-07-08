import { useState } from 'react';
import { router } from 'expo-router'
import { View, Text, Pressable, TextInput, KeyboardAvoidingView, ScrollView, Platform, Keyboard, Image } from 'react-native'
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
      })
    };

    Keyboard.dismiss()

    try {
      await setPassword(entry.password);
      if (!isLogged) {
        setIsLogged(true);
        router.replace('/home');
      } else {
        Toast.show({
          type: 'success',
          text1: 'Password updated successfully',
        })
        router.back();
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Oops, Something went wrong!',
      })
    }
  }

  return (
    <SafeAreaView className='flex-1 bg-gray-50'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1 }}>
          <View className='mt-[30%] items-center justify-center p-4'>
            <Text className="text-5xl font-pbold text-green">fundfolio<Text className='text-red'>.</Text></Text>
            <Text className='text-base font-pregular text-slate-400'>Money Matters !</Text>
          </View>
          <View className='flex-1 items-center justify-end px-8 py-4 gap-4'>
            <TextInput
              secureTextEntry
              placeholder='Password'
              className='w-full border border-slate-400 p-4 rounded-xl font-pregular text-base text-black'
              placeholderTextColor={'gray'}
              onChangeText={(text) => setEntry({ ...entry, password: text })}
            />
            <TextInput
              secureTextEntry
              placeholder='Confirm Password'
              className='w-full border border-slate-400 p-4 rounded-xl font-pregular text-base text-black'
              placeholderTextColor={'gray'}
              onChangeText={(text) => setEntry({ ...entry, confirmPassword: text })}
            />
            <Pressable onPress={handlePassword} className='w-full border border-green bg-green/50 p-4 rounded-xl'>
              <Text className='text-center font-psemibold text-lg'>Save Password</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}