import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ToastAndroid } from 'react-native';
import OpScreen1 from '../components/OrderProcess/OpScreen1';
import OpScreen2 from '../components/OrderProcess/OpScreen2';
import OpScreen3 from '../components/OrderProcess/OpScreen3';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { startUrl } from '../Context/ContentContext';
import { useNavigation } from '@react-navigation/native';
import GeneralLoading from '../components/General/GeneralLoading';
import { useTranslation } from 'react-i18next';

const UpdateOrderScreen = ({ route }) => {
  const { t } = useTranslation();
  const { product,order } = route.params;
  let weightInKg = ""
  if(order.weightInKg){
 weightInKg = (order.weightInKg).toString()}
 
  const [mobileNumber, setMobileNumber] = useState(order.mobileNumber);
 
  const [orderPrice, setOrderPrice] = useState()
  const [currentStep, setCurrentStep] = useState(1);
  const [weight, setWeight] = useState(weightInKg);
  const [location, setLocation] = useState(order.location? order.location:null);
  const [address, setAddress] = useState(order.address? order.address:{});
  const [flat, setFlat] = useState(order.flat?order.flat:"");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(order.selectedPaymentMethod);
  const [upiId, setUpiId] = useState(order.upiId);
  const [accountNumber, setAccountNumber] = useState(order.accountNumber);
  const [accountHolderName, setAccountHolderName] = useState(order.accountHolderName);
  const [ifsc, setIfsc] = useState(order.ifsc);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
     
      } catch (error) {
        console.error('Error fetching mobile number:', error);
      }
    };
    fetchData();
  }, []);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const updateOrderFun = async () => {
    setLoading(true);
    try {
      const url = `${startUrl}/chattiApi/allCommon/order/updateOrder/${order._id}`;
      const token = await SecureStore.getItemAsync('authToken');
      const response = await axios.post(
        url,
        { product, weight, mobileNumber, location, address, flat, selectedPaymentMethod, upiId, accountNumber, accountHolderName, ifsc },
        { headers: { 'Content-Type': 'application/json', Authorization: token } }
      );
      const myRes = response.data;
      if (myRes?.message) {
        ToastAndroid.show(myRes.message, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("Failed to Place Order", ToastAndroid.SHORT);
      }
      if (myRes.variant === "success") {
        navigation.navigate('AllOrdersScreen');
      }
    } catch (error) {
      ToastAndroid.show('Some error occurred', ToastAndroid.SHORT);
      console.error('Error saving order:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = () => {
    setLoading(true);
    updateOrderFun();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <OpScreen1 order={order} product={product} weight={weight} setWeight={setWeight} mobileNumber={mobileNumber} setMobileNumber={setMobileNumber} />;
      case 2:
        return <OpScreen2 product={product} location={location} setLocation={setLocation} address={address} setAddress={setAddress} flat={flat} setFlat={setFlat} />;
      case 3:
        return <OpScreen3 selectedPaymentMethod={selectedPaymentMethod} setSelectedPaymentMethod={setSelectedPaymentMethod} upiId={upiId} setUpiId={setUpiId} accountNumber={accountNumber} setAccountNumber={setAccountNumber} accountHolderName={accountHolderName} setAccountHolderName={setAccountHolderName} ifsc={ifsc} setIfsc={setIfsc} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <GeneralLoading loading={loading} loadingText={'Placing your Order'} />
      <View style={styles.stepperContainer}>
        <TouchableOpacity onPress={() => setCurrentStep(1)}>
          <Text style={[styles.stepText, currentStep === 1 && styles.activeStepText]}>1</Text>
          <Text style={[styles.stepLabel, currentStep === 1 && styles.activeStepLabel]}>{t('opSc.one')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentStep(2)}>
          <Text style={[styles.stepText, currentStep === 2 && styles.activeStepText]}>2</Text>
          <Text style={[styles.stepLabel, currentStep === 2 && styles.activeStepLabel]}>{t('opSc.two')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentStep(3)}>
          <Text style={[styles.stepText, currentStep === 3 && styles.activeStepText]}>3</Text>
          <Text style={[styles.stepLabel, currentStep === 3 && styles.activeStepLabel]}>{t('opSc.three')}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {renderStepContent()}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={currentStep === 1 ? styles.disabledButton : styles.button}
            disabled={currentStep === 1}
            onPress={handleBack}
          >
            <Text style={styles.buttonText}>{t('opSc.four')}</Text>
          </TouchableOpacity>
          {currentStep !== 3 ? (
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>{t('opSc.five')}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleFinish}>
              <Text style={styles.submitButtonText}>{t('opSc.six')}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  stepText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
  },
  activeStepText: {
    color: 'yellowgreen',
  },
  stepLabel: {
    fontSize: 12,
    color: 'gray',
  },
  activeStepLabel: {
    color: 'yellowgreen',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'yellowgreen',
    padding: 10,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: 'yellow',
  },
  submitButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UpdateOrderScreen;
