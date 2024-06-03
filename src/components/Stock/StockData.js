import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

const StockData = ({ products }) => {
  const { t } = useTranslation();

  return (
    <ScrollView>
      {products.map((item, index) => (
        <View key={index} style={styles.product}>
          <Text style={styles.productName}>{t('LanguageCode') === "en-IN" ? item.product.productName : item.product.productNameHindi}</Text>
        <Text style={styles.quality}>{t('product.one')} {t('LanguageCode') === "en-IN" ? item.product.quality : item.product.qualityHindi}</Text>
          <View style={styles.details}>
            <Text style={styles.detailText}>Quantity: {item.fullWeight} kg - worth ( ₹{item.fullPrice} )</Text>
            <Text style={styles.detailText}> Dhala + Freight + Miscellaneous: ₹{item.fullDhala} + ₹{item.fullFreight} +  ₹{item.fullMiscellaneous}</Text>
            <Text style={styles.detailText}>Actual Amount: ₹{(+item.fullPrice) - (+item.fullDhala + +item.fullFreight + +item.fullMiscellaneous)}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  product: {
    borderWidth: 1,
    borderRadius:30,
    borderColor: '#ddd',
    padding: 20,
    margin: 20,
    backgroundColor:"white"
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quality: {
    fontSize: 16,
  },
  productNameHindi: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  qualityHindi: {
    fontSize: 16,
  },
  details: {
    marginTop: 10,
  },
  detailText: {
    fontSize: 14,
  },
});

export default StockData;
