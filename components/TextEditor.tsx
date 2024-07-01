import { useState, useEffect } from 'react'
import { View, Text, Modal, TextInput, Pressable } from 'react-native'
import Toast from 'react-native-toast-message';
import dateFormat from 'dateformat'
import { deleteNote } from '@/services/note'

type Note = {
    _id?: string;
    title: string;
    content: string;
    pinned: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const TextEditor = ({ note, isOpen, onClose }: { note: Note, isOpen: boolean, onClose: (newNote: Note) => void }) => {

    const [tempNote, setTempNote] = useState(note)

    const handleUpdate = (item: string, value: string | boolean) => {
        setTempNote(prevNote => ({ ...prevNote, [item]: value, updatedAt: new Date() }))
    }

    const handleDelete = async (noteId: string | undefined) => {
        if (!noteId) return
        await deleteNote(noteId)
        onClose({ ...tempNote, title: '', content: '' })
    }

    useEffect(() => {
        setTempNote(note)
    }, [note])

    return (
        <Modal
            visible={isOpen}
            onRequestClose={() => onClose(tempNote)}
            animationType="slide"
            presentationStyle="pageSheet"
        >
            <View className='p-4'>
                <Text className='text-2xl font-pbold'>Add Note</Text>
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
                    value={tempNote.title}
                    onChangeText={(text) => handleUpdate('title', text)}
                />
                <TextInput
                    placeholder='Note'
                    multiline
                    maxLength={500}
                    numberOfLines={30}
                    cursorColor={'black'}
                    style={{ textAlignVertical: 'top' }}
                    className='font-pregular text-base'
                    value={tempNote.content}
                    onChangeText={(text) => handleUpdate('content', text)}
                />
            </View>
            <View className='flex flex-row items-center border-t border-slate-200 p-4'>
                <Text>Edited {dateFormat(tempNote.updatedAt, "h:MM tt, mmm dd")}</Text>
                <Pressable className={`ml-auto ${tempNote.pinned && 'opacity-50'}`} onPress={() => handleUpdate('pinned', !tempNote.pinned)}>
                    <Text className='text-center font-psemibold text-base'>📌</Text>
                </Pressable>
                <Pressable className='ml-6' onPress={() => handleDelete(tempNote?._id)}>
                    <Text className='text-center font-psemibold text-base'>🗑️</Text>
                </Pressable>
            </View>
        </Modal>
    )
}

export default TextEditor