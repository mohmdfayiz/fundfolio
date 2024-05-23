import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  return (
    <SafeAreaView>
      <View className='flex flex-col gap-4 p-4'>
        <View>
          <Text className='text-2xl font-pbold'>Hello Fayis👋</Text>
          <Text className='font-pregular text-sm'>Manage your profile!</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}