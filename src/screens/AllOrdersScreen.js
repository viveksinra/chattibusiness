// AllOrdersScreen.js
import React, { useContext, useEffect, useState } from 'react';

import { FlatList, View, StyleSheet, ImageBackground, ToastAndroid } from 'react-native';
import OrderListItem from '../components/OrderHistoryItem/index';
import { useTranslation } from 'react-i18next';
import ContentContext, { startUrl } from '../Context/ContentContext';
// import checkAndUpdateOrderHistory from '../utils/checkAndUpdateOrderHistory';
import GeneralLoading from '../components/General/GeneralLoading';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import NoOrderHistory from '../components/OrderHistoryItem/NoOrderHistory';

const image = { uri: ContentContext.orderHisBag };


const myOrders = [
  {
    product: {
      _id: '65f6d10a5dfc18586ceb1887',
      productName: 'Loading...',
      quality: 'High-Quality Grade 3 Maize',
      price: 1650,
      productImage: 'https://m.media-amazon.com/images/I/61V1TTqTu6L._AC_UF1000,1000_QL80_.jpg'
    },
    weightInKg: 50,
    mobileNumber: '9846173905',
    orderStatus: { label: 'New', id: 'new' }
  }
];

const AllOrdersScreen = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(myOrders);
  const { t } = useTranslation();

  const updateOrderHis = async () => {
   
    setLoading(true);
 try {
      let url = `${startUrl}/chattiApi/allCommon/order/get/allOrder`;
      // Retrieve the token from SecureStore
      let token = await SecureStore.getItemAsync('authToken');
      // Set the Authorization header for the request
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );
      let myRes = response.data;
      if (myRes.variant === 'success') {
        setOrders(myRes.data)
      ToastAndroid.show('Data Loaded.. ', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('some error occurred ', ToastAndroid.SHORT);
      console.log('Some error occurred while sending or setting the message' + error);
    }
   

    setLoading(false);
  };

   // Run the updateOrderHis function once when the component mounts
  useEffect(() => {
    updateOrderHis();
  }, []);

  if (orders.length === 0) {
    return <><NoOrderHistory />
      <GeneralLoading loading={loading} loadingText={'Updating Order History'} />
    
    </>;
  }

  return (
    <ImageBackground source={image} style={styles.backgroundImage}>
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </View>
    </ImageBackground>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    justifyContent: 'center',
    // Add more styles as needed
  },
});

export default AllOrdersScreen;
