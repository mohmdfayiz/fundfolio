import { View, Text } from "react-native";

type TransactionProps = {
    icon: string;
    category: string;
    date: string;
    amount: number;
    transactionType: string;
    bgColour: string;
}

const Transaction = ({ icon, category, date, amount, transactionType, bgColour }: TransactionProps) => {
    return (
        <View className='flex flex-row gap-2 items-center justify-between mb-3'>
            <View className={`h-16 w-16 items-center justify-center rounded-xl ${bgColour}`}>
                <Text className='text-3xl'>{icon}</Text>
            </View>
            <View className='flex-1'>
                <Text className='text-base font-psemibold'>{category}</Text>
                <Text className='text-sm font-pregular'>{date}</Text>
            </View>
            <View className='items-end'>
                <Text className='text-base font-psemibold text-red'>₹ {amount}</Text>
                <Text className='text-sm font-pregular'>{transactionType}</Text>
            </View>
        </View>
    )
}

export default Transaction;