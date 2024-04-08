import React, { useState, useContext, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet,Animated,ScrollView,  ImageBackground } from 'react-native';
import { useTranslation } from 'react-i18next';
import Corn from '../components/Corn';

import ContentContext, { startUrl } from '../Context/ContentContext';
const image = { uri: ContentContext.mainBg };
import { useNavigation } from '@react-navigation/native';
import TermPopup from '../authentication/authComponent/MobileLogin/TermPopup';
import ListProduct from '../components/Product/ListProduct';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import GeneralLoading from '../components/General/GeneralLoading';


const HomeScreens = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
 const [allProduct, setAllProduct] = useState([
])
 const [loading, setLoading] = useState(false);

 const getProduct = async () => {
  setLoading(true)
  const url = `${startUrl}/chattiApi/allCommon/product/getProductForPublic`;

  // Retrieve the authorization token from SecureStore
  const token = await SecureStore.getItemAsync('authToken');

  try {
    // Make an API call to get the chat count from the server
    const response = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });
    if (response.data.variant === "success") {
      const responseData = response.data; // Assuming products is the array you want
      setAllProduct(responseData.data);
    } else {
      alert("Failed to Connect to server, check your internet connection");
    }
  setLoading(false)

  } catch (error) {
    console.error("Error fetching product data:", error);
    alert("Failed to fetch product data");
  }
};

useEffect(() => {
  getProduct();
}, []);


  return (
<ScrollView>
<GeneralLoading loading={loading} loadingText={'Placing your Order'} />

  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <ImageBackground source={image} style={styles.image}>
    <Corn />
   

    <Text style={styles.headerText}>
    {t('secMain.one')}
        <Text style={{ color: '#34d399', fontWeight: 'bold' }}>
    {t('secMain.two')}
          </Text>
    {t('secMain.three')}
         </Text>
{allProduct.map(product => (
  <ListProduct key={product._id} product={product} getProduct={getProduct}/>
))}



<TermPopup /> 

  </ImageBackground>
</View>
</ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  headerText: {
    color: '#00BFFF',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 15,
  },
  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000a0',
  },
});

export default HomeScreens;
