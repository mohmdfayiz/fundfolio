import { Pressable, Text } from 'react-native';
const RadioButton = ({ name, value, setValue }: { name: string, value: string, setValue: (value: string) => void }) => {
    return (
        <Pressable
            onPress={() => setValue(name)}
            className={`border p-4 rounded-xl ${value === name ? 'bg-green/50 border-green' : 'bg-transparent  border-slate-400'} `}
        >
            <Text className='text-lg font-pregular'>{name}</Text>
        </Pressable>
    )
}

export default RadioButton;