import { useEffect, useState } from 'react';
import { View, Text, SectionList, Pressable, TouchableOpacity, Image } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from 'react-native-toast-message';
import * as Haptics from 'expo-haptics';

import Transaction from '@/components/Transaction';
import TabTitle from '@/components/TabTitle';
import TransactionModal from '@/components/TransactionModal';
import { MONTHS } from '@/constants/data';
import { noData } from '@/constants/images';
import { getTransactions, addTransaction, deleteTransactions } from '@/services/transaction';
import { Transaction as TransactioProps, TransactionGroup } from '@/types';

export default function TransactionScreen() {
    const [showModal, setShowModal] = useState(false);
    const [transactions, setTransactions] = useState<TransactionGroup[]>([]);
    const [multipleSelection, setMultipleSelection] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const isFocused = useIsFocused();

    const fetchTransactions = async () => {
        try {
            const { data } = await getTransactions();
            setTransactions(data);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Oops! Could not fetch transactions. Please try again.',
            })
        }
    };

    const enableMultipleSelection = (id: string) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        setMultipleSelection(true);
        setSelectedItems([...selectedItems, id]);
    };

    const handleSelectItem = (id: string) => {
        if (!multipleSelection) {
            return;
        } else if (selectedItems.includes(id) && selectedItems.length > 1) {
            setSelectedItems((prev) => prev.filter((item) => item !== id));
        } else if (selectedItems.includes(id) && selectedItems.length === 1) {
            setMultipleSelection(false);
            setSelectedItems([]);
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    const handleDeleteTransactions = async () => {
        try {
            await deleteTransactions(selectedItems);

            Toast.show({
                type: 'success',
                text1: 'Transactions deleted successfully.',
            })

            await fetchTransactions();
            setMultipleSelection(false);
            setSelectedItems([]);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Transactions could not be deleted, please try again.',
            })
        }
    };

    const saveTransaction = async (transaction: TransactioProps) => {
        if (!transaction.category || !transaction.paymentMethod || !transaction.transactionType) {
            setShowModal(false);
            return Toast.show({
                type: 'error',
                text1: 'Please fill all the fields.',
                text2: !transaction.category ? "Add categories from your account menu, if you haven't already" : '',
            })
        }
        try {
            const now = new Date();
            const originalDate = new Date(transaction.createdAt);

            // Reset the time while keeping the original date
            originalDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());

            // Convert back to ISO string
            const newCreatedAt = originalDate.toISOString();

            await addTransaction({ ...transaction, createdAt: newCreatedAt });
            await fetchTransactions();
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Transaction could not be saved, please try again.',
            })
        } finally {
            setShowModal(false);
        }
    };

    useEffect(() => {
        isFocused && fetchTransactions();
        setMultipleSelection(false);
        setSelectedItems([]);
    }, [isFocused]);

    return (
        <SafeAreaView>
            <View className='flex h-full'>
                <View className='px-4 pt-4 pb-3'>
                    <TabTitle title='Transactions' icon='💵' subTitle='Track your money!' />
                </View>
                <View className='flex-1'>
                    {
                        transactions.length ?
                            <SectionList
                                showsVerticalScrollIndicator={false}
                                sections={transactions}
                                renderSectionHeader={({ section: { _id, totalAmount } }) => (
                                    <View className='flex flex-row justify-between bg-gray-200 px-4 py-1 my-1'>
                                        <Text className='text-lg font-pregular'>{MONTHS.at(_id.month - 1)} {_id.year}</Text>
                                        <Text className={`text-lg font-psemibold`}>₹ {totalAmount}</Text>
                                    </View>
                                )}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        key={item._id}
                                        className={`px-4 ${selectedItems.includes(item._id) ? 'bg-green/20' : ''}`}
                                        onPress={() => handleSelectItem(item._id)}
                                        onLongPress={() => enableMultipleSelection(item._id)}
                                    >
                                        <Transaction {...item} />
                                    </TouchableOpacity>
                                )}
                            /> :
                            <View className='flex flex-1 items-center justify-center'>
                                <Image source={noData} className='w-40 h-40' />
                            </View>
                    }
                </View>
                {
                    multipleSelection ?
                        <Pressable
                            onPress={handleDeleteTransactions}
                            className='absolute bottom-4 right-4 p-4 rounded-xl border border-slate-400 bg-black/60'
                        >
                            <Text>🗑️</Text>
                        </Pressable> :
                        <Pressable
                            onPress={() => setShowModal(true)}
                            className='absolute bottom-4 right-4 p-4 rounded-xl border border-slate-400 bg-black/30'
                        >
                            <Text>➕</Text>
                        </Pressable>}
            </View>
            <TransactionModal isOpen={showModal} onClose={() => setShowModal(false)} onSave={saveTransaction} />
        </SafeAreaView>
    );
}