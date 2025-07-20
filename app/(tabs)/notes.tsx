import { useEffect, useState } from 'react'
import { View, Text, FlatList, Pressable, TouchableOpacity, Image } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useIsFocused } from '@react-navigation/native'
import * as Haptics from 'expo-haptics';

import NoteTile from '@/components/Note'
import TabTitle from '@/components/TabTitle'
import TextEditor from '@/components/TextEditor'
import { noData } from '@/constants/images'
import { getNotes, addNote, updateNote, deleteNote } from '@/services/note'
import { Note } from '@/types'
import Toast from 'react-native-toast-message';

const NotesScreen = () => {

    const [notes, setNotes] = useState<Note[]>([])
    const [note, setNote] = useState<Note>({ title: '', content: '', pinned: false, createdAt: new Date(), updatedAt: new Date() })
    const [showEditor, setShowEditor] = useState(false)
    const [mode, setMode] = useState('add') // add or edit or delete
    const [multipleSelection, setMultipleSelection] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const isFocused = useIsFocused();
    const insets = useSafeAreaInsets();

    const fetchNotes = async () => {
        const { data } = await getNotes()
        setNotes(data)
    }

    const enableMultipleSelection = (id: string) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        setMultipleSelection(true);
        setSelectedItems([...selectedItems, id]);
    };

    const handleClick = (mode: string, note: Note) => {
        if (multipleSelection && !selectedItems.includes(note._id!)) {
            setSelectedItems([...selectedItems, note._id!])
        } else if (selectedItems.length > 1 && selectedItems.includes(note._id!)) {
            setSelectedItems(selectedItems.filter(item => item !== note._id))
        } else if (selectedItems.length === 1 && selectedItems.includes(note._id!)) {
            setMultipleSelection(false);
            setSelectedItems([]);
        } else {
            setNote(note)
            setMode(mode)
            setShowEditor(true)
        }
    }

    const handleDeleteNotes = async () => {
        try {
            await deleteNote(selectedItems)

            Toast.show({
                type: 'success',
                text1: 'Notes deleted successfully.',
            })

            await fetchNotes()
            setMultipleSelection(false);
            setSelectedItems([]);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Oops! Could not delete notes. Please try again.',
            })
        }
    }

    const handleEditorClose = async (mode: string, newNote: Note) => {
        if (mode === 'add' && newNote?.title && newNote?.content) {
            await addNote(newNote)
            await fetchNotes()
        } else if (mode === 'edit' && newNote.title && newNote.content && (newNote.title !== note.title || newNote.content !== note.content || newNote.pinned !== note.pinned)) {
            await updateNote(newNote)
            await fetchNotes()
        } else if (mode === 'delete' && newNote?._id) {
            await deleteNote([newNote?._id])
            setNotes(notes.filter(note => note._id !== newNote?._id))
        }
        setNote({ title: '', content: '', pinned: false, createdAt: new Date(), updatedAt: new Date() })
        setShowEditor(false)
    }

    useEffect(() => {
        isFocused && fetchNotes()
        setMultipleSelection(false);
        setSelectedItems([]);
    }, [isFocused])

    return (
        <View className='bg-gray-50' style={{ paddingTop: insets.top }}>
            <View className='flex h-full'>
                <View className='p-4'>
                    <TabTitle title='Notes' icon='🗒️' subTitle='Take Notes!' />
                </View>

                <View className='flex-1 px-4'>
                    <FlatList
                        data={notes}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => handleClick('edit', item)}
                                onLongPress={() => enableMultipleSelection(item?._id!)}
                            >
                                <NoteTile note={item} selected={selectedItems.includes(item?._id!)} />
                            </TouchableOpacity>
                        )}
                        ListFooterComponent={() => (notes.length > 0 && <View className='h-16' />)}
                        contentContainerStyle={{ flexGrow: 1 }}
                        ListEmptyComponent={
                            <View className='flex-1 items-center justify-center'>
                                <Image source={noData} className='w-40 h-40' />
                            </View>
                        }
                    />
                </View>
                {
                    multipleSelection ?
                        <Pressable
                            onPress={handleDeleteNotes}
                            className='absolute bottom-4 right-4 p-4 rounded-xl border border-slate-400 bg-black/60'
                        >
                            <Text>🗑️</Text>
                        </Pressable> :
                        <Pressable
                            onPress={() => handleClick('add', note)}
                            className='absolute bottom-4 right-4 p-4 rounded-xl border border-slate-400 bg-black/30'
                        >
                            <Text>➕</Text>
                        </Pressable>
                }
            </View>
            <TextEditor note={note} isOpen={showEditor} mode={mode} onClose={(note: Note, mode: string) => handleEditorClose(mode, note)} />
        </View>
    )
}

export default NotesScreen