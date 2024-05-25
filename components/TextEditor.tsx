import { View, Text, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native'

const TextEditor = ({ type, isOpen, onClose, }: { type: string, isOpen: boolean, onClose: () => void }) => {

    return (
        <Modal
            visible={isOpen}
            onRequestClose={onClose}
            animationType="slide"
            presentationStyle="pageSheet"
        >
            <View className='p-4'>
                <Text className='text-2xl font-pbold'>Add {type}</Text>
            </View>
            <View className='flex-1 p-4'>
                <TextInput
                    placeholder='Title'
                    multiline
                    maxLength={60}
                    numberOfLines={3}
                    cursorColor={'black'}
                    style={{ textAlignVertical: 'top' }}
                    className='font-psemibold text-lg'
                />
                <TextInput
                    placeholder='Note'
                    multiline
                    maxLength={500}
                    numberOfLines={30}
                    cursorColor={'black'}
                    style={{ textAlignVertical: 'top' }}
                    className='font-pregular text-base'
                />
            </View>
        </Modal>
    )
}

export default TextEditor