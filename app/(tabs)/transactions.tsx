import { useState } from 'react';
import { View, Text, SectionList, Pressable } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Transaction from '@/components/Transaction';
import { TRANSACTIONS } from '@/constants/data';
import TabTitle from '@/components/TabTitle';
import TransactionModal from '@/components/TransactionModal';

export default function TransactionScreen() {
    const [showModal, setShowModal] = useState(false);
    return (
        <SafeAreaView>
            <View className='flex flex-col gap-4 py-4'>
                <View className='px-4'>
                    <View>
                        <TabTitle title='Transactions' icon='💵' subTitle='Track your money!' />
                    </View>
                </View>
                <SectionList
                    className='h-[80vh]'
                    showsVerticalScrollIndicator={false}
                    sections={TRANSACTIONS}
                    renderSectionHeader={({ section: { title, total } }) => (
                        <View className='flex flex-row justify-between bg-gray-200 px-4 py-1 mb-3'>
                            <Text className='text-lg font-pregular'>{title}</Text>
                            <Text className='text-lg font-psemibold'>₹ {total}</Text>
                        </View>
                    )}
                    renderItem={({ item }) => (
                        <View className='px-4'>
                            <Transaction {...item} />
                        </View>
                    )}
                />
                <Pressable
                    onPress={() => setShowModal(true)}
                    className='absolute bottom-8 right-4 p-4 rounded-xl border border-slate-400 bg-black/30'
                >
                    <Text>➕</Text>
                </Pressable>
            </View>
            <TransactionModal isOpen={showModal} onClose={() => setShowModal(false)} />
        </SafeAreaView>
    );
}