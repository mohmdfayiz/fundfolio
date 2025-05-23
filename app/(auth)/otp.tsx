import { router } from 'expo-router'
import { View, Text, Pressable, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Otp() {

    function handleOtp() {
        router.push('/password');
    }

    return (
        <SafeAreaView className='h-full bg-gray-50'>
            <View className='h-1/2 items-center justify-center p-4'>
                <Text className="text-5xl font-pbold text-green">fundfolio<Text className='text-red'>.</Text></Text>
                <Text className='text-base font-pregular text-slate-400'>Money Matters !</Text>
            </View>
            <View className='h-1/2 items-center justify-end px-8 gap-4'>
                <TextInput
                    value='defaultmail@gmail.com'
                    editable={false}
                    className='w-full border border-slate-400 p-4 rounded-xl font-pregular '
                />
                <TextInput
                    placeholder='OTP'
                    keyboardType='number-pad'
                    maxLength={6}
                    className='w-full border border-slate-400 p-4 rounded-xl font-pregular '
                />
                <Pressable onPress={handleOtp} className='w-full border border-green bg-green/50 p-4 rounded-xl'>
                    <Text className='text-center font-psemibold text-base'>Verify OTP</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}