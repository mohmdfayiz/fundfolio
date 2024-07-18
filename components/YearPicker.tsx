import React from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const YearPicker = ({ isVisible, onClose, onSelectYear, years }: { isVisible: boolean, onClose: () => void, onSelectYear: (year: number) => void, years: number[] }) => {
  const renderYearItem = ({ item }: { item: number }) => (
    <TouchableOpacity
      className='p-2 border-b border-gray-200'
      onPress={() => {
        onSelectYear(item);
        onClose();
      }}
    >
      <Text className='text-base font-pregular text-center'>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text className='text-lg font-psemibold text-center pb-2 border-b border-gray-200'>Select Year</Text>
          <FlatList
            data={years}
            renderItem={renderYearItem}
            keyExtractor={(item) => item.toString()}
            style={styles.yearList}
          />
          <TouchableOpacity className='mt-2 p-2 bg-gray-200 rounded-md' onPress={onClose}>
            <Text className='text-base font-pregular text-center'>Close</Text>
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

export default YearPicker;