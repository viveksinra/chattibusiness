import React from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ContentContext from '../../Context/ContentContext';
const image = { uri: ContentContext.orderHisBag };
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const NoOrderHistory = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleStartOrder = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.noOrderText}>{t('orderHis.two')}</Text>
          <TouchableOpacity style={styles.refreshButton} onPress={handleStartOrder}>
            <FontAwesome name="cart-plus" size={24} color="white" />
            <Text style={styles.buttonText}>{t('orderHis.three')}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  noOrderText: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
  },
});

export default NoOrderHistory;
