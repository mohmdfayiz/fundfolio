import { router } from 'expo-router'
import { View, Text, Pressable, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SignUp() {
  return (
    <SafeAreaView className='h-full'>
      <View className='h-1/2 items-center justify-center p-4'>
        <Text className="text-4xl font-pbold text-green">fundfolio<Text className='text-red'>.</Text></Text>
        <Text className='text-sm font-pregular text-slate-400'>Money Matters !</Text>
      </View>
      <View className='h-1/2 items-center justify-end px-8 gap-4'>
        <TextInput
          placeholder='Username'
          keyboardType='default'
          className='w-full border border-slate-400 p-4 rounded-xl font-pregular '
        />
        <TextInput
          placeholder='Email'
          keyboardType='email-address'
          className='w-full border border-slate-400 p-4 rounded-xl font-pregular '
        />
        <Pressable onPress={() => router.push('/otp')} className='w-full border border-green bg-green/50 p-4 rounded-xl'>
          <Text className='text-center font-psemibold text-base'>Sing Up</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}