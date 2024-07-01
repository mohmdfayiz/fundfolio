import { useEffect, useState } from "react";
import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import dateFormat from "dateformat";
import Toast from "react-native-toast-message";
import TabTitle from "@/components/TabTitle";
import CategoryModal from "@/components/CategoryModal";
import { addTransactionCategory, getTransactionCategories, deleteTransactionCategory } from "@/services/transaction";
import icons from "@/constants/icons";

type Category = {
    _id?: string;
    name: string;
    icon: string;
    bgColour: string;
    createdAt?: Date;
}

export default function TransactionCategory() {

    const [show, setShow] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

    const getCategories = async () => {
        const { data }: { data: Category[] } = await getTransactionCategories();
        setCategories(data);
    }

    const addCategory = async (category: Category) => {
        await addTransactionCategory(category).catch(err => console.log(err))
        getCategories();
        setShow(false);
    }

    const deleteCategory = async (id: string | undefined) => {
        if (!id) return
        try {
            await deleteTransactionCategory(id)
            getCategories();
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Category could not be deleted',
            })
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <SafeAreaView>
            <View className="flex justify-between h-full p-4">
                <View>
                    <TabTitle title='Category' icon='♻️' subTitle='Manage Categories!' />
                </View>
                <ScrollView className='my-4' showsVerticalScrollIndicator={false}>
                    {categories.map((category) => (
                        <View key={category._id} className='flex flex-row gap-2 items-center justify-between mb-3'>
                            <View style={{ backgroundColor: category.bgColour }} className={`h-14 w-14 items-center justify-center rounded-xl`}>
                                <Text className='text-2xl'>{category.icon}</Text>
                            </View>
                            <View className='flex-1'>
                                <Text className='text-base font-psemibold'>{category.name}</Text>
                                <Text className='text-base font-pregular'>{'Added on: ' + dateFormat(category?.createdAt, "mediumDate")}</Text>
                            </View>
                            <View className="flex flex-row">
                                {/* <Pressable className='items-end py-4'>
                                    <Text className='text-2xl'>📝</Text>
                                </Pressable> */}
                                <Pressable onPress={() => deleteCategory(category?._id)} className='items-end'>
                                    <Image source={icons.trash} style={{ width: 24, height: 24 }} />
                                </Pressable>
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

            <CategoryModal isOpen={show} onClose={() => setShow(false)} addCategory={addCategory} />
        </SafeAreaView>
    );
}