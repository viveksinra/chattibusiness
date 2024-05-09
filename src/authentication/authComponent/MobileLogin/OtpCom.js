import React, {useState,useContext} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, Image} from 'react-native';
import axios from 'axios';

import * as SecureStore from 'expo-secure-store';
import { AppContext } from '../../../../context/appContext';
import ContentContext from '../../../Context/ContentContext';
const startUrl = ContentContext.startUrl
import { useTranslation } from 'react-i18next';

const OtpCom = ({setStep,otp,setOtp,mobileNo}) => {
  const { setIsSignedIn } = useContext(AppContext);
  const { t } = useTranslation();


  const storeToken = async (token) => {
    try {
      await SecureStore.setItemAsync('authToken', token);
        setIsSignedIn(true);

    } catch (error) {
      // Handle errors, e.g., show an error message
    
      console.error(error);
    }
  };
  const storeMobile = async (mobileNo) => {
    try {
      await SecureStore.setItemAsync('mobileNo', mobileNo);
    } catch (error) {
      console.error(error);
    }
  };

  const verifyOTP = async (mobileNumber, otp) => {
    try {
      const response = await axios.post(`${startUrl}/chattiApi/allCommon/userAuth/verifyOtp/businessApp`, {
        mobileNumber: mobileNumber,
        otp: otp,
      });
      // Handle the response, e.g., store the Bearer Token
      const token = response.data.token;
      // Store the token securely
      await storeToken(token);
      await storeMobile(mobileNo);
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error(error);
    }
  };
  


    const handleVerify = () => {
      verifyOTP(mobileNo,otp)
      };
    
      const handleResend = () => {
        // resend OTP to mobileNo number
      };
    return (
        <>
   
         <View>
         <Text style={styles.title}>{t('otp.one')}</Text>
         <Text style={styles.subtitle}>
         {t('otp.two')}
         </Text>
         <TouchableOpacity onPress={() => setStep(1)} style={styles.rowView}>
         <Text >{t('otp.three')} </Text>
         <Text style={styles.resendText}> ✏️{mobileNo}</Text>
       </TouchableOpacity>
         <View style={styles.form}>
           <Text style={styles.label}>{t('otp.four')}</Text>
           <TextInput
             style={styles.input}
             placeholder={t('otp.five')}
             keyboardType="number-pad"
             value={otp}
             onChangeText={setOtp}
             maxLength={6}
 
           />
         </View>
       </View>
       <TouchableOpacity
      style={styles.button}
      onPress={ handleVerify}>
      <Text style={styles.buttonText}>{t('otp.six')}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={handleResend}>
        <Text style={styles.resendText}>{t('otp.seven')}</Text>
      </TouchableOpacity>
       </>
    )

}

const styles = StyleSheet.create({
    rowView:{
        flexDirection:"row",
    },
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
      fontSize: 35,
      fontWeight: '400',
      paddingHorizontal: 16,
    },
    button: {
      backgroundColor: 'rgb(255, 165, 0)', // changed from purple to orange
      borderRadius: 8,
      height: 48,
      width: '100%',
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
      color: "blue", // changed from white to black
      fontSize: 15,
      fontWeight: '400',
      textDecorationLine: 'underline',
    },

  });
export default OtpCom;