import { useContext, useEffect, useState } from 'react';
import { Alert, Image, Pressable, Text, View, Share } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import Toast from 'react-native-toast-message';

import { GlobalContext } from '@/context/GlobalContext';
import TabTitle from '@/components/TabTitle';
import EditProfileModal from '@/components/EditProfileModal';
import profileImages from '@/constants/images';
import { APP_LINK } from '@/constants/data';
import { getAccountBalance } from '@/services/transaction';
import { deleteUser } from '@/services/user';

export default function ProfileScreen() {

  const { user, setIsLogged, removeToken } = useContext(GlobalContext);
  const [accountBalance, setAccountBalance] = useState(0.00);
  const [isOpen, setIsOpen] = useState(false);

  const isFocused = useIsFocused();

  const fetchBalance = async () => {
    const { data } = await getAccountBalance();
    setAccountBalance(data.balance || 0.00);
  }

  const handleEditProfileModal = () => {
    setIsOpen((prev) => !prev);
  }

  const handleShareApp = async () => {
    try {
      await Share.share({ message: APP_LINK });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Oops! Something went wrong. Please try again.',
        position: 'top',
      })
    }
  }

  async function handleLogout() {
    Alert.alert('Are you sure you want to log out?', '', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK', onPress: async () => {
          await removeToken();
          setIsLogged(false);
          router.replace('/');
        }
      },
    ]);
  }

  async function handleDeleteAccount() {
    try {
      Alert.alert('Are you sure you want to delete your account?',
        'This action cannot be undone.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              await deleteUser();
              setIsLogged(false);
              router.replace('/');
            }
          },
        ]
      );
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Oops! Something went wrong. Please try again.',
        position: 'top',
      })
    }
  }

  useEffect(() => {
    isFocused && fetchBalance();
  }, [isFocused]);

  return (
    <SafeAreaView>
      <View className='flex flex-col gap-4 p-4'>
        <View>
          <TabTitle title='Account' icon='🛡️' subTitle='Manage your account!' />
        </View>

        <View className='flex flex-row items-center justify-start'>
          <View className='relative'>
            <Pressable onPress={handleEditProfileModal}>
              <Image source={user?.profilePic === 'woman' ? profileImages.woman : profileImages.man} className='w-16 h-16 rounded-full' />
              <Text className='absolute bottom-0 right-0 bg-black/50 rounded-full p-1 text-xs'>🖊️</Text>
            </Pressable>
          </View>
          <View className='ml-4'>
            <Text className='text-base font-psemibold'>{user?.username}</Text>
            <Text className='font-pregular'>{user?.email}</Text>
          </View>
        </View>

        <View className={`flex flex-row justify-between p-2 rounded-xl border ${accountBalance < 0 ? 'bg-red/20 border-red' : 'bg-green/20 border-green'}`}>
          <Text className='text-base font-psemibold'>Account Balance</Text>
          <Text className='text-base font-psemibold'>₹ {accountBalance}</Text>
        </View>

        <View className='flex flex-col gap-y-4'>

          <View className='flex flex-row items-center justify-between p-2'>
            <Link href={'/transactionStatistics'} className='flex-1'>
              <Text className='text-base font-psemibold'>Transaction Statistics</Text>
            </Link>
            <Text className='text-base font-psemibold'>{'>'}</Text>
          </View>

          <View className='flex flex-row items-center justify-between p-2'>
            <Link href={'/transactionCategory'} className='flex-1'>
              <Text className='text-base font-psemibold'>Transaction Category</Text>
            </Link>
            <Text className='text-base font-psemibold'>{'>'}</Text>
          </View>

          <View className='flex flex-row items-center justify-between p-2'>
            <Link href={'/password'} className='flex-1'>
              <Text className='text-base font-psemibold'>Change Password</Text>
            </Link>
            <Text className='text-base font-psemibold'>{'>'}</Text>
          </View>

          <View className='flex flex-row items-center justify-between p-2'>
            <Link href={'/privacypolicy'} className='flex-1'>
              <Text className='text-base font-psemibold'>Privacy Policy</Text>
            </Link>
            <Text className='text-base font-psemibold'>{'>'}</Text>
          </View>

          <View className='flex flex-row items-center justify-between p-2'>
            <Pressable onPress={handleShareApp} className='flex-1'>
              <Text className='text-base font-psemibold'>Share App</Text>
            </Pressable>
            <Text className='text-base font-psemibold'>{'>'}</Text>
          </View>

          <View className='flex flex-row items-center justify-between p-2'>
            <Pressable onPress={handleDeleteAccount} className='flex-1'>
              <Text className='text-base font-psemibold text-red'>Delete Account</Text>
            </Pressable>
            <Text className='text-base font-psemibold text-red'>{'>'}</Text>
          </View>

          <View className='flex flex-row items-center justify-between p-2'>
            <Pressable onPress={handleLogout} className='flex-1'>
              <Text className='text-base font-psemibold text-red'>Logout</Text>
            </Pressable>
            <Text className='text-base font-psemibold text-red'>{'>'}</Text>
          </View>
        </View>
      </View>

      <EditProfileModal isOpen={isOpen} onClose={handleEditProfileModal} />
    </SafeAreaView>
  );
}