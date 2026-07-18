import { Modal, View, Text, Pressable } from 'react-native'
import { router } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SAMPLE_CATEGORIES } from '@/constants/data'

type CategorySetupSheetProps = {
  isOpen: boolean
  onDismiss: () => void
}

export default function CategorySetupSheet({ isOpen, onDismiss }: CategorySetupSheetProps) {
  const insets = useSafeAreaInsets()
  const topRow = SAMPLE_CATEGORIES.slice(0, 3)

  const handleAddCategories = () => {
    onDismiss()
    router.push('/transactioncategory')
  }

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="slide"
      onRequestClose={onDismiss}
    >
      <View className="flex-1 justify-end bg-black/20">
        <Pressable className="flex-1" onPress={onDismiss} />
        <View
          className="bg-white rounded-t-3xl px-5 pt-3"
          style={{ paddingBottom: Math.max(insets.bottom, 20) }}
        >
          <Text className="text-2xl font-pbold text-black text-center mt-2 mb-2">
            Add Categories
          </Text>
          <Text className="text-base font-pregular text-slate-500 text-center mb-6 px-2">
            Create your own categories — organize income and expenses your way.
          </Text>

          <View className="items-center gap-3 mb-8">
            <View className="flex-row justify-center gap-3">
              {topRow.map((category) => (
                <View key={category.name} className="items-center" style={{ width: 88 }}>
                  <View
                    style={{ backgroundColor: category.bgColour }}
                    className="h-16 w-16 items-center justify-center rounded-2xl mb-2"
                  >
                    <Text className="text-3xl">{category.icon}</Text>
                  </View>
                  <Text className="text-sm font-pregular text-slate-600 text-center" numberOfLines={1}>
                    {category.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View className="flex-row items-center gap-3">
            <Pressable
              onPress={onDismiss}
              className="flex-1 border border-slate-400 p-4 rounded-xl"
            >
              <Text className="text-center text-lg font-psemibold text-black">
                Maybe later
              </Text>
            </Pressable>
            <Pressable
              onPress={handleAddCategories}
              className="flex-[1.15] border border-green bg-green/50 p-4 rounded-xl"
            >
              <Text className="text-center text-lg font-psemibold text-black">
                Add categories
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}
