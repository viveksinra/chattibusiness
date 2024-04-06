import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, Image} from 'react-native';
import axios from 'axios';
import ContentContext from '../../../Context/ContentContext';
const startUrl = ContentContext.startUrl
import { useTranslation } from 'react-i18next';

const MobileCom = ({setStep,mobileNo,setMobileNo}) => {
  const { t } = useTranslation();

    const handleSignUp = () => {
        if(mobileNo?.length == 10){
          sendOTP(mobileNo)
        setStep(2);} else {
          alert("Invalid Mobile number");
        }
      };

      const sendOTP = async (mobileNo) => {
        try {
          const response = await axios.post(`${startUrl}/chattiApi/allCommon/userAuth/sendOtp`, {
            mobileNo: mobileNo,
          });
          // Handle the response, e.g., show a message to the user
        } catch (error) {
          // Handle errors, e.g., show an error message
          console.error(error);
        }
      };

    return (
        <>
        <View>
        <Text style={styles.title}>{t('Login.one')}</Text>
        <Text style={styles.subtitle}>
          {t('Login.two')}
        </Text>
        <View style={styles.form}>
          <Text style={styles.label}>+91</Text>
          <TextInput
            style={styles.input}
            placeholder={t('Login.three')}
            keyboardType="phone-pad"
            value={mobileNo}
            onChangeText={setMobileNo}
            maxLength={10}
          />
        </View>
      </View>
        
       <TouchableOpacity
      style={styles.button}
      onPress={ handleSignUp }>
      <Text style={styles.buttonText}>{t('Login.one')}</Text>
    </TouchableOpacity>

       </>
    )

}

const styles = StyleSheet.create({
   
    title: {
      color: '#000000', // changed from white to black
      fontSize: 28,
      fontWeight: '700',
      marginBottom: 8,
    },
    subtitle: {
      color: 'rgba(0, 0, 0, 0.6)', // changed from light gray to dark gray
      fontSize: 17,
      fontWeight: '400',
      marginBottom: 12,  
    },
    form: {
      backgroundColor: 'white',
      borderColor:"black",
      borderWidth: 1,
      borderRadius: 12,
      flexDirection: 'row',
      height: 48,
      width: '100%',
      marginBottom: 16,
      opacity: 0.8,
      marginTop:24,
    },
    label: {
      color: '#000000', // changed from light gray to black
      fontSize: 25,
      fontWeight: '400',
      width: 80,
      textAlign: 'center',
      textAlignVertical: 'center',
      borderColor:"black",
      borderWidth: 1,
      borderRadius: 8,
    },
    input: {
      color: 'black', // changed from white to black
      flex: 1,
      fontSize: 30,
      fontWeight: '400',
      paddingHorizontal: 16,
    },
    button: {
      backgroundColor: 'rgb(255, 165, 0)', // changed from purple to orange
      borderRadius:12,
      height: 48,
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
      opacity: 0.9,
    },
    buttonText: {
      color: '#000000', // changed from white to black
      fontSize: 17,
      fontWeight: '600',
    },
    resendText: {
      color: '#000000', // changed from white to black
      fontSize: 15,
      fontWeight: '400',
      textDecorationLine: 'underline',
    },

  });
export default MobileCom;