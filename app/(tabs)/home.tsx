import { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Link } from 'expo-router';

import { useGlobalContext } from '@/context/GlobalContext';
import Transaction from '@/components/Transaction';
import TabTitle from '@/components/TabTitle';
import TransactionPieChart from '@/components/PieChart';
import { MONTHS } from '@/constants/data';
import images from '@/constants/images';
import { getRecentTransactions, getTransactionStats } from '@/services/transaction';
import { Stats } from '@/types';

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

        <View className='px-4'>
          <TransactionPieChart stats={stats} month={MONTHS[today.getMonth()]} />
        </View>

        <View className='px-4 pt-4 pb-3'>
          <View className='flex flex-row items-center justify-between'>
            <Text className='text-xl font-psemibold'>Recent Transactions</Text>
            <Link href={'/transactions'} className='border border-gray-400 rounded-lg px-3 py-1'>
              <Text className='text-sm font-pregular text-center'>View All</Text>
            </Link>
          </View>
        </View>

        <View className='flex-1 px-4'>
          {
            transactions.length ?
              <GestureHandlerRootView>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {transactions.map((transaction: any) => <Transaction key={transaction._id} {...transaction} />)}
                </ScrollView>
              </GestureHandlerRootView>
              :
              <View className='flex flex-1 items-center justify-center'>
                <Image source={images.noData} className='w-40 h-40' />
              </View>
          }
        </View>

      </View>
    </SafeAreaView >
  )
}