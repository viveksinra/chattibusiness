import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrderListItem = ({ order }) => {
  const navigation = useNavigation();

  function handleOneOrder() {
    navigation.navigate('OneOrderScreen', { orderId: order._id });
  }
  const pricePerKg = order.product.price / 100;
  const totalAmount = (pricePerKg * parseFloat(order.weightInKg)) || 0;
  const calculationText =  `₹${pricePerKg.toFixed(2)} x ${order.weightInKg} kg`;

  return (
    <TouchableOpacity style={styles.container} onPress={handleOneOrder}>
      <Image source={{ uri: order.product.productImage }} style={styles.image} />
      <View style={styles.details}>
      <Text style={styles.date}>Date: {order.orderDate}</Text>

        <Text style={styles.productName}>{order.product.productName}</Text>
        <Text style={styles.status}>Status: {order.orderStatus.label}</Text>
         <View style={styles.totalContainer}>
           <Text style={styles.calculation}>{calculationText}</Text>
        <Text style={styles.total}>: ₹{totalAmount.toFixed(2)}</Text>
        </View>
    
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
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
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  totalContainer:{
    flexDirection:'row',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  status: {
    fontSize: 16,
    color: '#020275',
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
    color: '#6e7502',
    marginBottom: 5,
  },
});

export default OrderListItem;
