import { Stack } from "expo-router";

const ScreenLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="transaction-statistics"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="transaction-category"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="privacypolicy"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  )
}

export default ScreenLayout