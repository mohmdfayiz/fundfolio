import { Stack } from "expo-router";

const ScreenLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="transactionstatistics"
        options={{
          title: 'Statistics',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="transactioncategory"
        options={{
          title: 'Categories',
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="spendinglimits"
        options={{
          title: 'Spending Limits',
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name="privacypolicy"
        options={{
          title: 'Privacy Policy',
          headerShown: false,
        }}
      />
    </Stack>
  )
}

export default ScreenLayout