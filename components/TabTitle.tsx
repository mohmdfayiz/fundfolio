import { View, Text } from 'react-native'

type TabTitleProps = {
    title: string
    icon: string
    subTitle: string
}

const TabTitle = ({title, icon, subTitle}: TabTitleProps) => {
    return (
        <View>
            <Text className='text-2xl font-pbold'>{title} {icon}</Text>
            <Text className='font-pregular text-sm'>{subTitle}</Text>
        </View>
    )
}

export default TabTitle