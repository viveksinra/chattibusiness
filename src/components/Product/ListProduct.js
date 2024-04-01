import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { MaterialIcons } from '@expo/vector-icons';
import PriceUpdateModal from './PriceUpdateModal';

const ListProduct = ({ product }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPrice, setNewPrice] = useState('');

  const sendToOrderProcess = () => {
    navigation.navigate('OrderProcessScreen', { product: product });
  };

  const handleUpdate = (price) => {
    // Call your API here to update the price with axios
    // After updating the price, you can close the modal
    setIsModalVisible(false);
    setNewPrice('');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => sendToOrderProcess()}>
      <View style={styles.imageContainer}>
        {/* Product Image */}
        <Image
          source={{ uri: product.productImage }}
          style={styles.image}
        />
      </View>
      <View style={styles.infoContainer}>
        {/* Product Information */}
        <Text style={styles.name}>{t('LanguageCode') === "en-IN" ? product.productName : product.productNameHindi}</Text>
        <Text style={styles.quality}>{t('product.one')} {t('LanguageCode') === "en-IN" ? product.quality : product.qualityHindi}</Text>
        <Text style={styles.price}>{t('product.two')}{product.price}/{t('opScreen1.two')}</Text>

        <Pressable style={styles.addButton} onPress={() => setIsModalVisible(true)}>
          <Text style={styles.buttonText}>{t('product.three')}</Text>
          <MaterialIcons name="update" size={24} color="white" />
        </Pressable>
      </View>

      {/* Price Update Modal */}
      <PriceUpdateModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onUpdate={handleUpdate}
        currentPrice={product.price}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  imageContainer: {
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  addButton: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 10,
    backgroundColor: '#856201',
    borderRadius: 8,
    marginTop: 10
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  quality: {
    fontSize: 16,
    color: '#888',
    marginBottom: 5,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 5,
  },
});

export default ListProduct;
