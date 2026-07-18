import { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { View, Text, Pressable, TextInput, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { useGlobalContext } from '@/context/GlobalContext'
import { OtpPurpose, resendOtp, verifyOtp } from '@/services/auth'
import { setLoggedInUserId, setUserAccounts } from '@/utils/authUtils'

const RESEND_COOLDOWN_SECONDS = 60

export default function Otp() {
    const params = useLocalSearchParams<{ email?: string; purpose?: string }>()
    const email = (params.email || '').toString()
    const purpose = ((params.purpose || 'signup') as OtpPurpose)

    const [code, setCode] = useState('')
    const [loading, setLoading] = useState(false)
    const [resendSeconds, setResendSeconds] = useState(RESEND_COOLDOWN_SECONDS)
    const { setUser, setToken } = useGlobalContext()

    useEffect(() => {
        if (resendSeconds <= 0) return
        const timer = setTimeout(() => setResendSeconds((s) => s - 1), 1000)
        return () => clearTimeout(timer)
    }, [resendSeconds])

    async function handleVerifyOtp() {
        if (!email) {
            return Toast.show({
                type: 'error',
                text1: 'Missing email. Please sign up again.',
            })
        }

        if (!/^\d{6}$/.test(code)) {
            return Toast.show({
                type: 'error',
                text1: 'Enter the 6-digit code from your email',
            })
        }

        Keyboard.dismiss()
        setLoading(true)

        try {
            const { data } = await verifyOtp(email, code, purpose)
            await setLoggedInUserId(data.user._id)
            await setToken(`accessToken:${data.user._id}`, data.accessToken)
            await setToken(`refreshToken:${data.user._id}`, data.refreshToken)
            await setUserAccounts(data.user)
            setUser(data.user)
            router.push('/password')
        } catch (error: any) {
            const message = error?.response?.data?.message || 'Invalid or expired code'
            Toast.show({
                type: 'error',
                text1: Array.isArray(message) ? message[0] : message,
            })
        } finally {
            setLoading(false)
        }
    }

    async function handleResend() {
        if (!email || resendSeconds > 0) return

        try {
            await resendOtp(email, purpose)
            setResendSeconds(RESEND_COOLDOWN_SECONDS)
            Toast.show({
                type: 'success',
                text1: 'A new code has been sent if the account exists',
            })
        } catch (error: any) {
            const message = error?.response?.data?.message || 'Could not resend code'
            Toast.show({
                type: 'error',
                text1: Array.isArray(message) ? message[0] : message,
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
                            value={email}
                            editable={false}
                            className='w-full border border-slate-400 p-4 rounded-xl font-pregular text-base text-black bg-slate-100'
                        />
                        <TextInput
                            value={code}
                            placeholder='OTP'
                            keyboardType='number-pad'
                            maxLength={6}
                            autoFocus
                            className='w-full border border-slate-400 p-4 rounded-xl font-pregular text-base text-black'
                            placeholderTextColor={'gray'}
                            onChangeText={setCode}
                        />
                        <Pressable
                            onPress={handleVerifyOtp}
                            disabled={loading}
                            className='w-full border border-green bg-green/50 p-4 rounded-xl'
                        >
                            <Text className='text-center font-psemibold text-base'>
                                {loading ? 'Verifying...' : 'Verify OTP'}
                            </Text>
                        </Pressable>
                        <Pressable onPress={handleResend} disabled={resendSeconds > 0}>
                            <Text className={`text-center font-pregular text-base ${resendSeconds > 0 ? 'text-slate-400' : 'text-green'}`}>
                                {resendSeconds > 0
                                    ? `Resend code in ${resendSeconds}s`
                                    : 'Resend code'}
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
