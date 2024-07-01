import { useEffect, useState } from 'react'
import { View, Text, FlatList, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useIsFocused } from '@react-navigation/native'
import NoteTile from '@/components/Note'
import TabTitle from '@/components/TabTitle'
import TextEditor from '@/components/TextEditor'
import { getNotes, addNote, updateNote } from '@/services/note'

type Note = {
    _id?: string;
    title: string;
    content: string;
    pinned: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const NotesScreen = () => {

    const [notes, setNotes] = useState<Note[]>([])
    const [note, setNote] = useState<Note>({ title: '', content: '', pinned: false, createdAt: new Date(), updatedAt: new Date() })
    const [showEditor, setShowEditor] = useState(false)
    const [mode, setMode] = useState('add') // add or edit

    const isFocused = useIsFocused()

    const fetchNotes = async () => {
        const { data } = await getNotes()
        setNotes(data)
    }

    const saveNote = async (note: Note) => {
        await addNote(note)
        setShowEditor(false)
    }

    const editNote = async (note: Note) => {
        await updateNote(note)
        setShowEditor(false)
    }

    const handleEditorOpen = (mode: string, note: Note) => {
        setNote(note)
        setMode(mode)
        setShowEditor(true)
    }

    const handleEditorClose = async (mode: string, newNote: Note) => {
        if (mode === 'add' && newNote?.title && newNote?.content) {
            await saveNote(newNote)
        } else if (mode === 'edit' && newNote.title && newNote.content && (newNote.title !== note.title || newNote.content !== note.content || newNote.pinned !== note.pinned)) {
            await editNote(newNote)
        }
        await fetchNotes()
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
                    <FlatList
                        data={notes}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => handleEditorOpen('edit', item)}>
                                <NoteTile {...item} />
                            </Pressable>
                        )}
                    />
                </View>
                <Pressable
                    onPress={() => handleEditorOpen('add', note)}
                    className='absolute bottom-4 right-4 p-4 rounded-xl border border-slate-400 bg-black/30'
                >
                    <Text>➕</Text>
                </Pressable>
            </View>
            <TextEditor note={note} isOpen={showEditor} onClose={(note: Note) => handleEditorClose(mode, note)} />
        </SafeAreaView>
    )
}

export default NotesScreen