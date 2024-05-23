import { Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from 'expo-router';
import Transaction from '@/components/Transaction';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View className='flex flex-col gap-4 p-4' >
        <View>
          <Text className='text-2xl font-pbold'>Hello Fayis👋</Text>
          <Text className='font-pregular text-sm'>Good Morning!</Text>
        </View>

        <View className='flex flex-row items-center p-5 mt-5 bg-gray-200 rounded-2xl border border-gray-300'>
          <View>

            <View >
              <View className=' flex flex-row items-baseline'>
                <View className="w-2 h-4 bg-green rounded-full mr-1"></View>
                <Text className='text-lg font-plight'>Income</Text>
              </View>
              <Text className='text-xl font-psemibold'>₹ 10000</Text>
            </View>

            <View className='mt-4'>
              <View className='flex flex-row items-baseline'>
                <View className="w-2 h-4 bg-red rounded-full mr-1"></View>
                <Text className='text-lg font-plight'>Expense</Text>
              </View>
              <Text className='text-xl font-psemibold'>₹ 0.0</Text>
            </View>
          </View>

          <View className='ml-auto'>
            <View className={`bg-green rounded-full h-32 w-32 items-center justify-center`} >
              <View className='bg-gray-200 rounded-full h-20 w-20 items-center justify-center'>
                <Text className='text-lg font-psemibold'>May</Text>
              </View>
            </View>
          </View>

        </View>

        <View className='flex flex-row items-center justify-between'>
          <Text className='text-lg font-psemibold'>Recent Transactions</Text>
          <Link href={'/transactions'} className='border border-gray-400 rounded-full px-3 py-1'>
            <Text className='text-sm font-pregular'>See All {'>'}</Text>
          </Link>
        </View>

        <ScrollView className='h-96 max-h-[30rem]' showsVerticalScrollIndicator={false}>
          <Transaction icon="🛺" category="Travel" date="10th May 2024" amount={120} transactionType="Cash" bgColour='bg-green-200' />
          <Transaction icon="🍲" category="Food" date="10th May 2024" amount={100} transactionType="Card" bgColour='bg-orange-200' />
          <Transaction icon="🛺" category="Travel" date="10th May 2024" amount={120} transactionType="Cash" bgColour='bg-green-200' />
          <Transaction icon="🎫" category="Entertainment" date="9th May 2024" amount={200} transactionType="UPI" bgColour='bg-indigo-200' />
          <Transaction icon="🍲" category="Food" date="10th May 2024" amount={100} transactionType="Card" bgColour='bg-orange-200' />
          <Transaction icon="🛺" category="Travel" date="10th May 2024" amount={20} transactionType="UPI" bgColour='bg-green-200' />
        </ScrollView>

      </View>
    </SafeAreaView >
  )
}