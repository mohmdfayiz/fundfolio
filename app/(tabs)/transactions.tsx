import { useEffect, useState } from 'react';
import { View, Text, SectionList, Pressable, TouchableOpacity, Image } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from 'react-native-toast-message';
import * as Haptics from 'expo-haptics';

import { useGlobalContext } from '@/context/GlobalContext';
import Transaction from '@/components/Transaction';
import TabTitle from '@/components/TabTitle';
import TransactionModal from '@/components/TransactionModal';
import { MONTHS } from '@/constants/data';
import { noData } from '@/constants/images';
import { getTransactions, addTransaction, deleteTransactions, updateTransaction } from '@/services/transaction';
import { Transaction as TransactioProps, TransactionGroup } from '@/types';

export default function TransactionScreen() {
    const [showModal, setShowModal] = useState(false);
    const [transactions, setTransactions] = useState<TransactionGroup[]>([]);
    const [transaction, setTransaction] = useState({ amount: 0, category: '', paymentMethod: '', description: '', transactionType: '', createdAt: new Date() });
    const [multipleSelection, setMultipleSelection] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const { user } = useGlobalContext();
    const isFocused = useIsFocused();
    const insets = useSafeAreaInsets();

    const fetchTransactions = async () => {
        const { data } = await getTransactions();
        setTransactions(data);
    };

    const enableMultipleSelection = (id: string) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        setMultipleSelection(true);
        setSelectedItems([...selectedItems, id]);
    };

    const handleSelectItem = (transaction: TransactioProps) => {
        if (!multipleSelection) {
            setTransaction({ description: '', ...transaction });
            setShowModal(true);
        } else if (selectedItems.includes(transaction._id!) && selectedItems.length > 1) {
            setSelectedItems((prev) => prev.filter((item) => item !== transaction._id));
        } else if (selectedItems.includes(transaction._id!) && selectedItems.length === 1) {
            setMultipleSelection(false);
            setSelectedItems([]);
        } else {
            setSelectedItems([...selectedItems, transaction._id!]);
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

    const saveTransaction = async (data: TransactioProps) => {
        try {
            const now = new Date();
            const originalDate = new Date(data.createdAt);
            // Reset the time while keeping the original date
            originalDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
            // Convert back to ISO string
            const newCreatedAt = originalDate.toISOString();

            const isEditing = data._id !== undefined;

            isEditing
                ? await updateTransaction({ ...data, createdAt: data.createdAt == transaction.createdAt ? data.createdAt : newCreatedAt })
                : await addTransaction({ ...data, createdAt: newCreatedAt });

            await fetchTransactions();
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Transaction could not be saved, please try again.',
            })
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setTransaction({ amount: 0, category: '', paymentMethod: '', description: '', transactionType: '', createdAt: new Date() });
    };

    useEffect(() => {
        isFocused && fetchTransactions();
        showModal && setShowModal(false);
        setMultipleSelection(false);
        setSelectedItems([]);
    }, [isFocused]);

    return (
        <View className='bg-gray-50' style={{ paddingTop: insets.top }}>
            <View className='flex h-full'>
                <View className='px-4 pt-4 pb-3'>
                    <TabTitle title='Transactions' icon='💵' subTitle='Track your money!' />
                </View>
                <View className='flex-1'>
                    <SectionList
                        showsVerticalScrollIndicator={false}
                        sections={transactions}
                        renderSectionHeader={({ section: { _id, totalAmount } }) => (
                            <View className='flex flex-row justify-between bg-gray-200 px-4 py-1 my-1'>
                                <Text className='text-xl font-pregular'>{MONTHS.at(_id.month - 1)} {_id.year}</Text>
                                <Text className={`text-xl font-psemibold`}>{user?.currency || '$'} {totalAmount}</Text>
                            </View>
                        )}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                key={item._id}
                                className={`px-4 ${selectedItems.includes(item._id) ? 'bg-green/20' : ''}`}
                                onPress={() => handleSelectItem({ ...item, category: item.category.name, amount: item.transactionType === 'Expense' ? item.amount * -1 : item.amount })}
                                onLongPress={() => enableMultipleSelection(item._id)}
                            >
                                <Transaction transaction={item} currency={user?.currency || '$'} />
                            </TouchableOpacity>
                        )}
                        ListFooterComponent={() => (transactions.length > 0 && <View className='h-16' />)}
                        contentContainerStyle={{ flexGrow: 1 }}
                        ListEmptyComponent={
                            <View className='flex-1 items-center justify-center'>
                                <Image source={noData} className='w-40 h-40' />
                            </View>
                        }
                    />
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

            {/* Transaction Modal */}
            <TransactionModal
                isOpen={showModal}
                initialState={transaction}
                hasExistingTransactions={!!transactions.length}
                currency={user?.currency || '$'}
                onSave={saveTransaction}
                onClose={handleCloseModal}
            />
        </View>
    );
}