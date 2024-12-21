import { Redirect, Stack } from "expo-router";
import { useGlobalContext } from "@/context/GlobalContext";

export default function AppLayout() {

    const { isLogged } = useGlobalContext();
    if (isLogged) return <Redirect href="/home" />;

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(screens)" options={{ headerShown: false }} />
        </Stack>
    )
}