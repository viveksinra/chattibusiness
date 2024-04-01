// PublicNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MobileLoginScreen from '../authentication/authScreen/mobileLoginScreen';
import MainHeader from './component/mainHeader';
import { View } from 'react-native';
import LanguageSelector from '../components/SettingComponent/LanguageSelector';

const Stack = createNativeStackNavigator();

const PublicNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
      name="LogIn"
       component={MobileLoginScreen}
        options={{ 
          headerTitle: () => (
            <MainHeader />
          ),
          headerRight: () => (
            <View style={{ marginRight: 15 }}>
              <LanguageSelector showIconOnly={true} />
            </View>
          ),
         }}
        
        />
    </Stack.Navigator>
  );
};

export default PublicNavigator;
