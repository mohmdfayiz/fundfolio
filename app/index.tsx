import { useContext } from 'react';
import { View, Text, Pressable } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from 'expo-router';
import { GlobalContext } from '@/context/GlobalContext';

export default function Welcome() {

  const { isLogged } = useContext(GlobalContext);
  if (isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView className='h-full'>
      <View className='h-1/2 items-center justify-center p-4'>
        <Text className="text-4xl font-pbold text-green">fundfolio<Text className='text-red'>.</Text></Text>
        <Text className='text-sm font-pregular text-slate-400'>Money Matters !</Text>
      </View>
      <View className='h-1/2 items-center justify-end px-8 gap-4'>
        <Pressable onPress={() => router.push('/sign-in')} className='w-full border border-slate-400 p-4 rounded-xl'>
          <Text className='text-center font-psemibold text-base'>Sing In</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/sign-up')} className='w-full border border-green bg-green/50 p-4 rounded-xl'>
          <Text className='text-center font-psemibold text-base'>Sing Up</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}