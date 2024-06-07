import { useContext } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Redirect, router } from 'expo-router'
import { GlobalContext } from '@/context/GlobalContext';

export default function SingIn() {

  const { isLogged, setIsLogged } = useContext(GlobalContext);

  function handleSignIn() {
    setIsLogged(true);
    router.push('/home');
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
        />
        <TextInput
          placeholder='Password'
          secureTextEntry
          className='w-full border border-slate-400 p-4 rounded-xl font-pregular'
        />
        <Pressable onPress={handleSignIn} className='w-full border border-green bg-green/50 p-4 rounded-xl'>
          <Text className='text-center font-psemibold text-base'>Sing In</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}