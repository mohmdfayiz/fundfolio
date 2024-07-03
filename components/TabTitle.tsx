import { View, Text } from 'react-native';
import { TabTitleProps } from '@/types';

const TabTitle = ({title, icon, subTitle}: TabTitleProps) => {
    return (
        <View>
            <Text className='text-2xl font-pbold'>{title} {icon}</Text>
            <Text className='font-pregular text-sm'>{subTitle}</Text>
        </View>
    )
}

export default TabTitle