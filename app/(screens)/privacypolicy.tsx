import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TabTitle from "@/components/TabTitle";

export default function PrivacyPolicy() {
    return (
        <SafeAreaView>
            <View className='flex h-full'>
                <View className='px-4 pt-2'>
                    <TabTitle title="Privacy Policy" icon="" subTitle="" />
                </View>
                <View className="flex-1">
                    <ScrollView className='p-4'>
                        <View className='flex flex-col gap-4'>
                            <Text className='text-sm font-regular'>
                                Last updated: July 03, 2024
                            </Text>

                            <Text className='text-sm font-regular'>
                                fundfolio ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by FundFolio.
                            </Text>

                            <Text className='text-base font-semibold'>Information We Collect</Text>
                            <Text className='text-sm font-regular'>
                                We collect information you provide directly to us when you create an account, including your username, email address, and password. We also collect the transaction data and notes you input into the app.
                            </Text>

                            <Text className='text-base font-semibold'>How We Use Your Information</Text>
                            <Text className='text-sm font-regular'>
                                We use the information we collect to provide, maintain, and improve our services, to process your transactions, and to communicate with you.
                            </Text>

                            <Text className='text-base font-semibold'>Data Storage and Security</Text>
                            <Text className='text-sm font-regular'>
                                Your data is stored securely and is only accessible to you through your account. We implement appropriate technical and organizational measures to protect your personal information.
                            </Text>

                            <Text className='text-base font-semibold'>Your Rights</Text>
                            <Text className='text-sm font-regular'>
                                You can access, update, or delete your account information at any time through the app. If you choose to delete your account, all associated data will be permanently removed from our systems.
                            </Text>

                            <Text className='text-base font-semibold'>Changes to This Policy</Text>
                            <Text className='text-sm font-regular'>
                                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                            </Text>

                            <Text className='text-base font-semibold'>Contact Us</Text>
                            <Text className='text-sm font-regular mb-10'>
                                If you have any questions about this Privacy Policy, please contact us at: mohmdfayisk@gmail.com
                            </Text>

                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>

    )
}
