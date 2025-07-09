import React from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { CURRENCIES } from '@/constants/data';

const CurrencyPicker = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const renderCurrencyItem = ({ item }: { item: { id: number, name: string, symbol: string } }) => (
        <TouchableOpacity
            className='p-2 border-b border-gray-200'
            onPress={() => {
                onClose();
            }}
        >
            <Text className='text-lg font-pregular text-center'>{item.symbol} {item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <Modal
            visible={isOpen}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text className='text-lg font-psemibold text-center pb-2 border-b border-gray-200'>Select Currency</Text>
                    <FlatList
                        data={CURRENCIES}
                        renderItem={renderCurrencyItem}
                        keyExtractor={(item) => item.name}
                        style={styles.yearList}
                    />
                    <TouchableOpacity className='mt-2 p-2 bg-gray-200 rounded-md' onPress={onClose}>
                        <Text className='text-lg font-pregular text-center'>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        maxHeight: '50%',
    },
    yearList: {
        flexGrow: 0,
    }
});

export default CurrencyPicker;