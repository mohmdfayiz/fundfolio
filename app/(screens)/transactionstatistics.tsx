import { useEffect, useState } from "react";
import { View, Text, Pressable, Image, TouchableOpacity, FlatList, ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ScrollView } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import YearPicker from "@/components/YearPicker";
import * as Haptics from "expo-haptics";

import { useGlobalContext } from "@/context/GlobalContext";
import TransactionPieChart from "@/components/PieChart";
import TabTitle from "@/components/TabTitle";
import Transaction from "@/components/Transaction";
import TransactionCategory from "@/components/TransactionCategory";
import TransactionDetail from "@/components/TransactionDetails";
import SummaryModal from "@/components/SummaryModal";
import { MONTHS, YEARS } from "@/constants/data";
import { noData } from "@/constants/images";
import icons from "@/constants/icons";
import { addNote } from "@/services/note";
import { getTransactionsByDate, getTransactionSummary } from "@/services/transaction";
import { TransactionDetails, Stats, ExpenseByCategory } from "@/types";

export default function TransactionStatistics() {
    const today = new Date();
    const isFocused = useIsFocused();
    const { user } = useGlobalContext();

    const [date, setDate] = useState({ month: today.getMonth(), year: today.getFullYear() });
    const [stats, setStats] = useState<Stats>({ totalAmount: 0, income: 0, expense: 0 });
    const [transactions, setTransactions] = useState<TransactionDetails[]>([]);
    const [categories, setCategories] = useState<ExpenseByCategory[]>([]);
    const [selectedTab, setSelectedTab] = useState<'transactions' | 'summary'>('transactions');
    const [isYearPickerVisible, setIsYearPickerVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState<'transaction' | 'summary' | null>(null);
    const [selectedTransaction, setSelectedTransaction] = useState<TransactionDetails | null>(null);
    const [summary, setSummary] = useState('');

    const fetchTransactions = async (date: { month: number, year: number }) => {
        try {
            const { data } = await getTransactionsByDate(date.month + 1, date.year);
            setTransactions(data?.transactions || []);
            setStats(data?.stats || { totalAmount: 0, income: 0, expense: 0 });
            setCategories(data?.categories || []);
        } catch (error) {
            // console.error(error);
        }
    }

    const fetchTransactionSummary = async (date: { month: number, year: number }) => {
        setIsModalVisible('summary');
        if (summary) return;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        try {
            const { data } = await getTransactionSummary(date.month + 1, date.year);
            setSummary(data?.summary || '');
        } catch (error) {
            console.error(error);
        }
    }

    const handleDateChange = (month: number) => {
        setDate({ month, year: date.year });
    }

    const handleClick = (transaction: TransactionDetails) => {
        setIsModalVisible('transaction');
        setSelectedTransaction(transaction);
    }

    const handleCloseModal = () => {
        setIsModalVisible(null);
        setSelectedTransaction(null);
    }

    const handleSummaryClose = async (save = false) => {
        setIsModalVisible(null);
        if (save) {
            await addNote({
                title: `${MONTHS[date.month]} ${date.year} : Transaction Summary`,
                content: summary,
                pinned: false,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            ToastAndroid.show('Summary saved to notes', ToastAndroid.SHORT);
        }
    }

    useEffect(() => {
        if (isFocused) {
            fetchTransactions(date);
            setSummary('');
        }
    }, [isFocused, date])

    return (
        <SafeAreaView className='bg-gray-50'>
            <View className="flex h-full">
                <View className="p-4 flex flex-row items-center justify-between">
                    <TabTitle title='Statistics' icon='📈' subTitle={'Spending insights!'} />
                    {transactions.length > 0 &&
                        <Pressable
                            onPress={() => fetchTransactionSummary(date)}
                            className='border border-gray-300 rounded-xl py-2 px-3'
                        >
                            <Text className='text-lg text-center'>✨</Text>
                        </Pressable>
                    }
                </View>
                <View className="px-4">
                    <TransactionPieChart stats={stats} month={MONTHS[date.month]} currency={user?.currency || '$'} />
                </View>
                <View className='px-4 pt-4 pb-2'>
                    <View className='flex flex-row items-center'>
                        <GestureHandlerRootView>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <Pressable onPress={() => setIsYearPickerVisible(true)} className={`border border-gray-300 rounded-xl mr-4 px-4 py-2`}>
                                    <Text className='text-base font-pregular text-center'>{date.year}</Text>
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
                                            className={`border border-gray-300 rounded-xl mr-4 px-4 py-2 ${index === date?.month ? 'bg-gray-200' : undefined}`}
                                        >
                                            <Text className='text-base font-pregular text-center'>{month}</Text>
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
                                selectedTab === 'transactions' ?
                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        data={transactions}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity onPress={() => handleClick(item)}>
                                                <Transaction transaction={item} currency={user?.currency || '$'} />
                                            </TouchableOpacity>
                                        )}
                                        ListFooterComponent={() => (<View className='h-20' />)}
                                        keyExtractor={(item) => item._id}
                                    />
                                    :
                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        data={categories}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity>
                                                <TransactionCategory category={item} currency={user?.currency || '$'} />
                                            </TouchableOpacity>
                                        )}
                                        ListFooterComponent={() => (<View className='h-20' />)}
                                        keyExtractor={(item) => item._id}
                                    />
                                :
                                <View className='flex flex-1 items-center justify-center'>
                                    <Image source={noData} className='w-40 h-40' />
                                </View>
                        }
                    </GestureHandlerRootView>
                </View>
                <TouchableOpacity
                    onPress={() => setSelectedTab((prev) => prev === 'transactions' ? 'summary' : 'transactions')}
                    className={`absolute bottom-8 right-4 p-4 rounded-xl border border-slate-400 bg-black/30`}
                >
                    <Image source={icons.toggle} className='w-4 h-4' />
                </TouchableOpacity>
            </View>

            {/* Transaction Details Modal */}
            <TransactionDetail transaction={selectedTransaction!} currency={user?.currency || '$'} isOpen={isModalVisible === 'transaction'} onClose={handleCloseModal} />

            {/* Summary Modal */}
            <SummaryModal summary={summary} isOpen={isModalVisible === 'summary'} onClose={handleSummaryClose} />

        </SafeAreaView >
    );
}
