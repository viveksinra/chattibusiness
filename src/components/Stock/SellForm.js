import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import axios from 'axios';
import GeneralLoading from '../General/GeneralLoading';
import { startUrl } from '../../Context/ContentContext';
import * as SecureStore from 'expo-secure-store';
import LabeledInput from './LabeledInput';

const SellForm = ({ allStock, setIsAdding }) => {
  const initialSellData = allStock.reduce((acc, product) => {
    acc[product.product.productId] = {
      quantityToSell: '0',
      price: '0',
      totalStock: product.currentData.totalStock,
    };
    return acc;
  }, {});

  const [sellData, setSellData] = useState(initialSellData);
  const [dhala, setDhala] = useState('');
  const [freight, setFreight] = useState('');
  const [miscellaneous, setMiscellaneous] = useState('');
  const [buyerDetail, setBuyerDetail] = useState('');
  const [billNumber, setBillNumber] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = (productId, value) => {
    setSellData({
      ...sellData,
      [productId]: {
        ...sellData[productId],
        quantityToSell: value,
      },
    });
  };

  const handlePriceChange = (productId, value) => {
    setSellData({
      ...sellData,
      [productId]: {
        ...sellData[productId],
        price: value,
      },
    });
  };

  const handleSubmit = async () => {
    for (let productId in sellData) {
      const product = allStock.find((p) => p.product.productId === productId);
      const quantityToSell = parseFloat(sellData[productId].quantityToSell);
      if (quantityToSell > product.currentData.totalStock) {
        alert(`Quantity to sell for ${product.product.productName} cannot exceed available stock`);
        return;
      }
    }

    const submissionData = {
      products: Object.keys(sellData).map((productId) => ({
        productId,
        price: sellData[productId].price,
        weight: sellData[productId].quantityToSell,
      })),
      dhala,
      freight,
      miscellaneous,
      buyerDetail,
      billNumber,
      paymentStatus: {
        label: paymentStatus === 'pending' ? 'Pending' : paymentStatus === 'partial' ? 'Partial' : 'Completed',
        id: paymentStatus,
      },
    };

    await callApiData(submissionData);
  };

  const callApiData = async (submissionData) => {
    try {
      setLoading(true);
      const url = `${startUrl}/chattiApi/allCommon/stockSell/newSell`;
      const token = await SecureStore.getItemAsync('authToken');
      const response = await axios.post(url, submissionData, {
        headers: { 'Content-Type': 'application/json', Authorization: token },
      });
      const responseData = response.data;
      if (responseData.variant === 'success') {
        ToastAndroid.show(responseData.message, ToastAndroid.SHORT);
        resetForm();
        setIsAdding(false);
      } else {
        ToastAndroid.show(responseData.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error changing order status:', error);
      ToastAndroid.show('Failed to sell', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSellData(initialSellData);
    setDhala('');
    setFreight('');
    setMiscellaneous('');
    setBuyerDetail('');
    setBillNumber('');
    setPaymentStatus('pending');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ marginTop: 7 }}></View>
      <LabeledInput
        label="Bill Number"
        placeholder="Bill Number"
        keyboardType="numeric"
        value={billNumber}
        onChangeText={setBillNumber}
      />
      <LabeledInput
        label="Buyer Detail - Name/Mobile No"
        placeholder="Buyer Detail - Name/Mobile No"
        value={buyerDetail}
        onChangeText={setBuyerDetail}
      />
      {allStock.map((product) => (
        <View key={product.product.productId} style={styles.productContainer}>
          <Image source={{ uri: product.product.productImage }} style={styles.productImage} />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{product.product.productName} ({product.currentData.totalStock} Kg)</Text>
            <LabeledInput
              label="Quantity to Sell in Kg"
              placeholder="Quantity to Sell in Kg"
              keyboardType="numeric"
              value={sellData[product.product.productId].quantityToSell}
              onChangeText={(value) => handleQuantityChange(product.product.productId, value)}
            />
            <LabeledInput
              label="Per Kg Price"
              placeholder="Per Kg Price"
              keyboardType="numeric"
              value={sellData[product.product.productId].price}
              onChangeText={(value) => handlePriceChange(product.product.productId, value)}
            />
          </View>
        </View>
      ))}
      <View style={styles.inputContainer}>
        <LabeledInput
          label="Dhala"
          placeholder="Dhala"
          keyboardType="numeric"
          value={dhala}
          onChangeText={setDhala}
        />
        <LabeledInput
          label="Freight"
          placeholder="Freight"
          keyboardType="numeric"
          value={freight}
          onChangeText={setFreight}
        />
        <LabeledInput
          label="Miscellaneous"
          placeholder="Miscellaneous"
          keyboardType="numeric"
          value={miscellaneous}
          onChangeText={setMiscellaneous}
        />
        <View style={styles.radioContainer}>
          <Text style={styles.radioText}>Payment Status:</Text>
          <View style={styles.radioOptionContainer}>
            <View style={styles.radioOption}>
              <TouchableOpacity onPress={() => setPaymentStatus('pending')} style={styles.radioButton}>
                <View style={paymentStatus === 'pending' ? styles.radioButtonSelected : styles.radioButtonUnselected} />
              </TouchableOpacity>
              <Text>Pending</Text>
            </View>
            <View style={styles.radioOption}>
              <TouchableOpacity onPress={() => setPaymentStatus('partial')} style={styles.radioButton}>
                <View style={paymentStatus === 'partial' ? styles.radioButtonSelected : styles.radioButtonUnselected} />
              </TouchableOpacity>
              <Text>Partial</Text>
            </View>
            <View style={styles.radioOption}>
              <TouchableOpacity onPress={() => setPaymentStatus('completed')} style={styles.radioButton}>
                <View style={paymentStatus === 'completed' ? styles.radioButtonSelected : styles.radioButtonUnselected} />
              </TouchableOpacity>
              <Text>Completed</Text>
            </View>
          </View>
        </View>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
      <GeneralLoading loading={loading} loadingText={'Adding Sell Data'} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    color: '#555',
  },
  inputContainer: {
    marginTop: 20,
  },
  radioContainer: {
    marginBottom: 20,
  },
  radioText: {
    fontSize: 16,
    marginBottom: 10,
  },
  radioOptionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'gray',
  },
  radioButtonUnselected: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default SellForm;
