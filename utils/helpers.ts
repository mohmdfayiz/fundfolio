import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from 'expo-local-authentication';
import { APP_LOCK_ENUM } from "@/constants/data";
import Toast from "react-native-toast-message";

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

async function getAppLockPreference() {
    const appLockPreference = await AsyncStorage.getItem('useAppLock')
    return Boolean(appLockPreference)
}

async function setAppLockPreference(useAppLock: boolean) {
    useAppLock ?
        await AsyncStorage.setItem('useAppLock', 'true')
        : await AsyncStorage.removeItem('useAppLock')
}

const authenticateAppLock = async (showErrorToast = false) => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
        showErrorToast && Toast.show({
            type: 'error',
            text1: 'App Lock is not available on this device.',
        })
        return APP_LOCK_ENUM.NOT_AVAILABLE;
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
        showErrorToast && Toast.show({
            type: 'error',
            text1: "App Lock hasn't been enrolled on this device.",
            text2: 'Please set up biometric authentication on your device.',
        })
        return APP_LOCK_ENUM.NOT_ENROLLED;
    }

    const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authentication required.',
        fallbackLabel: 'Use passcode',
    });

    return result.success ? APP_LOCK_ENUM.AUTHENTICATED : APP_LOCK_ENUM.NOT_AUTHENTICATED;
};

export { getRandomInt, authenticateAppLock, getAppLockPreference, setAppLockPreference }