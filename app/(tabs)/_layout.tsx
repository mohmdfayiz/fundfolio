import React from 'react';
import { Image } from 'react-native';
import { Redirect, Tabs } from 'expo-router';
import { useGlobalContext } from '@/context/GlobalContext';
import icons from '../../constants/icons';

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
          tabBarIcon: ({ focused }) => <Image source={focused ? icons.homeActive : icons.home} style={{ width: 24, height: 24, }} />,
        }}
      />
      <Tabs.Screen
        name='transactions'
        options={{
          title: 'Transactions',
          headerShown: false,
          tabBarIcon: ({ focused }) => <Image source={focused ? icons.transactionActive : icons.transaction} style={{ width: 28, height: 28, }} />,
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: 'Notes',
          headerShown: false,
          tabBarIcon: ({ focused }) => <Image source={focused ? icons.notebookActive : icons.notebook} style={{ width: 25, height: 25, }} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => <Image source={focused ? icons.userActive : icons.user} style={{ width: 25, height: 25, }} />,
        }}
      />
    </Tabs>
  );
}
