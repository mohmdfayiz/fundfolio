import { View, Text, SectionList } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Transaction from '@/components/Transaction';

const DATA = [
    {
        title: 'May 2022',
        total: '2000',
        data: [
            {
                id: 1,
                icon: '🛺',
                category: 'Travel',
                date: '2022-01-01',
                amount: 100,
                transactionType: 'Cash',
                bgColour: 'bg-green-200'
            },
            {
                id: 2,
                icon: '🍲',
                category: 'Food',
                date: '2022-01-01',
                amount: 100,
                transactionType: 'UPI',
                bgColour: 'bg-orange-200'
            }
        ],
    },
    {
        title: 'April 2022',
        total: '4000',
        data: [
            {
                id: 1,
                icon: '🛺',
                category: 'Travel',
                date: '2022-01-01',
                amount: 100,
                transactionType: 'Cash',
                bgColour: 'bg-green-200'
            },
            {
                id: 2,
                icon: '🍲',
                category: 'Food',
                date: '2022-01-01',
                amount: 100,
                transactionType: 'UPI',
                bgColour: 'bg-orange-200'
            },
            {
                id: 3,
                icon: '🎫',
                category: 'Entertainment',
                date: '2022-01-01',
                amount: 100,
                transactionType: 'UPI',
                bgColour: 'bg-indigo-200'
            },
            {
                id: 4,
                icon: '🛺',
                category: 'Travel',
                date: '2022-01-01',
                amount: 100,
                transactionType: 'Cash',
                bgColour: 'bg-green-200'
            },
            {
                id: 23,
                icon: '🍲',
                category: 'Food',
                date: '2022-01-01',
                amount: 100,
                transactionType: 'UPI',
                bgColour: 'bg-orange-200'
            },
            {
                id: 35,
                icon: '🎫',
                category: 'Entertainment',
                date: '2022-01-01',
                amount: 100,
                transactionType: 'UPI',
                bgColour: 'bg-indigo-200'
            },
        ],
    }
]

export default function TransactionScreen() {
    return (
        <SafeAreaView>
            <View className='flex flex-col gap-4 py-4'>
                <View className='px-4'>
                    <Text className='text-2xl font-pbold'>Transactions 💵</Text>
                    <Text className='font-pregular text-sm'>Track your money!</Text>
                </View>
                <SectionList
                    className='h-[80vh]'
                    showsVerticalScrollIndicator={false}
                    sections={DATA}
                    renderItem={({ item }) => (
                        <View className='px-4'>
                            <Transaction {...item} />
                        </View>
                    )}
                    renderSectionHeader={({ section: { title, total } }) => (
                        <View className='flex flex-row justify-between bg-gray-200 px-4 py-1 mb-3'>
                            <Text className='text-lg font-pregular'>{title}</Text>
                            <Text className='text-lg font-psemibold'>₹ {total}</Text>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
}