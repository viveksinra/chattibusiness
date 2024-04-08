// AuthenticatedNavigator.js
import React, { useContext, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllOrdersScreen from '../screens/AllOrdersScreen';
import MainTabNavigator from './MainTabNavigator';
import NotImplementedScreen from '../screens/NotImplementedScreen';
import { useTranslation } from 'react-i18next';
import ProfileScreen from '../screens/ProfileScreen';
import UpdateOrderScreen from '../screens/UpdateOrderScreen';
import OneOrderScreen from '../screens/OneOrderScreen';


const Stack = createNativeStackNavigator();

const AuthenticatedNavigator = () => {
  const { t } = useTranslation();
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainTabs" component={MainTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="AllOrdersScreen"
        component={AllOrdersScreen}

      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
      <Stack.Screen
        name="UpdateOrderScreen"
        component={UpdateOrderScreen}
        options={{ title: 'Order Process' }}
      />
      <Stack.Screen
        name="OneOrderScreen"
        component={OneOrderScreen}
        options={{ title: 'Order Details' }}
      />
      <Stack.Screen name="Contacts" component={NotImplementedScreen} />
    </Stack.Navigator>
  );
};

export default AuthenticatedNavigator;
