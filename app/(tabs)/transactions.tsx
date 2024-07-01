import { useEffect, useState } from 'react';
import { View, Text, SectionList, Pressable } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import Transaction from '@/components/Transaction';
import TabTitle from '@/components/TabTitle';
import TransactionModal from '@/components/TransactionModal';
import { MONTHS } from '@/constants/data';
import { getTransactions, addTransaction } from '@/services/transaction';

type Transaction = {
    _id: string;
    amount: number;
    category: {
        name: string;
        icon: string;
        bgColour: string;
    };
    paymentMethod: string;
    transactionType: string;
    createdAt: Date;
};

type TransactionGroup = {
    _id: { month: number, year: number };
    totalAmount: number;
    data: Transaction[];
};

export default function TransactionScreen() {
    const [showModal, setShowModal] = useState(false);
    const [transactions, setTransactions] = useState<TransactionGroup[]>([]);

    const isFocused = useIsFocused();

    const fetchTransactions = async () => {
        const { data }: { data: TransactionGroup[] } = await getTransactions();
        setTransactions(data);
    };

    const saveTransaction = async (transaction: any) => {
        await addTransaction({ ...transaction, createdAt: new Date(transaction.createdAt).setTime(new Date().getTime()) });
        await fetchTransactions();
        setShowModal(false);
    };

    useEffect(() => {
        isFocused && fetchTransactions();
    }, [isFocused]);

    return (
        <SafeAreaView>
            <View className='flex h-full'>
                <View className='p-4'>
                    <TabTitle title='Transactions' icon='💵' subTitle='Track your money!' />
                </View>
                <View className='flex-1'>
                    <SectionList
                        showsVerticalScrollIndicator={false}
                        sections={transactions}
                        renderSectionHeader={({ section: { _id, totalAmount } }) => (
                            <View className='flex flex-row justify-between bg-gray-200 px-4 py-1 mb-3'>
                                <Text className='text-lg font-pregular'>{MONTHS.at(_id.month - 1)} {_id.year}</Text>
                                <Text className={`text-lg font-psemibold`}>₹ {totalAmount}</Text>
                            </View>
                        )}
                        renderItem={({ item }) => (
                            <View className='px-4'>
                                <Transaction {...item} />
                            </View>
                        )}
                    />
                </View>
                <Pressable
                    onPress={() => setShowModal(true)}
                    className='absolute bottom-4 right-4 p-4 rounded-xl border border-slate-400 bg-black/30'
                >
                    <Text>➕</Text>
                </Pressable>
            </View>
            <TransactionModal isOpen={showModal} onClose={() => setShowModal(false)} onSave={saveTransaction} />
        </SafeAreaView>
    );
}