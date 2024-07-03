import { useEffect, useState } from 'react'
import { View, Text, FlatList, Pressable, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useIsFocused } from '@react-navigation/native'

import NoteTile from '@/components/Note'
import TabTitle from '@/components/TabTitle'
import TextEditor from '@/components/TextEditor'
import images from '@/constants/images'
import { getNotes, addNote, updateNote, deleteNote } from '@/services/note'
import { Note } from '@/types'

const NotesScreen = () => {

    const [notes, setNotes] = useState<Note[]>([])
    const [note, setNote] = useState<Note>({ title: '', content: '', pinned: false, createdAt: new Date(), updatedAt: new Date() })
    const [showEditor, setShowEditor] = useState(false)
    const [mode, setMode] = useState('add') // add or edit or delete

    const isFocused = useIsFocused()

    const fetchNotes = async () => {
        const { data } = await getNotes()
        setNotes(data)
    }

    const handleEditorOpen = (mode: string, note: Note) => {
        setNote(note)
        setMode(mode)
        setShowEditor(true)
    }

    const handleEditorClose = async (mode: string, newNote: Note) => {
        if (mode === 'add' && newNote?.title && newNote?.content) {
            await addNote(newNote)
            await fetchNotes()
        } else if (mode === 'edit' && newNote.title && newNote.content && (newNote.title !== note.title || newNote.content !== note.content || newNote.pinned !== note.pinned)) {
            await updateNote(newNote)
            await fetchNotes()
        } else if (mode === 'delete' && newNote?._id) {
            await deleteNote(newNote?._id)
            setNotes(notes.filter(note => note._id !== newNote?._id))
        }
        setNote({ title: '', content: '', pinned: false, createdAt: new Date(), updatedAt: new Date() })
        setShowEditor(false)
    }

    useEffect(() => {
        isFocused && fetchNotes()
    }, [isFocused])

    return (
        <SafeAreaView>
            <View className='flex h-full'>
                <View className='p-4'>
                    <TabTitle title='Notes' icon='🗒️' subTitle='Take Notes!' />
                </View>

                <View className='flex-1 px-4'>
                    {
                        notes.length ?
                            <FlatList
                                data={notes}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => handleEditorOpen('edit', item)}>
                                        <NoteTile {...item} />
                                    </TouchableOpacity>
                                )}
                            /> :
                            <View className='flex flex-1 items-center justify-center'>
                                <Image source={images.noData} className='w-40 h-40' />
                            </View>
                    }
                </View>
                <Pressable
                    onPress={() => handleEditorOpen('add', note)}
                    className='absolute bottom-4 right-4 p-4 rounded-xl border border-slate-400 bg-black/30'
                >
                    <Text>➕</Text>
                </Pressable>
            </View>
            <TextEditor note={note} isOpen={showEditor} mode={mode} onClose={(note: Note, mode: string) => handleEditorClose(mode, note)} />
        </SafeAreaView>
    )
}

export default NotesScreen