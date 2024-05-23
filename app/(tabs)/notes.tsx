import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const NotesScreen = () => {
    return (
        <SafeAreaView>
            <View className='flex flex-col gap-4 p-4'>
                <View>
                    <Text className='text-2xl font-pbold'>Take Notes 📝</Text>
                    <Text className='font-pregular text-sm'>Organize your life!</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default NotesScreen