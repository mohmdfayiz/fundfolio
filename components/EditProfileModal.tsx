import { useState } from "react";
import { Modal, View, Pressable, Text, StyleSheet, Image, TextInput } from "react-native";

import { useGlobalContext } from "@/context/GlobalContext";
import { man, woman } from '@/constants/images';
import { updateUser } from "@/services/user";

const EditProfileModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {

    const { user, setUser } = useGlobalContext();
    const [tempUser, setTempUser] = useState(user);

    const style = (selected: boolean) => (
        selected ?
            { width: 100, height: 100, borderRadius: 100, borderColor: 'black', borderWidth: 2 } :
            { width: 100, height: 100, borderRadius: 100, borderColor: 'black' }
    )

    const handleProfilePic = (profilePic: string) => {
        tempUser && setTempUser({ ...tempUser, profilePic });
    }

    const handleSave = async () => {
        if (!user) return;
        setUser({ ...user, ...tempUser });
        await updateUser({ username: tempUser?.username, profilePic: tempUser?.profilePic });
        onClose();
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
                    <View className="flex flex-row gap-x-4 justify-center items-center">
                        <Pressable onPress={() => handleProfilePic('man')}>
                            <Image source={man} style={style(tempUser?.profilePic === 'man')} />
                        </Pressable>
                        <Pressable onPress={() => handleProfilePic('woman')}>
                            <Image source={woman} style={style(tempUser?.profilePic === 'woman')} />
                        </Pressable>
                    </View>
                    <View>
                        <TextInput
                            maxLength={20}
                            placeholder="Username"
                            value={tempUser?.username}
                            className="border border-slate-400 p-4 rounded-xl font-pregular text-lg text-black"
                            placeholderTextColor={'gray'}
                            onChangeText={(username) => tempUser && setTempUser({ ...tempUser, username })}
                        />
                    </View>
                    <View className="bg-white">
                        <View className='flex flex-row justify-between items-center gap-4'>
                            <Pressable onPress={onClose} className='border flex-1 border-slate-400 p-4 rounded-xl' >
                                <Text className='text-center text-lg font-psemibold'>Cancel</Text>
                            </Pressable>
                            <Pressable onPress={handleSave} className='border border-green flex-1 bg-green/50 p-4 rounded-xl' >
                                <Text className='text-center text-lg font-psemibold'>Save</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default EditProfileModal;

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
});