import { Modal, View, Pressable, Text, StyleSheet, Image } from "react-native";
import { router } from 'expo-router'
import { man, woman } from '@/constants/images';
import { User } from "@/types";
import { useEffect } from "react";

const SwitchAccount = ({
    isOpen,
    userId,
    accounts,
    onClose,
    handleSwitchAccount
}: {
    isOpen: boolean,
    userId: string,
    accounts: User[],
    onClose: () => void,
    handleSwitchAccount: (user: User) => void
}) => {

    const handleNavigation = () => {
        onClose();
        setTimeout(() => {
            router.navigate('/sign-in');
        }, 100);
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
                    {
                        accounts?.map((user) => (
                            <Pressable
                                key={user._id}
                                onPress={() => handleSwitchAccount(user)}
                                className="flex flex-row gap-x-4 justify-between items-center"
                            >
                                <View className='flex flex-row items-center justify-start'>
                                    <Image source={user?.profilePic === 'woman' ? woman : man} className='w-[60px] h-[60px] rounded-full' />
                                    <View className='ml-4'>
                                        <Text className='text-lg font-psemibold'>{user?.username}</Text>
                                        <Text className='font-pregular text-base truncate'>{user?.email}</Text>
                                    </View>
                                </View>
                                {
                                    userId == user._id && (
                                        <View >
                                            <Text>✅</Text>
                                        </View>
                                    )
                                }
                            </Pressable>
                        ))
                    }
                    <Pressable onPress={handleNavigation} className="flex flex-row gap-x-4 items-center">
                        <View className="w-[60px] h-[60px] rounded-full bg-slate-100 flex items-center justify-center">
                            <Text>➕</Text>
                        </View>
                        <Text className="text-lg font-psemibold">Add Account</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

export default SwitchAccount;

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