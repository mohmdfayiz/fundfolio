import { useState, useEffect } from 'react'
import { View, Text, Modal, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import dateFormat from 'dateformat'
import { Note } from '@/types'

const TextEditor = ({ note, isOpen, mode, onClose }: { note: Note, isOpen: boolean, mode: string, onClose: (newNote: Note, mode: string) => void }) => {

    const [tempNote, setTempNote] = useState(note)

    const handleUpdate = (item: string, value: string | boolean) => {
        setTempNote(prevNote => ({ ...prevNote, [item]: value, updatedAt: new Date() }))
    }

    const handleDelete = async (noteId: string | undefined) => {
        if (!noteId) return onClose(tempNote, '');
        onClose({ ...tempNote, title: '', content: '' }, 'delete')
    }

    useEffect(() => {
        setTempNote(note)
    }, [note])

    return (
        <Modal
            visible={isOpen}
            onRequestClose={() => onClose(tempNote, mode)}
            animationType="slide"
            transparent
        >
            <View className='flex-1 bg-white'>
                <View className='p-4'>
                    <Text className='text-2xl font-pbold'>{mode === 'edit' ? 'Note' : 'Add Note'}</Text>
                </View>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    className='flex-1'
                >
                    <ScrollView
                        className='flex-1 p-4'
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <TextInput
                            placeholder='Title'
                            multiline
                            maxLength={60}
                            numberOfLines={2}
                            cursorColor={'black'}
                            style={{ textAlignVertical: 'top' }}
                            className='font-psemibold text-xl'
                            value={tempNote.title}
                            onChangeText={(text) => handleUpdate('title', text)}
                        />
                        <TextInput
                            placeholder='Note'
                            multiline
                            maxLength={1000}
                            numberOfLines={30}
                            cursorColor={'black'}
                            style={{ textAlignVertical: 'top' }}
                            className='font-pregular text-lg'
                            value={tempNote.content}
                            onChangeText={(text) => handleUpdate('content', text)}
                        />
                    </ScrollView>
                </KeyboardAvoidingView>
                <View className='flex flex-row items-center border-t bg-white border-slate-200 px-4'>
                    <Text className='text-base font-pregular'>Edited {dateFormat(tempNote.updatedAt, "h:MM tt, mmm dd")}</Text>
                    <Pressable className={`ml-auto p-3 ${tempNote.pinned && 'opacity-50'}`} onPress={() => handleUpdate('pinned', !tempNote.pinned)}>
                        <Text className='text-center font-psemibold text-lg'>📌</Text>
                    </Pressable>
                    <Pressable className='ml-1 p-3' onPress={() => handleDelete(tempNote?._id)}>
                        <Text className='text-center font-psemibold text-lg'>🗑️</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

export default TextEditor