
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons
import { useNavigation } from '@react-navigation/native';


const CallMsgButton = ({mobileNumber}) => {
    function handleCall() {
        // Implement the logic to initiate a phone call
        Linking.openURL(`tel:${mobileNumber}`);
      }
    
      function handleWhatsApp() {
        // Implement the logic to open WhatsApp with the mobile number
        Linking.openURL(`whatsapp://send?phone=${mobileNumber}`);
      }
    
      function handleMessage() {
        // Implement the logic to open the messaging app
        Linking.openURL(`sms:${mobileNumber}`);
      }


      return(
        <View style={styles.buttonsContainer}>
          {/* Call Button */}
          <TouchableOpacity onPress={handleCall} style={styles.iconButton}>
            <FontAwesome name="phone" size={24} color="#333" />
          </TouchableOpacity>
          {/* WhatsApp Button */}
          <TouchableOpacity onPress={handleWhatsApp} style={styles.iconButton}>
            <FontAwesome name="whatsapp" size={24} color="#25D366" />
          </TouchableOpacity>
          {/* Message Button */}
          <TouchableOpacity onPress={handleMessage} style={styles.iconButton}>
            <FontAwesome name="envelope" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
      )
}

const styles = StyleSheet.create({
buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  iconButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 5,
    borderRadius: 20,
  },
})
export default  CallMsgButton;