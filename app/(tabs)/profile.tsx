import { useEffect, useState } from 'react';
import { Alert, Image, Pressable, Text, View, Share, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Link } from 'expo-router';

import { useGlobalContext } from '@/context/GlobalContext';
import TabTitle from '@/components/TabTitle';
import EditProfileModal from '@/components/EditProfileModal';
import CurrencyPicker from '@/components/CurrencyPicker';
import { man, woman } from '@/constants/images';
import { APP_LINK, APP_LOCK_ENUM } from '@/constants/data';
import { getToken } from '@/utils/token';
import { globalLogout } from '@/utils/authUtils';
import { authenticateAppLock, setAppLockPreference } from '@/utils/helpers';
import { getAccountBalance } from '@/services/transaction';
import { deleteUser, updateUser } from '@/services/user';
import { logout } from '@/services/auth';
import { User } from '@/types';

export default function ProfileScreen() {

  const { user, setUser, useAppLock, setUseAppLock } = useGlobalContext();
  const [accountBalance, setAccountBalance] = useState(0.00);
  const [isOpen, setIsOpen] = useState(false);
  const [isCurrencyPickerOpen, setIsCurrencyPickerOpen] = useState(false);

  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();

  const fetchBalance = async () => {
    const { data } = await getAccountBalance();
    setAccountBalance(data.balance || 0.00);
  }

  const handleEditProfileModal = () => {
    setIsOpen((prev) => !prev);
  }

  const handleCurrencyPicker = () => {
    setIsCurrencyPickerOpen((prev) => !prev);
  }

  const handleUpdateUser = async (updatedUser: User) => {
    if (!updatedUser) return;
    setUser({ ...user, ...updatedUser });
    await updateUser(updatedUser);
  }

  const handleShareApp = async () => {
    try {
      await Share.share({ message: APP_LINK });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Oops! Something went wrong. Please try again.',
      })
    }
  }

  const handleAppLockPreference = async () => {
    if (useAppLock) {
      Alert.alert(
        'Deactivate App Lock?',
        '',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK', onPress: async () => {
              await setAppLockPreference(false);
              setUseAppLock(false);
              Toast.show({
                type: 'success',
                text1: 'App lock deactivated.',
              })
            }
          },
        ],
        { userInterfaceStyle: 'light' }
      );
    } else {
      Alert.alert(
        'Activate App Lock?',
        "You'll need to use your device's security (like fingerprint or face ID) to unlock the app",
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK', onPress: async () => {
              const result = await authenticateAppLock(true);
              if (result === APP_LOCK_ENUM.AUTHENTICATED) {
                await setAppLockPreference(true);
                setUseAppLock(true);
                Toast.show({
                  type: 'success',
                  text1: 'App Lock Activated.',
                  text2: 'Your fundfolio app is now protected by App Lock.',
                })
              }
            }
          },
        ],
        { userInterfaceStyle: 'light' }
      );
    }
  };

  async function logoutUser(allDevices = false) {
    try {
      const refreshToken = await getToken('refreshToken');
      await logout({ refreshToken, allDevices });
    } catch (error) {
      console.error(error);
    } finally {
      await globalLogout('MANUAL_LOGOUT');
    }
  }

  async function handleLogout() {
    Alert.alert(
      'Are you sure you want to logout?',
      '',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK', onPress: async () => {
            await logoutUser();
          },
        },
      ],
      { userInterfaceStyle: 'light' }
    );
  }

  async function handleDeleteAccount() {
    try {
      Alert.alert(
        'Are you sure you want to delete your account?',
        'All data will be permanently deleted and cannot be reversed.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              await deleteUser();
              await logoutUser(true);
            }
          },
        ],
        { userInterfaceStyle: 'light' }
      );
    } catch (error) {
      // console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Oops! Something went wrong. Please try again.',
      })
    }
  }

  useEffect(() => {
    isFocused && fetchBalance();
  }, [isFocused]);

  return (
    <View className='h-full bg-gray-50' style={{ paddingTop: insets.top }}>
      <View className='flex flex-1 flex-col gap-4 p-4'>
        <View>
          <TabTitle title='Account' icon='🛡️' subTitle='Manage your account!' />
        </View>

        <View className='flex flex-row items-center justify-start'>
          <View className='relative'>
            <Pressable onPress={handleEditProfileModal}>
              <Image source={user?.profilePic === 'woman' ? woman : man} className='w-[70px] h-[70px] rounded-full' />
              <Text className='absolute bottom-0 right-0 bg-black/50 rounded-full p-[5px] text-sm'>🖊️</Text>
            </Pressable>
          </View>
          <View className='ml-4'>
            <Text className='text-lg font-psemibold'>{user?.username}</Text>
            <Text className='font-pregular text-base'>{user?.email}</Text>
          </View>
        </View>

        <View className={`flex flex-row justify-between p-2 rounded-xl border ${accountBalance < 0 ? 'bg-red/20 border-red' : 'bg-green/20 border-green'}`}>
          <Text className='text-lg font-psemibold'>Account Balance</Text>
          <Text className='text-lg font-psemibold'>{user?.currency || '$'} {accountBalance}</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View className='flex flex-col gap-y-1.5'>
            <View className='flex flex-row items-center justify-between p-2'>
              <Link href={'/transactionstatistics'} className='flex-1'>
                <Text className='text-lg font-psemibold'>Transaction Statistics</Text>
              </Link>
              <Text className='text-lg font-psemibold'>{'>'}</Text>
            </View>

            <View className='flex flex-row items-center justify-between p-2'>
              <Link href={'/transactioncategory'} className='flex-1'>
                <Text className='text-lg font-psemibold'>Transaction Category</Text>
              </Link>
              <Text className='text-lg font-psemibold'>{'>'}</Text>
            </View>

            <View className='flex flex-row items-center justify-between p-2'>
              <Pressable onPress={handleCurrencyPicker} className='flex-1'>
                <Text className='text-lg font-psemibold'>Currency Preference</Text>
              </Pressable>
              <Text className='text-lg font-psemibold'>{'>'}</Text>
            </View>

            <View className='flex flex-row items-center justify-between p-2'>
              <Link href={'/password'} className='flex-1'>
                <Text className='text-lg font-psemibold'>Change Password</Text>
              </Link>
              <Text className='text-lg font-psemibold'>{'>'}</Text>
            </View>

            <View className='flex flex-row items-center justify-between p-2'>
              <Link href={'/privacypolicy'} className='flex-1'>
                <Text className='text-lg font-psemibold'>Privacy Policy</Text>
              </Link>
              <Text className='text-lg font-psemibold'>{'>'}</Text>
            </View>

            <View className='flex flex-row items-center justify-between p-2'>
              <Link href={'https://buymeacoffee.com/mohmdfayis'} className='flex-1'>
                <Text className='text-lg font-psemibold'>Support Us</Text>
              </Link>
              <Text className='text-lg font-psemibold'>{'>'}</Text>
            </View>

            <View className='flex flex-row items-center justify-between p-2'>
              <Pressable onPress={handleShareApp} className='flex-1'>
                <Text className='text-lg font-psemibold'>Share App</Text>
              </Pressable>
              <Text className='text-lg font-psemibold'>{'>'}</Text>
            </View>

            <View className='flex flex-row items-center justify-between p-2'>
              <Pressable onPress={handleAppLockPreference} className='flex-1'>
                <Text className='text-lg font-psemibold'>App Lock {useAppLock && '🔐'}</Text>
              </Pressable>
              <Text className='text-lg font-psemibold'>{'>'}</Text>
            </View>

            <View className='flex flex-row items-center justify-between p-2'>
              <Pressable onPress={handleDeleteAccount} className='flex-1'>
                <Text className='text-lg font-psemibold text-red'>Delete Account</Text>
              </Pressable>
              <Text className='text-lg font-psemibold text-red'>{'>'}</Text>
            </View>

            <View className='flex flex-row items-center justify-between p-2'>
              <Pressable onPress={handleLogout} className='flex-1'>
                <Text className='text-lg font-psemibold text-red'>Logout</Text>
              </Pressable>
              <Text className='text-lg font-psemibold text-red'>{'>'}</Text>
            </View>
          </View>
        </ScrollView>


      </View>

      <EditProfileModal isOpen={isOpen} user={user} onClose={handleEditProfileModal} onSave={handleUpdateUser} />
      <CurrencyPicker isOpen={isCurrencyPickerOpen} user={user} onClose={handleCurrencyPicker} onSave={handleUpdateUser} />
    </View>
  );
}