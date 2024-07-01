import { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import PieChart from 'react-native-pie-chart';
import { Link } from 'expo-router';
import { useGlobalContext } from '@/context/GlobalContext';
import Transaction from '@/components/Transaction';
import TabTitle from '@/components/TabTitle';
import { getRecentTransactions, getTransactionStats } from '@/services/transaction';
import { MONTHS } from '@/constants/data';

type Stats = {
  totalAmount: number;
  income: number;
  expense: number;
}

const homeSubTitle = (today: Date) => {
  if (today.getHours() < 12) {
    return 'Good Morning!';
  } else if (today.getHours() < 16) {
    return 'Good Afternoon!';
  } else {
    return 'Good Evening!';
  }
}

export default function HomeScreen() {

  const { user } = useGlobalContext();
  const [stats, setStats] = useState<Stats>({ totalAmount: 0, income: 0.01, expense: -0.01 });
  const [transactions, setTransactions] = useState([]);
  const isFocused = useIsFocused();
  const today = new Date();

  const fetchStats = async () => {
    const { data } = await getTransactionStats(today.getMonth() + 1, today.getFullYear());
    setStats(data || stats);
  }

  const fetchTransactions = async () => {
    const { data } = await getRecentTransactions();
    setTransactions(data);
  }

  useEffect(() => {
    if (isFocused) {
      fetchStats();
      fetchTransactions();
    }
  }, [isFocused])

  return (
    <SafeAreaView>
      <View className='flex h-full' >
        <View className='p-4'>
          <TabTitle title={`Hello ${user?.username || 'there'}`} icon='👋' subTitle={homeSubTitle(today)} />
        </View>

        <View className='flex flex-row items-center mx-4 p-5 bg-gray-200 rounded-2xl border border-gray-300'>
          <View>
            <View >
              <View className=' flex flex-row items-baseline'>
                <View className="w-2 h-4 bg-green rounded-full mr-1"></View>
                <Text className='text-lg font-plight'>Income</Text>
              </View>
              <Text className='text-xl font-psemibold'>₹ {stats.income}</Text>
            </View>

            <View className='mt-4'>
              <View className='flex flex-row items-baseline'>
                <View className="w-2 h-4 bg-red rounded-full mr-1"></View>
                <Text className='text-lg font-plight'>Expense</Text>
              </View>
              <Text className='text-xl font-psemibold'>₹{stats.expense * -1}</Text>
            </View>
          </View>

          <View className='ml-auto relative'>
            <View className='absolute z-10 top-14 left-12'>
              <Text className='text-base font-psemibold'>{MONTHS[today.getMonth()]}</Text>
            </View>
            <PieChart
              widthAndHeight={130}
              series={[stats.expense * -1, stats.income]}
              sliceColor={['#FA7070', '#A1C398']}
              coverRadius={0.6}
              coverFill={'#e5e7eb'}
            />
          </View>
        </View>

        <View className='flex flex-row items-center justify-between p-4'>
          <Text className='text-lg font-psemibold'>Recent Transactions</Text>
          <Link href={'/transactions'} className='border border-gray-400 rounded-full px-3 py-1'>
            <Text className='text-sm font-pregular'>See All {'>'}</Text>
          </Link>
        </View>

        <View className='flex-1 px-4'>
          <ScrollView showsVerticalScrollIndicator={false}>
            {
              transactions.length ?
                transactions.map((transaction: any) => <Transaction key={transaction._id} {...transaction} />)
                : <Text className='text-md font-pregular'>No Transactions Found!</Text>
            }
          </ScrollView>
        </View>

      </View>
    </SafeAreaView >
  )
}