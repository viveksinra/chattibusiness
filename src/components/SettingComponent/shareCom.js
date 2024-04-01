import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Linking, Share } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

const ShareCom = () => {
  const { t } = useTranslation();
  const appLink = 'https://play.google.com/store/apps/details?id=com.softechinfra.talktogod';
  const appImage = require('./../../../commonAssets/splash.png'); // Replace with the actual path

  const shareMessage = t('shareMessage');
  
  const handleShareLink = async () => {
    try {
      // Use the Share API for general sharing
      await Share.share({
        message: shareMessage + '\n' + appLink,
      });
    } catch (error) {
      // Handle error if sharing fails
    }
  };

  const handleShareWhatsApp = async () => {
    try {
      // For WhatsApp, create a custom URL with parameters including the image and title
      const whatsappUrl =
        `whatsapp://send?text=${encodeURIComponent(shareMessage)}%0A${encodeURIComponent(appLink)}&` +
        `attachment=${appImage}&phone=`; // You can also include a phone number if needed

      // Open the URL using deep linking
      await Linking.openURL(whatsappUrl);
    } catch (error) {
      // Handle error if linking fails
    }
  };

  const handleRateApp = () => {
    Linking.openURL(appLink);
  };

  const renderSharingOption = (iconName, color, text, onPress) => (
    <TouchableOpacity onPress={onPress} style={styles.option}>
      <View style={styles.iconBox}>
        <Ionicons name={iconName} size={32} color={color} />
      </View>
      <Text style={styles.optionText}>{t(text)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {renderSharingOption('share-outline', 'black', t("setting.one"), handleShareLink)}
      {renderSharingOption('logo-whatsapp', 'green', t("setting.two"), handleShareWhatsApp)}
      {renderSharingOption('star-outline', 'black', t("setting.three"), handleRateApp)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  option: {
    alignItems: 'center',
  },
  iconBox: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
  },
  optionText: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    maxWidth: 70,
  },
});

export default ShareCom;
