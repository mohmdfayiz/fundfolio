import { Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import PieChart from 'react-native-pie-chart';
import { Link } from 'expo-router';
import Transaction from '@/components/Transaction';
import TabTitle from '@/components/TabTitle';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View className='flex flex-col gap-4 p-4' >
        <View>
          <TabTitle title='Hello Fayis' icon='👋' subTitle='Good Morning!' />
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
              <Text className='text-xl font-psemibold'>₹ 1000</Text>
            </View>
          </View>

          <View className='ml-auto relative'>
            <View className='absolute z-10 top-14 left-12'>
              <Text className='text-base font-psemibold'>May</Text>
            </View>
            <PieChart
              widthAndHeight={130}
              series={[10000, 1000]}
              sliceColor={['#A1C398', '#FA7070']}
              coverRadius={0.6}
              coverFill={'#e5e7eb'}
            />
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