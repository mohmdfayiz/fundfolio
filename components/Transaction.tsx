import { View, Text } from "react-native";
import dateformat from 'dateformat';
import { TransactionDetails } from '@/types';

const Transaction = ({ transaction, currency }: { transaction: TransactionDetails, currency: string }) => {
    return (
        <View className='flex flex-row gap-2 items-center justify-between py-1'>
            <View style={{ backgroundColor: transaction.category.bgColour }} className={`h-16 w-16 items-center justify-center rounded-xl`}>
                <Text className='text-3xl'>{transaction.category.icon}</Text>
            </View>
            <View className='flex-1'>
                <Text className='text-lg font-psemibold'>{transaction.category.name}</Text>
                <Text className='text-base font-pregular'>{dateformat(transaction?.createdAt, "dddd, dd mmm yyyy")}</Text>
            </View>
            <View className='items-end'>
                <Text className={`text-lg font-psemibold ${transaction.transactionType === 'Income' ? 'text-green' : 'text-red'}`}>
                    {currency} {transaction.transactionType === 'Income' ? transaction.amount : transaction.amount * -1}
                </Text>
                <Text className='text-base font-pregular'>{transaction.paymentMethod}</Text>
            </View>
        </View>
    )
}

export default Transaction;