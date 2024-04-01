import AsyncStorage from '@react-native-async-storage/async-storage';

const { ToastAndroid } = require("react-native");
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { startUrl } from '../Context/ContentContext';
const LocalDeleteAllOrder = async (clearMessages) => {
    try {
      await AsyncStorage.removeItem('messages');
      clearMessages();

      // Show a success toast on Android
      ToastAndroid.show('All order messages removed from this device only', ToastAndroid.SHORT);
    } catch (error) {
      console.log('Error deleting messages from AsyncStorage:', error);
    }
  };
const DbAndLocalDeleteAllOrder = async (clearMessages) => {
    try {
      await AsyncStorage.removeItem('messages');
      clearMessages();
      let url = `${startUrl}/chattiApi/allCommon/delete/allOrdersByUserId`;
      // Retrieve the token from SecureStore
      let token = await SecureStore.getItemAsync('authToken');
      // Set the Authorization header for the request
      const response = await axios.post(
        url,
        {  },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );
      let myRes = response.data;
      if (myRes.variant === 'success') {
        ToastAndroid.show('All order messages deleted successfully', ToastAndroid.SHORT);
      }
      // Show a success toast on Android
    } catch (error) {
      console.log('Error deleting messages from AsyncStorage:', error);
    }
  };
const DbAndLocalDeleteOneOrderId = async (removeFullOneOrderId,orderId) => {
    try {
      removeFullOneOrderId(orderId);
      let url = `${startUrl}/chattiApi/allCommon/delete/deleteOrderId`;
      // Retrieve the token from SecureStore
      let token = await SecureStore.getItemAsync('authToken');
      // Set the Authorization header for the request
      const response = await axios.post(
        url,
        { orderId },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );
      let myRes = response.data;
      if (myRes.variant === 'success') {
        ToastAndroid.show('One Order Deleted', ToastAndroid.SHORT);
      }
      // Show a success toast on Android
      
    } catch (error) {
      console.log('Error deleting messages from AsyncStorage:', error);
    }
  };

  module.exports = {LocalDeleteAllOrder,DbAndLocalDeleteAllOrder,DbAndLocalDeleteOneOrderId}