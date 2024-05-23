import { View, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Redirect } from 'expo-router';

export default function Welcome() {

  // const { loading, isLogged } = useGlobalContext();
  // if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView className='h-full'>
      <View className='flex-1 items-center justify-center'>
        <Text className="text-3xl font-bold">fundfolio</Text>
        <Link href="/home" className="underline">Go to Home</Link>
      </View>
      <StatusBar style="inverted" />
    </SafeAreaView>
  )
}