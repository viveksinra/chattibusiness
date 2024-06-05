import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

const StockData = ({ allStock }) => {
  const { t } = useTranslation();

  return (
    <ScrollView>
      {allStock.map((item, index) => (
        <View key={index} style={styles.product}>
          <Text style={styles.productName}>
            {t('LanguageCode') === "en-IN" ? item.product.productName : item.product.productNameHindi}
          </Text>
          <Text style={styles.quality}>
            {t('product.one')} {t('LanguageCode') === "en-IN" ? item.product.quality : item.product.qualityHindi}
          </Text>
          <View style={styles.details}>
            <Text style={styles.detailText}>
              Quantity: {item.purchaseData.fullWeight} kg - worth ( ₹{item.purchaseData.fullPrice} )
            </Text>
            <Text style={styles.detailText}>
              Dhala + Freight + Miscellaneous: ₹{item.purchaseData.fullDhala} + ₹{item.purchaseData.fullFreight} + ₹{item.purchaseData.fullMiscellaneous}
            </Text>
            <Text style={styles.detailText}>
              Actual Amount: ₹{(+item.purchaseData.fullPrice) - (+item.purchaseData.fullDhala + +item.purchaseData.fullFreight + +item.purchaseData.fullMiscellaneous)}
            </Text>
            <Text style={styles.detailText}>
              Total Sold: {item.sellData.totalSellWeight} kg - Earned ( ₹{item.sellData.totalSellPrice} )
            </Text>
            <Text style={styles.detailBoldText}>
              Current Stock: {item.currentData.totalStock} kg - Cash in Hand ( ₹{item.currentData.totalCash} )
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  product: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#ddd',
    padding: 20,
    margin: 20,
    backgroundColor: 'white',
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
  details: {
    marginTop: 10,
  },
  detailText: {
    fontSize: 14,
  },
  detailBoldText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StockData;
