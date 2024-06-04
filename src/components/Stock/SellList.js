import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image } from 'react-native';

const SellList = ({ products }) => {
  const initialSellData = products.reduce((acc, product) => {
    acc[product.product.productId] = {
      quantityToSell: '',
    };
    return acc;
  }, {});

  const [sellData, setSellData] = useState(initialSellData);
  const [dhala, setDhala] = useState('');
  const [freight, setFreight] = useState('');
  const [miscellaneous, setMiscellaneous] = useState('');

  const handleQuantityChange = (productId, value) => {
    setSellData({
      ...sellData,
      [productId]: {
        ...sellData[productId],
        quantityToSell: value,
      },
    });
  };

  const handleSubmit = () => {
    for (let productId in sellData) {
      const product = products.find(p => p.product.productId === productId);
      const quantityToSell = parseFloat(sellData[productId].quantityToSell);
      if (quantityToSell > product.fullWeight) {
        alert(`Quantity to sell for ${product.product.productName} cannot exceed available quantity`);
        return;
      }
    }
    const submissionData = {
      products: sellData,
      dhala,
      freight,
      miscellaneous
    };
    console.log('Sell Data Submitted:', submissionData);
    // You can now submit the submissionData object to your backend or perform any other action required
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Sell List</Text>
    
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width:"100%",
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius:10
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainer: {
    marginTop: 10,
    borderRadius:20
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius:20

  },
});

export default SellList;
