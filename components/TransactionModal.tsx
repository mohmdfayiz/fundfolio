import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'expo-router';
import {
    Text,
    View,
    Modal,
    Pressable,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    ToastAndroid,
    findNodeHandle,
    UIManager,
} from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import dateFormat from 'dateformat';
import * as Haptics from 'expo-haptics';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import RadioButton from './RadioButton';
import { PAYMENT_METHODS, TRANSACTION_NOTE_EXAMPLES } from '@/constants/data';
import { getTransactionCategories } from '@/services/transaction';
import { Category, Transaction } from '@/types';

const TransactionModal = ({
    initialState,
    hasExistingTransactions,
    currency,
    isOpen,
    onClose,
    onSave
}: {
    initialState: Transaction,
    hasExistingTransactions: boolean,
    currency: string, isOpen: boolean,
    onClose: () => void,
    onSave: (transaction: Transaction) => void
}) => {

    const [transactionCategories, setTransactionCategories] = useState<Category[]>([]);
    const [transaction, setTransaction] = useState({ ...initialState, amount: initialState.amount.toString() });
    const scrollRef = useRef<ScrollView>(null);
    const descriptionRef = useRef<View>(null);
    const insets = useSafeAreaInsets();

    const isEditing = initialState._id !== undefined;

    // transaction note placeholder
    const getRandomPlaceholder = useMemo(() => {
        return `E.g., ${TRANSACTION_NOTE_EXAMPLES[Math.floor(Math.random() * TRANSACTION_NOTE_EXAMPLES.length)]}`;
    }, [isOpen]);

    const handleSave = () => {
        if (!transaction.amount || !transaction.category || !transaction.paymentMethod || !transaction.transactionType) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            return ToastAndroid.show('Please fill all the required fields', ToastAndroid.LONG);
        }
        if (isNaN(Number(transaction.amount))) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            return ToastAndroid.show('Please enter a valid amount', ToastAndroid.SHORT);
        }
        onSave({ ...transaction, amount: Number(transaction.amount), category: findCategoryId(transaction.category)! });
        setTransaction({ ...transaction, amount: '', category: '', description: '', paymentMethod: '', transactionType: '' });
        onClose();
    }

    const findCategoryId = (name: string) => {
        const category = transactionCategories.find(category => category.name === name);
        return category?._id;
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
            value: new Date(transaction.createdAt),
            onChange,
            mode: 'date',
            minimumDate: new Date(2000, 0, 1),
            maximumDate: new Date(2030, 11, 31),
        });
    };

    const scrollDescriptionIntoView = () => {
        // Keep the focused field above the sticky action buttons.
        requestAnimationFrame(() => {
            const scrollNode = findNodeHandle(scrollRef.current);
            const fieldNode = findNodeHandle(descriptionRef.current);
            if (!scrollNode || !fieldNode) {
                scrollRef.current?.scrollToEnd({ animated: true });
                return;
            }

            UIManager.measureLayout(
                fieldNode,
                scrollNode,
                () => {
                    scrollRef.current?.scrollToEnd({ animated: true });
                },
                (_left, top) => {
                    scrollRef.current?.scrollTo({ y: Math.max(top - 24, 0), animated: true });
                }
            );
        });
    };

    useEffect(() => {
        isOpen && fetchTransactionCategories();
        isOpen && setTransaction({ ...initialState, amount: initialState.amount ? initialState.amount.toString() : '' });
    }, [isOpen]);

    return (
        <Modal
            visible={isOpen}
            onRequestClose={onClose}
            animationType="slide"
            transparent={true}
        >
            <KeyboardAvoidingView
                className='flex-1 bg-white'
                style={{ paddingTop: insets.top }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
            >
                <View className='flex-1 p-4'>
                    <View className='mb-4'>
                        <Text className='text-2xl font-pbold'>{isEditing ? `Transaction` : `Add Transaction`}</Text>
                    </View>

                    <ScrollView
                        ref={scrollRef}
                        className='flex-1'
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 16 }}
                    >
                        <View className='mb-4'>
                            <Text className='text-lg font-pmedium mb-1'>Amount</Text>
                            <TextInput
                                keyboardType='decimal-pad'
                                placeholder={`${currency} 100`}
                                value={transaction.amount}
                                className='border border-slate-400 p-4 rounded-xl font-pregular text-lg text-left'
                                placeholderTextColor={'gray'}
                                onChangeText={(text) => setTransaction({ ...transaction, amount: text })}
                            />
                        </View>
                        <View className='mb-4'>
                            <View className='flex flex-row items-center relative'>
                                <Text className='text-lg font-pmedium mb-1'>Category</Text>
                            </View>
                            <Dropdown
                                data={transactionCategories}
                                value={transaction.category}
                                style={{ borderColor: '#94a3b8', borderWidth: 1, borderRadius: 12, padding: 16 }}
                                placeholderStyle={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: 'gray' }}
                                selectedTextStyle={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: 'black' }}
                                maxHeight={300}
                                placeholder={'Select Category'}
                                onChange={item => { setTransaction({ ...transaction, category: item.name }) }}
                                labelField={'name'}
                                valueField={'name'}
                            />
                            {
                                transactionCategories.length === 0 && !isEditing && !hasExistingTransactions && (
                                    <View>
                                        <Link href={'/transactioncategory'} className='p-1 text-sm font-pregular text-orange-400 underline'>Add transaction categories on your account {'>>'}</Link>
                                    </View>
                                )
                            }
                        </View>
                        <View className='mb-4'>
                            <Text className='text-lg font-pmedium mb-1'>Payment Method</Text>
                            <Dropdown
                                data={PAYMENT_METHODS}
                                value={transaction.paymentMethod}
                                style={{ borderColor: '#94a3b8', borderWidth: 1, borderRadius: 12, padding: 16 }}
                                placeholderStyle={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: 'gray' }}
                                selectedTextStyle={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: 'black' }}
                                maxHeight={300}
                                placeholder={'Select Payment Method'}
                                onChange={item => { setTransaction({ ...transaction, paymentMethod: item.name }) }}
                                labelField={'name'}
                                valueField={'name'}
                            />
                        </View>
                        <View className='mb-4' ref={descriptionRef} collapsable={false}>
                            <Text className='text-lg font-pmedium mb-1'>Description</Text>
                            <TextInput
                                placeholder={getRandomPlaceholder}
                                value={transaction?.description}
                                className='border border-slate-400 p-4 rounded-xl font-pregular text-lg'
                                placeholderTextColor={'gray'}
                                onFocus={scrollDescriptionIntoView}
                                onChangeText={(text) => setTransaction({ ...transaction, description: text })}
                            />
                        </View>
                        <View className='mb-2 flex flex-row'>
                            <View>
                                <Text className='text-lg font-pmedium mb-1'>Transaction Type</Text>
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
                                <Text className='text-lg font-pmedium mb-1'>Date</Text>
                                <Pressable onPress={handleDatePick} className='border border-slate-400 p-4 rounded-xl'>
                                    <Text className='font-pregular text-lg'>{dateFormat(transaction.createdAt, "dd.mm.yyyy")}</Text>
                                </Pressable>
                            </View>
                        </View>
                    </ScrollView>

                    <View className='pt-3 border-t border-slate-200 bg-white'>
                        <View className='flex flex-row justify-between gap-x-4'>
                            <Pressable onPress={onClose} className='border flex-1 border-slate-400 p-4 rounded-xl' >
                                <Text className='text-center text-lg font-psemibold'>Cancel</Text>
                            </Pressable>
                            <Pressable onPress={handleSave} className='border border-green flex-1 bg-green/50 p-4 rounded-xl' >
                                <Text className='text-center text-lg font-psemibold'>{isEditing ? 'Save' : 'Add'}</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    )
}

export default TransactionModal;
