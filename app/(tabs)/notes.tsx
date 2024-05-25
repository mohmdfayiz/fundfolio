import { useState } from 'react'
import { View, Text, FlatList, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Note from '@/components/Note'
import TabTitle from '@/components/TabTitle'
import TextEditor from '@/components/TextEditor'
import { NOTES } from '@/constants/data'

const NotesScreen = () => {

    const [showEditor, setShowEditor] = useState(false)

    return (
        <SafeAreaView>
            <View className='flex flex-col gap-4 p-4'>
                <View>
                    <TabTitle title='Notes' icon='🗒️' subTitle='Take Notes!' />
                </View>

                <FlatList
                    data={NOTES}
                    className='h-[80vh]'
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Note {...item} />
                    )}
                />

                <Pressable
                    onPress={() => setShowEditor(true)}
                    className='absolute bottom-8 right-4 p-4 rounded-xl border border-slate-400 bg-black/30'
                >
                    <Text>➕</Text>
                </Pressable>
            </View>
            <TextEditor type={'Note'} isOpen={showEditor} onClose={() => setShowEditor(false)} />
        </SafeAreaView>
    )
}

export default NotesScreen