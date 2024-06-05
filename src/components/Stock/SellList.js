import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';

const SellList = ({ sellListData }) => {
    const overallData = sellListData.overallData
    const allSellData = sellListData.allSellData
  const productDetails = overallData?.products?.reduce((acc, item) => {
    acc[item.product.productId] = item.product;
    return acc;
  }, {});

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Sell List</Text>
      {allSellData.map((sell, index) => (
        <View key={index} style={styles.sellContainer}>
          <Text style={styles.buyerDetail}>Buyer: {sell.buyerDetail}</Text>
          <Text style={styles.billNumber}>Bill Number: {sell.billNumber}</Text>
          <Text style={styles.paymentStatus}>Payment Status: {sell.paymentStatus}</Text>
          {sell.products.map((product, idx) => {
            const productDetail = productDetails[product.productId];
            return (
              <View key={idx} style={styles.productContainer}>
                <Image source={{ uri: productDetail.productImage }} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{productDetail.productName}</Text>
                  <Text style={styles.productPrice}>Price: {product.price}</Text>
                  <Text style={styles.productWeight}>Weight: {product.weight}</Text>
                </View>
              </View>
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  sellContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buyerDetail: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  billNumber: {
    fontSize: 14,
  },
  paymentStatus: {
    fontSize: 14,
    marginBottom: 10,
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  productInfo: {
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
  },
  productPrice: {
    fontSize: 14,
  },
  productWeight: {
    fontSize: 14,
  },
});

export default SellList;
