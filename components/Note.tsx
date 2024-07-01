import { View, Text } from 'react-native'
import dateFormat from 'dateformat'

type Note = {
    _id?: string;
    title: string;
    content: string;
    pinned: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const Note = ({ title, pinned, createdAt }: Note) => {
    return (
        <View className={`p-4 border border-slate-400 mb-3 rounded-xl`}>
            <Text className='text-sm font-psemibold'>{title}</Text>
            <View className='flex flex-row justify-between mt-2'>
                <Text className='text-xs font-pregular text-gray-500'>{dateFormat(createdAt, "dddd, dd mmm yyyy")}</Text>
                {pinned && <Text className='text-xs font-pregular text-gray-500'>📌</Text>}
            </View>
        </View>
    )
}

export default Note