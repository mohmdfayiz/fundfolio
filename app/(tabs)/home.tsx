import { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Link } from 'expo-router';

import { useGlobalContext } from '@/context/GlobalContext';
import Transaction from '@/components/Transaction';
import TabTitle from '@/components/TabTitle';
import TransactionPieChart from '@/components/PieChart';
import TransactionDetail from '@/components/TransactionDetails';
import { MONTHS } from '@/constants/data';
import { noData } from '@/constants/images';
import { getRecentTransactions, getTransactionStats } from '@/services/transaction';
import { Stats, TransactionDetails } from '@/types';

const homeSubTitle = (today: Date) => {
  if (today.getHours() < 12) {
    return 'Good Morning!';
  } else if (today.getHours() < 18) {
    return 'Good Afternoon!';
  } else {
    return 'Good Evening!';
  }
}

export default function HomeScreen() {

  const { user } = useGlobalContext();
  const [stats, setStats] = useState<Stats>({ totalAmount: 0, income: 0, expense: 0 });
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionDetails | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const today = new Date();

  const fetchStats = async () => {
    const { data } = await getTransactionStats(today.getMonth() + 1, today.getFullYear());
    setStats(data || { totalAmount: 0, income: 0, expense: 0 });
  }

  const fetchTransactions = async () => {
    const { data } = await getRecentTransactions();
    setTransactions(data);
  }

  const handleClick = (transaction: TransactionDetails) => {
    setIsModalVisible(true);
    setSelectedTransaction(transaction);
  }

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedTransaction(null);
  }

  useEffect(() => {
    if (isFocused) {
      fetchStats();
      fetchTransactions();
    }
  }, [isFocused])

  return (
    <View className='bg-gray-50' style={{ paddingTop: insets.top }}>
      <View className='flex h-full' >
        <View className='p-4'>
          <TabTitle title={`Hello ${user?.username || 'there'}`} icon='👋' subTitle={homeSubTitle(today)} />
        </View>

        <View className='px-4'>
          <TransactionPieChart stats={stats} month={MONTHS[today.getMonth()]} />
        </View>

        <View className='px-4 pt-4 pb-2'>
          <View className='flex flex-row items-center justify-between'>
            <Text className='text-xl font-psemibold'>Recent Transactions</Text>
            <Link href={'/transactions'} className='border border-gray-400 rounded-lg px-[9px] py-[3px]'>
              <Text className='text-base font-pregular text-center'>View All</Text>
            </Link>
          </View>
        </View>

        <View className='flex-1 px-4'>
          {
            transactions.length ?
              <GestureHandlerRootView>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {transactions.map((transaction: any) => (
                    <TouchableOpacity key={transaction._id} onPress={() => handleClick(transaction)}>
                      <Transaction transaction={transaction} />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </GestureHandlerRootView>
              :
              <View className='flex flex-1 items-center justify-center'>
                <Image source={noData} className='w-40 h-40' />
              </View>
          }
        </View>

      </View>

      {/* Transaction Details Modal */}
      <TransactionDetail transaction={selectedTransaction!} isOpen={isModalVisible} onClose={handleCloseModal} />
    </View>
  )
}