import { View, Text } from "react-native";
import dateformat from 'dateformat';
import { TransactionDetails } from '@/types';

const Transaction = (transaction: TransactionDetails) => {
    return (
        <View className='flex flex-row gap-2 items-center justify-between py-2'>
            <View style={{ backgroundColor: transaction.category.bgColour }} className={`h-14 w-14 items-center justify-center rounded-xl`}>
                <Text className='text-2xl'>{transaction.category.icon}</Text>
            </View>
            <View className='flex-1'>
                <Text className='text-base font-psemibold'>{transaction.category.name}</Text>
                <Text className='text-sm font-pregular'>{dateformat(transaction?.createdAt, "dddd, dd mmm yyyy")}</Text>
            </View>
            <View className='items-end'>
                <Text className={`text-base font-psemibold ${transaction.transactionType === 'Income' ? 'text-green' : 'text-red'}`}>
                    ₹ {transaction.transactionType === 'Income' ? transaction.amount : transaction.amount * -1}
                </Text>
                <Text className='text-sm font-pregular'>{transaction.paymentMethod}</Text>
            </View>
        </View>
    )
}

export default Transaction;