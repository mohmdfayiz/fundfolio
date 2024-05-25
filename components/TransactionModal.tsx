import { useState } from 'react';
import { Text, View, Modal, Pressable, TextInput } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import RadioButton from './RadioButton';
import { CATEGORIES, PAYMENT_METHODS } from '@/constants/data';


const TransactionModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {

    const [category, setCategory] = useState<string>('');
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const [transactionType, setTransactionType] = useState<string>('');

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
                                className='border border-slate-400 p-4 rounded-xl font-pregular text-base' />
                        </View>
                        <View>
                            <Text className='text-base font-pmedium mb-1'>Category</Text>
                            <Dropdown
                                data={CATEGORIES}
                                search
                                style={{ borderColor: '#94a3b8', borderWidth: 1, borderRadius: 12, padding: 12 }}
                                placeholderStyle={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: 'gray' }}
                                selectedTextStyle={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: 'black' }}
                                inputSearchStyle={{ fontFamily: 'Poppins-Regular', fontSize: 16 }}
                                maxHeight={300}
                                placeholder={'Select Category'}
                                searchPlaceholder="Search..."
                                onChange={item => {
                                    setCategory(item.name)
                                }}
                                labelField={'name'}
                                valueField={'name'}
                            />
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
                                searchPlaceholder="Search..."
                                onChange={item => {
                                    setPaymentMethod(item.name)
                                }}
                                labelField={'name'}
                                valueField={'name'}
                            />
                        </View>
                        <View>
                            <Text className='text-base font-pmedium mb-1'>Transaction Type</Text>
                            <View className='flex flex-row place-items-center gap-4'>
                                <View>
                                    <RadioButton name='Income' value={transactionType} setValue={setTransactionType} />
                                </View>
                                <View>
                                    <RadioButton name='Expense' value={transactionType} setValue={setTransactionType} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View className='flex-1 justify-end'>
                    <View className='flex flex-row justify-between items-center gap-4'>
                        <Pressable onPress={onClose} className='border flex-1 border-slate-400 p-4 rounded-xl' >
                            <Text className='text-center text-base font-psemibold'>Cancel</Text>
                        </Pressable>
                        <Pressable className='border border-green flex-1 bg-green/50 p-4 rounded-xl' >
                            <Text className='text-center text-base font-psemibold'>Add</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default TransactionModal;