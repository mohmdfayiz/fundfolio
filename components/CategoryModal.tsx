import { useState } from "react";
import { Modal, View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import { TRANSACTION_CATEGORY_COLOR_MAP, SAMPLE_CATEGORY_LABELS } from "@/constants/data";

const CategoryModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {

    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    const [category, setCategory] = useState({
        name: "",
        bgColor: TRANSACTION_CATEGORY_COLOR_MAP[getRandomInt(TRANSACTION_CATEGORY_COLOR_MAP.length)],
        label: SAMPLE_CATEGORY_LABELS[getRandomInt(SAMPLE_CATEGORY_LABELS.length)],
    })

    const handleClorPick = (color: string) => {
        setCategory(prev => ({
            ...prev,
            bgColor: color
        }))
    }

    const handleIconPick = (label: string) => {
        setCategory(prev => ({
            ...prev,
            label: label
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
                            value={category.label}
                            maxLength={2}
                            onChangeText={(label) => handleIconPick(label)}
                            style={[styles.common, styles.textInput, { backgroundColor: category.bgColor }]}
                        />
                    </View>
                    <View className="flex flex-row justify-center gap-x-4">
                        {
                            TRANSACTION_CATEGORY_COLOR_MAP.map((bgColor, index) => (
                                <Pressable
                                    key={index}
                                    onPress={() => handleClorPick(bgColor)}
                                    style={[
                                        styles.colorPicker,
                                        styles.common,
                                        { backgroundColor: bgColor },
                                        category.bgColor === bgColor && { borderColor: '#94a3b8', borderWidth: 2 }
                                    ]}
                                />
                            ))
                        }
                    </View>
                    <View>
                        <TextInput className="border border-slate-400 p-4 rounded-xl font-pregular text-base" placeholder="Category Name" maxLength={25} />
                    </View>
                    <View>
                        <View className='flex flex-row justify-between items-center gap-4'>
                            <Pressable onPress={onClose} className='border flex-1 border-slate-400 p-4 rounded-xl' >
                                <Text className='text-center text-base font-psemibold'>Cancel</Text>
                            </Pressable>
                            <Pressable className='border border-green flex-1 bg-green/50 p-4 rounded-xl' >
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