import { useState } from "react";
import { Modal, View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import { TRANSACTION_CATEGORY_COLOR_MAP, SAMPLE_CATEGORY_LABELS } from "@/constants/data";

const CategoryModal = ({ isOpen, onClose, addCategory }: { isOpen: boolean, onClose: () => void, addCategory: ({ name, bgColour, icon }: { name: string, bgColour: string, icon: string }) => void }) => {

    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    const [category, setCategory] = useState({
        name: "",
        bgColour: TRANSACTION_CATEGORY_COLOR_MAP[getRandomInt(TRANSACTION_CATEGORY_COLOR_MAP.length)],
        icon: SAMPLE_CATEGORY_LABELS[getRandomInt(SAMPLE_CATEGORY_LABELS.length)],
    })

    const handleClorPick = (color: string) => {
        setCategory(prev => ({
            ...prev,
            bgColour: color
        }))
    }

    const handleIconPick = (icon: string) => {
        setCategory(prev => ({
            ...prev,
            icon: icon
        }))
    }

    return (
        <Modal
            visible={isOpen}
            onRequestClose={onClose}
            animationType="slide"
            transparent={true}
        >
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' }}>
                <View style={styles.container}>
                    <View className="flex items-center">
                        <TextInput
                            value={category.icon}
                            maxLength={2}
                            onChangeText={(icon) => handleIconPick(icon)}
                            style={[styles.common, styles.textInput, { backgroundColor: category.bgColour }]}
                        />
                    </View>
                    <View className="flex flex-row justify-center gap-x-4">
                        {
                            TRANSACTION_CATEGORY_COLOR_MAP.map((bgColour, index) => (
                                <Pressable
                                    key={index}
                                    onPress={() => handleClorPick(bgColour)}
                                    style={[
                                        styles.colorPicker,
                                        styles.common,
                                        { backgroundColor: bgColour },
                                        category.bgColour === bgColour && { borderColor: '#94a3b8', borderWidth: 2 }
                                    ]}
                                />
                            ))
                        }
                    </View>
                    <View>
                        <TextInput onChangeText={(name) => setCategory(prev => ({ ...prev, name }))} className="border border-slate-400 p-4 rounded-xl font-pregular text-base" placeholder="Category Name" maxLength={25} />
                    </View>
                    <View>
                        <View className='flex flex-row justify-between items-center gap-4'>
                            <Pressable onPress={onClose} className='border flex-1 border-slate-400 p-4 rounded-xl' >
                                <Text className='text-center text-base font-psemibold'>Cancel</Text>
                            </Pressable>
                            <Pressable onPress={() => addCategory(category)} className='border border-green flex-1 bg-green/50 p-4 rounded-xl' >
                                <Text className='text-center text-base font-psemibold'>Add</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>

        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 'auto',
        marginTop: 'auto',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        gap: 20
    },
    common: {
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#cbd5e1',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    textInput: {
        height: 80,
        width: 80,
        fontSize: 28,
    },
    colorPicker: {
        height: 48,
        width: 48,
    },
});

export default CategoryModal;