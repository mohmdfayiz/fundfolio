import { useState } from 'react'
import { View, TextInput, Pressable, TextInputProps } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

type PasswordInputProps = Omit<TextInputProps, 'secureTextEntry'> & {
  value?: string
  onChangeText?: (text: string) => void
}

export default function PasswordInput({
  value,
  onChangeText,
  placeholder = 'Password',
  className,
  ...rest
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false)

  return (
    <View className='w-full relative'>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor='gray'
        secureTextEntry={!visible}
        autoCapitalize='none'
        autoCorrect={false}
        textContentType='password'
        className={
          className
          ?? 'w-full border border-slate-400 p-4 pr-14 rounded-xl font-pregular text-base text-black'
        }
        {...rest}
      />
      <Pressable
        onPress={() => setVisible((prev) => !prev)}
        hitSlop={10}
        accessibilityRole='button'
        accessibilityLabel={visible ? 'Hide password' : 'Show password'}
        className='absolute right-4 top-0 bottom-0 justify-center'
      >
        <Ionicons
          name={visible ? 'eye-outline' : 'eye-off-outline'}
          size={22}
          color='#94a3b8'
        />
      </Pressable>
    </View>
  )
}
