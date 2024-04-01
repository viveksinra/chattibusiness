// Import necessary dependencies
import React from 'react';
import { View, TouchableOpacity, Linking, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// SocialAccount component
const SocialAccount = () => {
  // Define a function to open a URL
  const openURL = (url) => {
    Linking.openURL(url);
  };

  // Define URLs for different social accounts
  const urls = {
    whatsapp: 'https://wa.me/91946011760?text=Hello%20I%20am%20from%20Talk%20To%20app',
    instagram: 'https://www.instagram.com/viveksinra',
    email: 'mailto:vivek.kr212@gmail.com?subject=Hi%20I%20am%20from%20Talk%20To%20app',
    web: 'https://www.softechinfra.com',
    twitter: 'https://twitter.com/viveksinra',
  };

  // Define icons for different social accounts
  const icons = {
    whatsapp: { name: "logo-whatsapp", color: "#25d366" },
    instagram: { name: "logo-instagram", color: "#833AB4" },
    email: { name: "mail-outline", color: "#3498db" },
    web: { name: "globe-outline", color: "#3498db" },
    twitter: { name: "logo-twitter", color: "#1da1f2" },
  };

  return (
    <View style={{ padding: 10, marginBottom: 0 }}>
      <Text style={{ marginBottom: 10 }}>If you are facing any issues, please contact us:</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        {Object.keys(urls).map((key) => (
          <TouchableOpacity key={key} onPress={() => openURL(urls[key])}>
            <Ionicons name={icons[key].name} size={40} color={icons[key].color} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SocialAccount;
