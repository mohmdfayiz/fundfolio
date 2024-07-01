import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs } from 'expo-router';
import { useGlobalContext } from '@/context/GlobalContext';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {

  const { isLogged } = useGlobalContext();
  if (!isLogged) return <Redirect href="/" />;

  return (
    <Tabs
      screenOptions={{ tabBarShowLabel: false }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabBarIcon name="home" color={focused ? '#A1C398' : '#4b5563'} />,
        }}
      />
      <Tabs.Screen
        name='transactions'
        options={{
          title: 'Transactions',
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabBarIcon name="arrows" color={focused ? '#A1C398' : '#4b5563'} />,
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: 'Notes',
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabBarIcon name="sticky-note" color={focused ? '#A1C398' : '#4b5563'} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabBarIcon name="user" color={focused ? '#A1C398' : '#4b5563'} />,
        }}
      />
    </Tabs>
  );
}
