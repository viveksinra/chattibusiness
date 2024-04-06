import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { startUrl } from '../Context/ContentContext';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import ChangeStatusCom from '../components/OrderHistoryItem/ChangeStatusCom';
import CallMsgButton from '../components/OrderHistoryItem/CallMsgButton';

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
      console.log(responseData)
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
          <CallMsgButton mobileNumber={order.mobileNumber} />
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

      <View style={styles.buttonsContainer}>
        {(order.orderStatus.id !== "cancelled" && order.orderStatus.id !== "allCompleted") &&
          <TouchableOpacity onPress={handleCancelOrder}>
            <Text style={[styles.button, styles.cancelButton]}>Cancel Order</Text>
          </TouchableOpacity>}
        {renderRightButton()}
      </View>

      <ChangeStatusCom
        visible={modalVisible}
        description={modalDescription}
        inputLabel={modalInputLabel}
        onConfirm={handleConfirmStatusChange}
        onCancel={() => setModalVisible(false)}
        comment={comment}
        setComment={setComment}
      />
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: 'red',
    color: 'white',
  },
  acceptOrder: {
    backgroundColor: 'green',
    color: 'white',
  },
});

export default OneOrderScreen;
