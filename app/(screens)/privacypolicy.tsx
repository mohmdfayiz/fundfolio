import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TabTitle from "@/components/TabTitle";

export default function PrivacyPolicy() {
    return (
        <SafeAreaView className='bg-gray-50'>
            <View className='flex h-full'>
                <View className='px-4 pt-2'>
                    <TabTitle title="Privacy Policy" icon="" subTitle="" />
                </View>
                <View className="flex-1">
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View className='flex flex-col p-4 gap-y-4'>
                            <Text className='text-base font-regular'>
                                Last updated: July 03, 2024
                            </Text>

                            <Text className='text-base font-regular'>
                                fundfolio ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by fundfolio.
                            </Text>

                            <Text className='text-lg font-psemibold'>Information We Collect</Text>
                            <Text className='text-base font-regular'>
                                We collect information you provide directly to us when you create an account, including your username, email address, and password. We also collect the transaction data and notes you input into the app.
                            </Text>

                            <Text className='text-lg font-psemibold'>How We Use Your Information</Text>
                            <Text className='text-base font-regular'>
                                We use the information we collect to provide, maintain, and improve our services, and to communicate with you.
                            </Text>

                            <Text className='text-lg font-psemibold'>Data Storage and Security</Text>
                            <Text className='text-base font-regular'>
                                Your data is stored securely and is only accessible to you through your account. We implement appropriate technical and organizational measures to protect your personal information.
                            </Text>

                            <Text className='text-lg font-psemibold'>Your Rights</Text>
                            <Text className='text-base font-regular'>
                                You can access, update, or delete your account information at any time through the app. If you choose to delete your account, all associated data will be permanently removed from our systems.
                            </Text>

                            <Text className='text-lg font-psemibold'>Changes to This Policy</Text>
                            <Text className='text-base font-regular'>
                                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                            </Text>

                            <Text className='text-lg font-psemibold'>Contact Us</Text>
                            <Text className='text-base font-regular'>
                                If you have any questions about this Privacy Policy, please contact us at: mohmdfayisk@gmail.com
                            </Text>

                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>

    )
}
