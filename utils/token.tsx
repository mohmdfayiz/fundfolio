import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async (name: string) => {
    try {
        const token = await AsyncStorage.getItem(name);
        return token;
    } catch (error) {
        console.error(`Error getting ${name} token:`, error);
        return null;
    }
};

export const setToken = async (name: string, token: string) => {
    try {
        await AsyncStorage.setItem(name, token);
    } catch (error) {
        console.error(`Error setting ${name} token:`, error);
    }
};

export const removeToken = async (name: string) => {
    try {
        await AsyncStorage.removeItem(name);
    } catch (error) {
        console.error(`Error removin ${name}g token:`, error);
    }
};
