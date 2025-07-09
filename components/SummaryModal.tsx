import { View, Text, Modal, Pressable, ScrollView, TouchableOpacity } from 'react-native'

const SummaryModal = ({ summary, isOpen, onClose }: { summary: string, isOpen: boolean, onClose: (save?: boolean) => void }) => {

    return (
        <Modal
            visible={isOpen}
            onRequestClose={() => onClose()}
            animationType="slide"
            transparent
        >
            <View className='flex-1 bg-white'>
                <View className='p-4 flex flex-row items-center justify-between'>
                    <Text className='text-2xl font-pbold'>{'Summary ✨'}</Text>
                </View>
                <ScrollView
                    className='flex-1 p-4'
                    showsVerticalScrollIndicator={true}
                >
                    {
                        summary ? (
                            <Text className='text-lg font-pregular'>{summary}</Text>
                        ) : (
                            Array.from({ length: 4 }).map((_, index) => (
                                <View key={index} className={`h-2 bg-slate-500 rounded-full animate-pulse mb-1 ${index === 3 ? 'w-3/4' : 'w-full'}`} />
                            ))
                        )
                    }
                </ScrollView>
                {/* Action Buttons */}
                <View className="bg-white p-4 pt-2">
                    <View className='flex flex-row justify-between items-center gap-4'>
                        <Pressable onPress={() => onClose()} className='border flex-1 border-slate-400 p-4 rounded-xl' >
                            <Text className='text-center text-lg font-psemibold'>Close</Text>
                        </Pressable>
                        <Pressable onPress={() => onClose(true)} className='border border-green flex-1 bg-green/50 p-4 rounded-xl' >
                            <Text className='text-center text-lg font-psemibold'>Save to Notes</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default SummaryModal