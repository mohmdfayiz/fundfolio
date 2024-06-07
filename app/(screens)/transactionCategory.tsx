import { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TabTitle from "@/components/TabTitle";
import CategoryModal from "@/components/CategoryModal";
import { CATEGORIES } from "@/constants/data";

export default function TransactionCategory() {

    const [show, setShow] = useState(false);

    return (
        <SafeAreaView>
            <View className="flex justify-between h-full p-4">
                <View>
                    <TabTitle title='Category' icon='♻️' subTitle='Manage Categories!' />
                </View>
                <ScrollView className='my-4' showsVerticalScrollIndicator={false}>
                    {CATEGORIES.map((category) => (
                        <View key={category.id} className='flex flex-row gap-2 items-center justify-between mb-2'>
                            <View style={{ backgroundColor: category.bgColor }} className={`h-14 w-14 items-center justify-center rounded-xl`}>
                                <Text className='text-2xl'>{category.icon}</Text>
                            </View>
                            <View className='flex-1'>
                                <Text className='text-base font-psemibold'>{category.name}</Text>
                                <Text className='text-base font-pregular'>12, 05, 2024</Text>
                            </View>
                            <View className='items-end py-4'>
                                <Text className='text-2xl'>🗑️</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
                <View>
                    <Pressable
                        className="border border-green bg-green/50 p-4 rounded-xl"
                        onPress={() => setShow(true)}
                    >
                        <Text className="text-base font-psemibold text-center">Add Category</Text>
                    </Pressable>
                </View>
            </View>

            <CategoryModal isOpen={show} onClose={() => setShow(false)} />
        </SafeAreaView>
    );
}