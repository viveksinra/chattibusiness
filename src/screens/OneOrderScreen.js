import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { startUrl } from '../Context/ContentContext';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const OneOrderScreen = ({ route }) => {
  const { orderId } = route.params;
  const [order, setOrder] = useState(null);

  const getOneOrder = async () => {
    const url = `${startUrl}/chattiApi/allCommon/order/get/oneOrder/${orderId}`;

    // Retrieve the authorization token from SecureStore
    const token = await SecureStore.getItemAsync('authToken');

    try {
      // Make an API call to get the chat count from the server
      const response = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data);
      if (response.data.variant === "success") {
        const responseData = response.data; 
        setOrder(responseData.data);
      } else {
        alert("Failed to Connect to server, check your internet connection");
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      alert("Failed to fetch product data");
    }
  };

  useEffect(() => {
    getOneOrder();
  }, []);

  if (!order) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const pricePerKg = order.product.price / 100;
  const totalAmount = (pricePerKg * parseFloat(order.weightInKg)) || 0;
  const calculationText = order.weightInKg ? `₹${pricePerKg.toFixed(2)} per kg x ${order.weightInKg} kg` : '';

  return (
    <>
      <View style={styles.container}>
        <Image source={{ uri: order.product.productImage }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.productName}>{order.product.productName}</Text>
          <Text>{order.product.quality}</Text>
          <Text>Price: ₹{order.product.price}</Text>
       
        </View>
      </View>
      <View style={styles.totalContainer}>
      
        <Text style={styles.commonText}>Weight: {order.weightInKg} kg</Text>
          <Text style={styles.commonText}>Mobile Number: {order.mobileNumber}</Text>
          <Text style={styles.commonText}>Order Date: {order.orderDate}</Text>
          <Text style={styles.commonText}>Order Status: {order.orderStatus.label}</Text>
          <Text style={styles.commonText}>Payment Method: {order.selectedPaymentMethod.label}</Text>
    
          <Text style={styles.calculation}>{calculationText}</Text>
        <Text style={styles.total}>Total Amount: ₹{totalAmount.toFixed(2)}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: "white",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  calculation: {
    fontSize: 24,
    color: '#333',
    marginBottom: 5,
    marginTop:30
  },
  total: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  commonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginTop:10
  },
  totalContainer: {
    alignItems: 'flex-start',
    marginLeft: 20,
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OneOrderScreen;
