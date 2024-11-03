import { useEffect, useState } from "react";
import { View, Text, Pressable, Image, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ScrollView } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import YearPicker from "@/components/YearPicker";

import TransactionPieChart from "@/components/PieChart";
import TabTitle from "@/components/TabTitle";
import Transaction from "@/components/Transaction";
import TransactionDetail from "@/components/TransactionDetails";
import { MONTHS, YEARS } from "@/constants/data";
import { noData } from "@/constants/images";
import { getTransactionStats, getTransactionsByDate } from "@/services/transaction";
import { TransactionDetails, Stats } from "@/types";

export default function TransactionStatistics() {
    const today = new Date();
    const isFocused = useIsFocused();

    const [date, setDate] = useState({ month: today.getMonth(), year: today.getFullYear() });
    const [stats, setStats] = useState<Stats>({ totalAmount: 0, income: 0, expense: 0 });
    const [transactions, setTransactions] = useState<TransactionDetails[]>([]);
    const [isYearPickerVisible, setIsYearPickerVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<TransactionDetails | null>(null);

    const fetchStats = async () => {
        try {
            const { data } = await getTransactionStats(date.month + 1, date.year);
            setStats(data?.totalAmount ? data : { totalAmount: 0, income: 0, expense: 0 });
        } catch (error) {
            // console.error(error);
        }
    }

    const fetchTransactions = async (date: { month: number, year: number }) => {
        try {
            const { data } = await getTransactionsByDate(date.month + 1, date.year);
            setTransactions(data?.transactions || []);
        } catch (error) {
            // console.error(error);
        }
    }

    const handleDateChange = (month: number) => {
        setDate({ month, year: date.year });
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
            fetchTransactions(date);
        }
    }, [isFocused, date])

    return (
        <SafeAreaView>
            <View className="flex h-full">
                <View className="p-4">
                    <TabTitle title='Statistics' icon='📈' subTitle='Analyze Your Data!' />
                </View>
                <View className="px-4">
                    <TransactionPieChart stats={stats} month={MONTHS[date.month]} />
                </View>
                <View className='px-4 pt-4 pb-3'>
                    <View className='flex flex-row items-center'>
                        <GestureHandlerRootView>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <Pressable onPress={() => setIsYearPickerVisible(true)} className={`border border-gray-400 rounded-xl mr-4 px-4 py-2`}>
                                    <Text className='text-sm font-pregular text-center'>{date.year}</Text>
                                </Pressable>
                                <YearPicker
                                    years={YEARS}
                                    isVisible={isYearPickerVisible}
                                    onSelectYear={(year) => setDate({ month: date.month, year })}
                                    onClose={() => { setIsYearPickerVisible(false) }}
                                />
                                {
                                    MONTHS.map((month, index) => (
                                        <Pressable
                                            key={index}
                                            onPress={() => handleDateChange(index)}
                                            className={`border border-gray-400 rounded-xl mr-4 px-4 py-2 ${index === date?.month ? 'bg-gray-200' : ''}`}
                                        >
                                            <Text className='text-sm font-pregular text-center'>{month}</Text>
                                        </Pressable>
                                    ))
                                }
                            </ScrollView>
                        </GestureHandlerRootView>
                    </View>
                </View>
                <View className='flex-1 px-4'>
                    <GestureHandlerRootView>
                        {
                            transactions.length ?
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={transactions}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => handleClick(item)}>
                                            <Transaction {...item} />
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={(item) => item._id}
                                />
                                :
                                <View className='flex flex-1 items-center justify-center'>
                                    <Image source={noData} className='w-40 h-40' />
                                </View>
                        }
                    </GestureHandlerRootView>
                </View>
            </View>

            {/* Transaction Details Modal */}
            <TransactionDetail transaction={selectedTransaction!} isOpen={isModalVisible} onClose={handleCloseModal} />

        </SafeAreaView >
    );
}
