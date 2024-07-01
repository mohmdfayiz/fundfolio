import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image } from 'react-native';
import { Redirect, Tabs } from 'expo-router';
import { useGlobalContext } from '@/context/GlobalContext';
import icons from '../../constants/icons';

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
