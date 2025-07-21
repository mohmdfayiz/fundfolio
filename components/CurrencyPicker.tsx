import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet, Pressable } from 'react-native';

import { CURRENCIES } from '@/constants/data';
import { User } from '@/types';

const CurrencyPicker = ({ isOpen, user, onSave, onClose }: { isOpen: boolean, user: User | null, onSave: (user: User) => void, onClose: () => void }) => {

    const [currency, setCurrency] = useState(user?.currency || '$');

    const handleSave = async () => {
        if (!currency) return;
        onSave({ ...user, currency } as User);
        onClose();
    }

    const renderCurrencyItem = ({ item }: { item: { id: number, name: string, symbol: string } }) => (
        <TouchableOpacity
            className={`p-2 border-b border-gray-200 flex-row justify-between items-center ${currency === item.symbol ? 'bg-gray-100' : ''}`}
            onPress={() => { setCurrency(item.symbol) }}
        >
            <Text className='text-lg font-pregular'>{item.name}</Text>
            <Text className='text-lg font-pregular'>{item.symbol}</Text>
        </TouchableOpacity>
    );

    // Reset currency selection whenever modal opens
    useEffect(() => {
        if (isOpen) {
            setCurrency(user?.currency || '$');
        }
    }, [isOpen, user?.currency]);

    return (
        <Modal
            visible={isOpen}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text className='text-lg font-psemibold text-center pb-2 border-b border-gray-200'>Currency Preference</Text>
                    <FlatList
                        data={CURRENCIES.sort((a, b) => a.name < b.name ? -1 : 1)}
                        renderItem={renderCurrencyItem}
                        keyExtractor={(item) => item.name}
                        style={styles.yearList}
                    />
                    <View className="mt-4">
                        <View className='flex flex-row justify-between items-center gap-4'>
                            <Pressable onPress={onClose} className='border flex-1 border-slate-400 p-4 rounded-xl' >
                                <Text className='text-center text-lg font-psemibold'>Cancel</Text>
                            </Pressable>
                            <Pressable onPress={handleSave} className='border border-green flex-1 bg-green/50 p-4 rounded-xl' >
                                <Text className='text-center text-lg font-psemibold'>Save</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    modalContent: {
        height: 'auto',
        marginTop: 'auto',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    yearList: {
        flexGrow: 0,
    }
});

export default CurrencyPicker;