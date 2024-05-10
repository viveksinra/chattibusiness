import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AccordionItem from '../../components/General/AccordionItem';
import { useNavigation } from '@react-navigation/native';


const OrderDetailsComponent = ({ order, totalAmount }) => {
  
  const pricePerKg = order.orderPrice / 100;
  const calculationText = order.weightInKg ? `₹${pricePerKg.toFixed(2)} per kg x ${order.weightInKg} kg` : '';
  const ExactTotal = totalAmount - (+order.dhala + +order.freight + +order.miscellaneous)
  const secCalPart = `${totalAmount.toFixed(2)} - ${order.dhala} - ${order.freight} - ${order.miscellaneous}`
  const navigation = useNavigation();
  const goToUpdateOrder = () => {
  navigation.navigate('UpdateOrderScreen', { product:order.product, order: order });

  };
  return (
    <AccordionItem
      title="Order Details"
      defaultState={true}
      content={(
        <View style={styles.container}>
          <Text style={styles.commonText}>Weight: {order.weightInKg} kg</Text>
          <Text style={styles.commonText}>Mobile Number: {order.mobileNumber}</Text>
          <Text style={styles.commonText}>Order Date: {order.orderDate}</Text>
          <Text style={styles.commonText}>Order Status: {order.orderStatus.label}</Text>
          <Text style={styles.commonText}>Payment Method: {order.selectedPaymentMethod.label}</Text>
          <Text style={styles.calculation}>{calculationText}</Text>
          <Text style={styles.total}> ₹{totalAmount.toFixed(2)}</Text>
          <Text style={styles.commonText}>Dhala: -{order.dhala}</Text>
          <Text style={styles.commonText}>Freight: -{order.freight}</Text>
          <Text style={styles.commonText}>Miscellaneous: -{order.miscellaneous}</Text>

          <Text style={styles.calculation}>{secCalPart}</Text>
        <Text style={styles.total}>: Total Amount: ₹{ExactTotal.toFixed(2)}</Text>
          {(order.orderStatus.id !== "cancelled" && order.orderStatus.id !== "allCompleted") &&
        <TouchableOpacity onPress={goToUpdateOrder}>
          <Text style={[styles.button, styles.updateButton]}>Update Order</Text>
        </TouchableOpacity>}
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
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  updateButton: {
    backgroundColor: 'blue',
    color: 'white',
  },

});

export default OrderDetailsComponent;
