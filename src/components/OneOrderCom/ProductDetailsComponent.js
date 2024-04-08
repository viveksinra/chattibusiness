// ProductDetailsComponent.js

import React from 'react';
import { View, Text, Image } from 'react-native';
import CallMsgButton from '../OrderHistoryItem/CallMsgButton';

const ProductDetailsComponent = ({ product }) => {
  return (
    <>
      <Image source={{ uri: product.productImage }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.productName}>{product.productName}</Text>
        <Text>{product.quality}</Text>
        <CallMsgButton mobileNumber={product.mobileNumber} />
      </View>
    </>
  );
};

const styles = {
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
};

export default ProductDetailsComponent;
