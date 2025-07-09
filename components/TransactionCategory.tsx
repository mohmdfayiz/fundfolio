import { View, Text } from "react-native";
import dateformat from 'dateformat';
import { ExpenseByCategory } from '@/types';

const TransactionCategory = ({ category, date }: { category: ExpenseByCategory, date: Date }) => {
    return (
        <View className='flex flex-row gap-2 items-center justify-between py-1'>
            <View style={{ backgroundColor: category.bgColour }} className={`h-16 w-16 items-center justify-center rounded-xl`}>
                <Text className='text-3xl'>{category.icon}</Text>
            </View>
            <View className='flex-1'>
                <Text className='text-lg font-psemibold'>{category.name}</Text>
                <Text className='text-base font-pregular'>{`${category.count} transaction${category.count > 1 ? 's' : ''}`}</Text>
            </View>
            <View className='items-end'>
                <Text className={`text-lg font-psemibold ${category.totalAmount >= 0 ? 'text-green' : 'text-red'}`}>
                    ₹ {category.totalAmount >= 0 ? category.totalAmount : category.totalAmount * -1}
                </Text>
                <Text className='text-base font-pregular'>
                    {`${category?.percentageOfIncome === 0
                        ? category?.percentageOfExpense
                        : category?.percentageOfIncome > 0
                            ? category?.percentageOfIncome
                            : category?.percentageOfIncome * -1
                        }%`}
                </Text>
            </View>
        </View>
    )
}

export default TransactionCategory;