import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from 'expo-router';
import { useGlobalContext } from '@/context/GlobalContext';

export default function Welcome() {

  const { isLogged } = useGlobalContext();
  if (isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView className='h-full bg-gray-50'>
      <View className='mt-28 items-center justify-center p-4'>
        <Text className="text-5xl font-pbold text-green">fundfolio<Text className='text-red'>.</Text></Text>
        <Text className='text-base font-pregular text-slate-400'>Money Matters !</Text>
      </View>
      <View className='flex-1 items-center justify-end px-8 py-4 gap-4'>
        <TouchableOpacity onPress={() => router.push('/sign-in')} className='w-full border border-slate-400 p-4 rounded-xl'>
          <Text className='text-center font-psemibold text-lg'>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/sign-up')} className='w-full border border-green bg-green/50 p-4 rounded-xl'>
          <Text className='text-center font-psemibold text-lg'>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}