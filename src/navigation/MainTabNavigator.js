import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import HomeScreens from "../screens/HomeScreens";
import AllOrdersScreen from "../screens/AllOrdersScreen";
import AllTeamScreen from "../screens/AllTeamScreen";
import SettingScreen from "../screens/SettingScreen";
import {useTranslation} from 'react-i18next';
import LanguageSelector from "../components/SettingComponent/LanguageSelector";
import { View,Image,Animated } from "react-native";
import { useContext, useEffect } from "react";
import MainHeader from "./component/mainHeader";
import { AppContext } from "../../context/appContext";
import StockScreen from "../screens/StockScreen";
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const { t } = useTranslation();
  const { 
    roleId,
} = useContext(AppContext);
  return (
    <Tab.Navigator
      initialRouteName="homeScreen" 
      screenOptions={{
        tabBarStyle: { backgroundColor: "whitesmoke" },
        headerStyle: { backgroundColor: "whitesmoke" },
      }}
    >
<Tab.Screen
  name="homeScreen"
  component={HomeScreens}
  options={({ navigation }) => ({
    tabBarLabel: t('tab.home'),
    tabBarIcon: ({ color, size }) => (
      <Ionicons
        name="home-outline"
        size={size}
        color={color}
      />
    ),
    headerTitle: () => (
      <MainHeader  />
    ),
    headerRight: () => (
      <View style={{ marginRight: 15 }}>
        <LanguageSelector showIconOnly={true} />
      </View>
    ),
  })}
/>

   <Tab.Screen
        name="Orders"
        component={AllOrdersScreen}
        options={{
          tabBarLabel: t('tab.orders'),
          headerTitle:t('tab.orders'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="albums-outline" size={size} color={color} />

          ),
        }}
      />
   <Tab.Screen
        name="Stock"
        component={StockScreen}
        options={{
          tabBarLabel: t('tab.stock'),
          headerTitle:t('tab.stock'),
          tabBarIcon: ({ color, size }) => (
            <Feather name="truck" size={size} color={color} />

          ),
        }}
      />
   <Tab.Screen
        name="Teams"
        component={AllTeamScreen}
        options={{
          tabBarLabel: t('tab.teams'),
          headerTitle:t('tab.teams'),
          tabBarIcon: ({ color, size }) => (
  
            <AntDesign name="team" size={size} color={color} />
          ),
        }}
      />




      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          tabBarLabel: t('tab.setting'),
          headerTitle:t('tab.setting'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
