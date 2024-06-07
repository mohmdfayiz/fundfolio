import { Stack } from "expo-router";

const ScreenLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="transactionStatistics"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="transactionCategory"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  )
}

export default ScreenLayout