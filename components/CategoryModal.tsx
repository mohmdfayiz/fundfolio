import { Modal, View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import { TRANSACTION_CATEGORY_COLOR_MAP } from "@/constants/data";
import { Category } from "@/types";

type PropsType = {
    isOpen: boolean;
    mode: 'add' | 'edit';
    category: Category;
    setCategory: React.Dispatch<React.SetStateAction<Category>>;
    onClose: () => void;
    handleSave: () => void;
}

const CategoryModal = ({ isOpen, onClose, mode, category, setCategory, handleSave }: PropsType) => {

    const handleChange = (field: keyof Category, value: string) => {
        setCategory(prev => ({
            ...prev,
            [field]: value,
        }));
    };

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
                            autoFocus
                            maxLength={2}
                            value={category.icon}
                            onChangeText={(icon) => handleChange('icon', icon)}
                            style={[styles.common, styles.textInput, { backgroundColor: category.bgColour }]}
                        />
                    </View>
                    <View className="flex flex-row justify-center gap-x-4">
                        {
                            TRANSACTION_CATEGORY_COLOR_MAP.map((bgColour, index) => (
                                <Pressable
                                    key={index}
                                    onPress={() => handleChange('bgColour', bgColour)}
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
                        <TextInput
                            maxLength={25}
                            value={category.name}
                            placeholder={"Category Name"}
                            className="border border-slate-400 p-4 rounded-xl font-pregular text-lg"
                            onChangeText={(name) => handleChange('name', name)}
                        />
                    </View>
                    <View>
                        <View className='flex flex-row justify-between items-center gap-4'>
                            <Pressable onPress={onClose} className='border flex-1 border-slate-400 p-4 rounded-xl' >
                                <Text className='text-center text-lg font-psemibold'>Cancel</Text>
                            </Pressable>
                            <Pressable onPress={handleSave} className='border border-green flex-1 bg-green/50 p-4 rounded-xl' >
                                <Text className='text-center text-lg font-psemibold'>{mode === 'edit' ? 'Save' : 'Add'}</Text>
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