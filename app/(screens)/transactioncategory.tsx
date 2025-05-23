import { useEffect, useState } from "react";
import { View, Text, Image, Pressable, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import dateFormat from "dateformat";
import Toast from "react-native-toast-message";

import TabTitle from "@/components/TabTitle";
import CategoryModal from "@/components/CategoryModal";

import icons from "@/constants/icons";
import { noData } from "@/constants/images";
import { SAMPLE_CATEGORIES } from "@/constants/data";
import { getRandomInt } from "@/utils/helpers";
import { Category } from "@/types";
import {
    addTransactionCategory,
    getTransactionCategories,
    deleteTransactionCategory,
    updateTransactionCategory
} from "@/services/transaction";

export default function TransactionCategory() {

    const [show, setShow] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [mode, setMode] = useState<'add' | 'edit'>('add');
    const [category, setCategory] = useState<Category>(SAMPLE_CATEGORIES[getRandomInt(SAMPLE_CATEGORIES.length)]);

    const getCategories = async () => {
        const { data }: { data: Category[] } = await getTransactionCategories();
        setCategories(data);
    }

    const addCategory = async (category: Category) => {
        try {
            await addTransactionCategory(category);
            getCategories();
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Category could not be added',
                text2: 'Category with the same name already exists',
            })
        } finally {
            setShow(false);
        }
    }

    const updateCategory = async (category: Category) => {
        try {
            const { data }: { data: Category } = await updateTransactionCategory(category);
            setCategories(categories.map((item) => item._id === category._id ? data : item))
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Category could not be updated',
            })
        } finally {
            setShow(false);
        }
    }

    const handleSave = () => {
        if (mode === 'add') {
            addCategory(category);
        } else {
            updateCategory(category);
        }
    }

    const deleteCategory = async (id: string | undefined) => {
        if (!id) return
        try {
            await deleteTransactionCategory(id)
            setCategories(categories.filter((category) => category._id !== id))
            Toast.show({
                type: 'success',
                text1: 'Category deleted successfully',
            })
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Category could not be deleted',
            })
        }
    }

    const handleModalOpen = (mode: 'add' | 'edit', selectedCategory?: Category) => {
        if (mode === 'edit' && selectedCategory) {
            setCategory(selectedCategory);
        } else {
            setCategory(SAMPLE_CATEGORIES[getRandomInt(SAMPLE_CATEGORIES.length)]);
        }
        setMode(mode);
        setShow(true);
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <SafeAreaView className='bg-gray-50'>
            <View className="flex h-full">
                <View className="p-4">
                    <TabTitle title='Category' icon='♻️' subTitle='Manage Categories!' />
                </View>
                {
                    categories?.length ?
                        <ScrollView className='px-4' showsVerticalScrollIndicator={false}>
                            {categories.map((category) => (
                                <CategoryCard
                                    key={category._id}
                                    category={category}
                                    handleModalOpen={handleModalOpen}
                                    deleteCategory={deleteCategory}
                                />
                            ))}
                        </ScrollView>
                        :
                        <View className='flex flex-1 items-center justify-center'>
                            <Image source={noData} className='w-40 h-40' />
                        </View>
                }
                <View className="p-4">
                    <Pressable
                        className="border border-green bg-green/50 p-4 rounded-xl"
                        onPress={() => handleModalOpen('add')}
                    >
                        <Text className="text-lg font-psemibold text-center">Add Category</Text>
                    </Pressable>
                </View>
            </View>

            {
                show &&
                <CategoryModal
                    mode={mode}
                    isOpen={show}
                    category={category}
                    onClose={() => setShow(false)}
                    setCategory={setCategory}
                    handleSave={handleSave}
                />
            }

        </SafeAreaView>
    );
}

function CategoryCard({ category, handleModalOpen, deleteCategory }: { category: Category, handleModalOpen: (mode: 'add' | 'edit', selectedCategory?: Category) => void, deleteCategory: (id: string | undefined) => void }) {
    return (
        <View key={category._id} className='flex flex-row items-center justify-between py-2'>
            <TouchableOpacity onPress={() => handleModalOpen('edit', category)} className="flex flex-row flex-1 items-center">
                <View style={{ backgroundColor: category.bgColour }} className={`h-16 w-16 items-center justify-center rounded-xl`}>
                    <Text className='text-3xl'>{category.icon}</Text>
                </View>
                <View className='ml-2'>
                    <Text className='text-lg font-psemibold'>{category.name}</Text>
                    <Text className='text-base font-pregular'>{'Added on: ' + dateFormat(category?.createdAt, "mediumDate")}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteCategory(category?._id)} className='py-2 pl-2'>
                <Image source={icons.trash} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
        </View>
    )
}