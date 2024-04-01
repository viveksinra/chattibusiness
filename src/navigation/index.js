import React, { useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthenticatedNavigator from './AuthenticatedNavigator';
import PublicNavigator from './PublicNavigator';
import * as SecureStore from 'expo-secure-store';

const Stack = createStackNavigator();
import { AppContext } from '../../context/appContext';


const Navigator = () => {
  const { isSignedIn, setIsSignedIn } = useContext(AppContext);
  useEffect(() => {
    // Check the authentication status and update the state accordingly
    SecureStore.getItemAsync('authToken')
      .then(value => {
        setIsSignedIn(!!value);
      })
      .catch(error => {
        console.error('Error retrieving authToken:', error);
      });
  }, []);

  return (
      <NavigationContainer>
        <Stack.Navigator>
          {!isSignedIn ? (
               <Stack.Screen
               name="PublicNavigator"
               component={PublicNavigator}
               options={{ headerShown: false }}
             />
             
          ) : (
            <Stack.Screen
            name="Authenticated"
            component={AuthenticatedNavigator}
            options={{ headerShown: false }}
          />
          )}
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default Navigator;

