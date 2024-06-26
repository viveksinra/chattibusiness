import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ToastAndroid, ScrollView } from 'react-native';
import { startUrl } from '../Context/ContentContext';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import ChangeStatusCom from '../components/OneOrderCom/ChangeStatusCom';
import OrderButtonComponent from '../components/OneOrderCom/OrderButtonComponent';
import OrderDetailsComponent from '../components/OneOrderCom/OrderDetailsComponent';
import OrderHistoryComp from '../components/OneOrderCom/OrderHistoryComp';
import ProductDetailsComponent from '../components/OneOrderCom/ProductDetailsComponent';

const OneOrderScreen = ({ route }) => {
  const { orderId } = route.params;
  const [order, setOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDescription, setModalDescription] = useState('');
  const [modalInputLabel, setModalInputLabel] = useState('');
  const [newStatus, setNewStatus] = useState({ label: "", id: "" });
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const getOneOrder = async () => {
    const url = `${startUrl}/chattiApi/allCommon/order/get/oneOrder/${orderId}`;

    try {
      const token = await SecureStore.getItemAsync('authToken');
      const response = await axios.get(url, {
        headers: { Authorization: token }
      });
      if (response.data.variant === "success") {
        setOrder(response.data.data);
      } else {
        ToastAndroid.show("Failed to Connect to server, check your internet connection", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
      ToastAndroid.show("Failed to fetch order data", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    getOneOrder();
  }, []);

  const handleChangeStatus = (newStatusLabel, newStatusId) => {
    setModalDescription(`Enter comments for changing status to ${newStatusLabel}`);
    setModalInputLabel('Write if any comment');
    setModalVisible(true);
    setNewStatus({ label: newStatusLabel, id: newStatusId });
  };

  const handleConfirmStatusChange = async () => {
    try {
      setLoading(true);
      const url = `${startUrl}/chattiApi/allCommon/updateOrderStatus/oneOrder/${orderId}`;
      const token = await SecureStore.getItemAsync('authToken');
      const response = await axios.post(url, { newStatus, comment }, { headers: { 'Content-Type': 'application/json', Authorization: token } });
      const responseData = response.data;
      if (responseData.variant === "success") {
        ToastAndroid.show(responseData.message, ToastAndroid.SHORT);
        getOneOrder();
      } else {
        ToastAndroid.show("Failed to change order status", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error changing order status:', error);
      ToastAndroid.show('Failed to change order status', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
      setModalVisible(false);
    }
  };

  const handleCancelOrder = () => {
    setModalDescription('Are you sure you want to cancel this order?');
    setModalInputLabel('Why do you want to cancel?');
    setModalVisible(true);
    setNewStatus({ label: "Cancelled", id: "cancelled" });
  };

  const handleConfirmCancelOrder = async () => {
    handleConfirmStatusChange();
  };

  const renderRightButton = () => {
    if (!order) return null;

    switch (order.orderStatus.id) {
      case 'new':
        return <TouchableOpacity onPress={() => handleChangeStatus('Accepted', 'accepted')}>
          <Text style={[styles.button, styles.acceptOrder]}>Accept Order</Text>
        </TouchableOpacity>;
      case 'accepted':
        return <TouchableOpacity onPress={() => handleChangeStatus('Pickup Scheduled', 'pickupScheduled')}>
          <Text style={[styles.button, styles.acceptOrder]}>Pickup Scheduled</Text>
        </TouchableOpacity>;
      case 'pickupScheduled':
        return <TouchableOpacity onPress={() => handleChangeStatus('Pickup Completed', 'pickupCompleted')}>
          <Text style={[styles.button, styles.acceptOrder]}>Pickup Completed</Text>
        </TouchableOpacity>;
      case 'pickupCompleted':
        return <TouchableOpacity onPress={() => handleChangeStatus('Payment Distributed', 'paymentDistributed')}>
          <Text style={[styles.button, styles.acceptOrder]}>Payment Distributed</Text>
        </TouchableOpacity>;
      case 'paymentDistributed':
        return <TouchableOpacity onPress={() => handleChangeStatus('All Completed', 'allCompleted')}>
          <Text style={[styles.button, styles.acceptOrder]}>All Completed</Text>
        </TouchableOpacity>;
      case 'cancelled':
        return <TouchableOpacity onPress={() => handleChangeStatus('Reopen', 'reopen')}>
          <Text style={[styles.button, styles.acceptOrder]}>Reopen</Text>
        </TouchableOpacity>;
      case 'reopen':
        return <TouchableOpacity onPress={() => handleChangeStatus('Accepted', 'accepted')}>
          <Text style={[styles.button, styles.acceptOrder]}>Accept Order</Text>
        </TouchableOpacity>;
      default:
        return null;
    }
  };

  if (!order) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const pricePerKg = order.orderPrice / 100;
  const totalAmount = (pricePerKg * parseFloat(order.weightInKg)) || 0;

  return (
    <ScrollView>
      <View style={styles.container}>
        <ProductDetailsComponent product={order.product} />
      </View>

      <OrderButtonComponent
        order={order}
        handleCancelOrder={handleCancelOrder}
        renderRightButton={renderRightButton}
      />

      <OrderDetailsComponent order={order} totalAmount={totalAmount} />
      <OrderHistoryComp order={order}/>

 
  <ChangeStatusCom
        visible={modalVisible}
        description={modalDescription}
        inputLabel={modalInputLabel}
        onConfirm={handleConfirmStatusChange}
        onCancel={() => setModalVisible(false)}
        comment={comment}
        setComment={setComment}
      />
      
    </ScrollView>
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
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  acceptOrder: {
    backgroundColor: 'green',
    color: 'white',
  },
});

export default OneOrderScreen;
