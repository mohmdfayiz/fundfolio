import { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { Text, View, Modal, Pressable, TextInput } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import dateFormat from 'dateformat';

import RadioButton from './RadioButton';
import { PAYMENT_METHODS } from '@/constants/data';
import { getTransactionCategories } from '@/services/transaction';
import { Category } from '@/types';

const TransactionModal = ({ isOpen, onClose, onSave }: { isOpen: boolean, onClose: () => void, onSave: ({ amount, category, paymentMethod, transactionType, createdAt }: { amount: number, category: string, paymentMethod: string, transactionType: string, createdAt: Date }) => void }) => {

    const [transactionCategories, setTransactionCategories] = useState<Category[]>([]);
    const [transaction, setTransaction] = useState({
        amount: 0,
        category: '',
        paymentMethod: '',
        transactionType: '',
        createdAt: new Date(),
    })

    const handleSave = () => {
        onSave(transaction);
        setTransaction({ ...transaction, amount: 0, category: '', paymentMethod: '', transactionType: '' });
        onClose();
    }

    const fetchTransactionCategories = async () => {
        try {
            const { data } = await getTransactionCategories();
            setTransactionCategories(data);
        } catch (error) {
            console.log(error);
        }
    }

    const setTransactionType = (value: string) => {
        setTransaction({ ...transaction, transactionType: value });
    }

    const onChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        if (selectedDate) {
            setTransaction({ ...transaction, createdAt: selectedDate });
        }
    };

    const handleDatePick = () => {
        DateTimePickerAndroid.open({
            value: transaction.createdAt,
            onChange,
            mode: 'date',
        });
    };

    useEffect(() => {
        isOpen && fetchTransactionCategories();
    }, [isOpen]);

    return (
        <Modal
            visible={isOpen}
            onRequestClose={onClose}
            animationType="slide"
            presentationStyle="pageSheet"
        >
            <View className='flex flex-col flex-1 gap-4 p-4 min-h-fit'>
                <View>
                    <Text className='text-2xl font-pbold'>Add Transaction</Text>
                </View>

                <View>
                    <View className='flex flex-col gap-4'>
                        <View>
                            <Text className='text-base font-pmedium mb-1'>Amount</Text>
                            <TextInput
                                keyboardType='numeric'
                                placeholder='₹ 100'
                                className='border border-slate-400 p-4 rounded-xl font-pregular text-base'
                                onChangeText={(text) => setTransaction({ ...transaction, amount: parseFloat(text) })}
                            />
                        </View>
                        <View>
                            <View className='flex flex-row items-center relative'>
                                <Text className='text-base font-pmedium mb-1'>Category</Text>
                            </View>
                            <Dropdown
                                data={transactionCategories}
                                style={{ borderColor: '#94a3b8', borderWidth: 1, borderRadius: 12, padding: 12 }}
                                placeholderStyle={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: 'gray' }}
                                selectedTextStyle={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: 'black' }}
                                inputSearchStyle={{ fontFamily: 'Poppins-Regular', fontSize: 16 }}
                                maxHeight={300}
                                placeholder={'Select Category'}
                                onChange={item => { setTransaction({ ...transaction, category: item._id! }) }}
                                labelField={'name'}
                                valueField={'name'}
                            />
                            {
                                transactionCategories.length === 0 && (
                                    <View className='ml-1'>
                                        <Link href={'/transactionCategory'} className='text-xs font-pregular text-red-400'>Add transaction categories on your account {'>>'}</Link>
                                    </View>
                                )
                            }
                        </View>
                        <View>
                            <Text className='text-base font-pmedium mb-1'>Payment Method</Text>
                            <Dropdown
                                data={PAYMENT_METHODS}
                                style={{ borderColor: '#94a3b8', borderWidth: 1, borderRadius: 12, padding: 12 }}
                                placeholderStyle={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: 'gray' }}
                                selectedTextStyle={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: 'black' }}
                                inputSearchStyle={{ fontFamily: 'Poppins-Regular', fontSize: 16 }}
                                maxHeight={300}
                                placeholder={'Select Payment Method'}
                                onChange={item => { setTransaction({ ...transaction, paymentMethod: item.name }) }}
                                labelField={'name'}
                                valueField={'name'}
                            />
                        </View>
                        <View className='flex flex-row'>
                            <View>
                                <Text className='text-base font-pmedium mb-1'>Transaction Type</Text>
                                <View className='flex flex-row place-items-center gap-4'>
                                    <View>
                                        <RadioButton name='Income' value={transaction.transactionType} setValue={setTransactionType} />
                                    </View>
                                    <View>
                                        <RadioButton name='Expense' value={transaction.transactionType} setValue={setTransactionType} />
                                    </View>
                                </View>
                            </View>
                            <View className='ml-4 flex-1'>
                                <Text className='text-base font-pmedium mb-1'>Date</Text>
                                <Pressable onPress={handleDatePick} className='border border-slate-400 p-4 rounded-xl'>
                                    <Text className='font-pregular text-base'>{dateFormat(transaction.createdAt, "dd mmm yyyy")}</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>

                <View className='flex-1 justify-end'>
                    <View className='flex flex-row justify-between gap-x-4'>
                        <Pressable onPress={onClose} className='border flex-1 border-slate-400 p-4 rounded-xl' >
                            <Text className='text-center text-base font-psemibold'>Cancel</Text>
                        </Pressable>
                        <Pressable onPress={handleSave} className='border border-green flex-1 bg-green/50 p-4 rounded-xl' >
                            <Text className='text-center text-base font-psemibold'>Add</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default TransactionModal;