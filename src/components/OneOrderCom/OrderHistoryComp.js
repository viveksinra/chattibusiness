import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AccordionItem from '../../components/General/AccordionItem';


const OrderHistoryComp = ({ order }) => {
  const pricePerKg = order.product.price / 100;
  const calculationText = order.weightInKg ? `₹${pricePerKg.toFixed(2)} per kg x ${order.weightInKg} kg` : '';

  return (
    <AccordionItem
      title="Order History"
      defaultState={false}
      content={(
        <View style={styles.container}>
          <Text style={styles.commonText}>Weight: {order.weightInKg} kg</Text>
          <Text style={styles.commonText}>Mobile Number: {order.mobileNumber}</Text>
          <Text style={styles.commonText}>Order Date: {order.orderDate}</Text>
          <Text style={styles.commonText}>Order Status: {order.orderStatus.label}</Text>
          <Text style={styles.commonText}>Payment Method: {order.selectedPaymentMethod.label}</Text>
          <Text style={styles.calculation}>{calculationText}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({ 
  container: {
    alignItems: 'flex-start',
    marginLeft: 20,
    marginBottom: 20,
  },
  calculation: {
    fontSize: 24,
    color: '#333',
    marginBottom: 5,
    marginTop: 30
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
    marginTop: 10
  },

});

export default OrderHistoryComp;
