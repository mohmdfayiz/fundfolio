import { View, Text, Modal, Pressable, ScrollView } from 'react-native'
import { TransactionSummary } from '@/types'

const SummaryModal = ({
    summary,
    isOpen,
    onClose,
}: {
    summary: TransactionSummary | null
    isOpen: boolean
    onClose: (save?: boolean) => void
}) => {
    const hasContent = Boolean(summary?.overview)

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
                    contentContainerStyle={{ paddingBottom: 24 }}
                >
                    {!hasContent ? (
                        Array.from({ length: 4 }).map((_, index) => (
                            <View
                                key={index}
                                className={`h-2 bg-slate-500 rounded-full animate-pulse mb-1 ${index === 3 ? 'w-3/4' : 'w-full'}`}
                            />
                        ))
                    ) : (
                        <View className='gap-5'>
                            <View className='gap-2'>
                                <Text className='text-base font-psemibold text-slate-500'>Overview</Text>
                                <Text className='text-lg font-pregular text-black'>{summary!.overview}</Text>
                            </View>

                            {summary!.highlights?.length > 0 && (
                                <View className='gap-2'>
                                    <Text className='text-base font-psemibold text-slate-500'>Highlights</Text>
                                    {summary!.highlights.map((item, index) => (
                                        <Text key={`highlight-${index}`} className='text-lg font-pregular text-black'>
                                            • {item}
                                        </Text>
                                    ))}
                                </View>
                            )}

                            {!!summary!.comparison && (
                                <View className='gap-2'>
                                    <Text className='text-base font-psemibold text-slate-500'>Compared to last month</Text>
                                    <Text className='text-lg font-pregular text-black'>{summary!.comparison}</Text>
                                </View>
                            )}

                            {summary!.watchouts?.length > 0 && (
                                <View className='gap-2'>
                                    <Text className='text-base font-psemibold text-slate-500'>Worth watching</Text>
                                    {summary!.watchouts.map((item, index) => (
                                        <Text key={`watchout-${index}`} className='text-lg font-pregular text-black'>
                                            • {item}
                                        </Text>
                                    ))}
                                </View>
                            )}
                        </View>
                    )}
                </ScrollView>
                <View className="bg-white p-4 pt-2">
                    <View className='flex flex-row justify-between items-center gap-4'>
                        <Pressable onPress={() => onClose()} className='border flex-1 border-slate-400 p-4 rounded-xl'>
                            <Text className='text-center text-lg font-psemibold'>Close</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => onClose(true)}
                            disabled={!hasContent}
                            className='border border-green flex-1 bg-green/50 p-4 rounded-xl'
                        >
                            <Text className='text-center text-lg font-psemibold'>Save to Notes</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export function flattenSummaryForNotes(summary: TransactionSummary): string {
    const sections: string[] = [`Overview\n${summary.overview}`]

    if (summary.highlights?.length) {
        sections.push(`Highlights\n${summary.highlights.map((item) => `• ${item}`).join('\n')}`)
    }

    if (summary.comparison) {
        sections.push(`Compared to last month\n${summary.comparison}`)
    }

    if (summary.watchouts?.length) {
        sections.push(`Worth watching\n${summary.watchouts.map((item) => `• ${item}`).join('\n')}`)
    }

    return sections.join('\n\n')
}

export default SummaryModal
