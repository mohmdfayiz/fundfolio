import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TabTitle from '@/components/TabTitle';

const profileImage = require('@/assets/images/profile.png');

export default function ProfileScreen() {
  return (
    <SafeAreaView>
      <View className='flex flex-col gap-4 p-4'>
        <View>
          <TabTitle title='Account' icon='🛡️' subTitle='Manage your account!' />
        </View>

        <View className='flex flex-row items-center justify-start'>
          <View className='relative'>
            <Image source={profileImage} className='w-16 h-16 rounded-full' />
            <Text className='absolute bottom-0 right-0 bg-black/50 rounded-full p-1 text-xs'>🖊️</Text>
          </View>
          <View className='ml-4'>
            <Text className='text-base font-psemibold'>Fayis</Text>
            <Text className='font-pregular'>fayis@gmail.com</Text>
          </View>
        </View>

        <View className='flex flex-row justify-between p-2  bg-green/20 rounded-xl border border-green'>
          <Text className='text-base font-psemibold'>Account Balance</Text>
          <Text className='text-base font-psemibold'>₹ 9000</Text>
        </View>

        <View className='flex flex-col gap-y-4'>
          <View className='flex flex-row items-center justify-between p-2'>
            <Text className='text-base font-psemibold'>Transaction Statistics</Text>
            <Text className='text-base font-psemibold'>{'>'}</Text>
          </View>

          <View className='flex flex-row items-center justify-between p-2'>
            <Text className='text-base font-psemibold'>Transaction Category</Text>
            <Text className='text-base font-psemibold'>{'>'}</Text>
          </View>

          <View className='flex flex-row items-center justify-between p-2'>
            <Text className='text-base font-psemibold'>Change Password</Text>
            <Text className='text-base font-psemibold'>{'>'}</Text>
          </View>

          <View className='flex flex-row items-center justify-between p-2'>
            <Text className='text-base font-psemibold'>Privacy Policy</Text>
            <Text className='text-base font-psemibold'>{'>'}</Text>
          </View>

          <View className='flex flex-row items-center justify-between p-2'>
            <Text className='text-base font-psemibold text-red'>Delete Account</Text>
            <Text className='text-base font-psemibold text-red'>{'>'}</Text>
          </View>

          <View className='flex flex-row items-center justify-between p-2'>
            <Text className='text-base font-psemibold text-red'>Logout</Text>
            <Text className='text-base font-psemibold text-red'>{'>'}</Text>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}