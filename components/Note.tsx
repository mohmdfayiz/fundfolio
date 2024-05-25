import { View, Text } from 'react-native'

type Note = {
    id: number;
    type: string;
    title: string;
    date: string;
    todos?: {
        id: number;
        todo: string;
        isCompleted: boolean;
    }[];
    bgColour?: string;
    note?: string;
}

const Note = ({ title, date, type, bgColour }: Note) => {
    return (
        <View className={`p-4 border border-slate-400 mb-3 rounded-xl ${bgColour}`}>
            <Text className='text-sm font-psemibold'>{title}</Text>
            <View className='flex flex-row justify-between mt-2'>
                <Text className='text-xs font-pregular text-gray-500'>{date}</Text>
                <Text className='text-xs font-pregular text-gray-500'>{type === 'todo' ? '✔️' : '📝'}</Text>
            </View>
        </View>
    )
}

export default Note