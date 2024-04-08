import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

const Label = ({ text }) => {
  return <Text style={styles.textLabel}>{text}</Text>;
};
const OpScreen1 = ({ order,product,weight, setWeight,mobileNumber, setMobileNumber }) => {
  const { t } = useTranslation();
  const pricePerKg = order.orderPrice / 100;
  const totalAmount = (pricePerKg * parseFloat(weight)) || 0;
  const calculationText = weight ? `₹${pricePerKg.toFixed(2)}/${t('opScreen1.one')} x ${weight} ${t('opScreen1.one')}` : '';
  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.productImage }}
          style={styles.image}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{ (t('LanguageCode') === "en-IN" )? product.productName : product.productNameHindi}</Text>
        {/* <Text style={styles.quality}>Quality: {product.quality}</Text> */}
        <Text style={styles.price}>{t('opScreen1.five')}: ₹{order.orderPrice}/{t('opScreen1.two')} Or ₹{pricePerKg.toFixed(2)}/{t('opScreen1.one')}</Text>
        {/* <Text style={styles.price}>Price per Kg: </Text> */}
        {weight && <View style={styles.totalContainer}>
      <Text style={styles.calculation}>{calculationText}</Text>
        <Text style={styles.total}>: ₹{totalAmount.toFixed(2)}</Text>
        </View>}
      </View>
     
    </View>
    <View style={styles.inputContainer}>
    <Label text= {t('opScreen1.three')} />
        <TextInput
          style={styles.textInput}
          onChangeText={setMobileNumber}
          value={mobileNumber}
          placeholder={t('opScreen1.three')}
          keyboardType="numeric"
          returnKeyType="done"
          blurOnSubmit={true}
          maxLength={10}
        />
        <Label text={t('opScreen1.four')} />
        <TextInput
          style={styles.textInput}
          onChangeText={setWeight}
          value={weight}
          placeholder={t('opScreen1.four')}
          keyboardType="numeric"
          returnKeyType="done"
          blurOnSubmit={true}
          maxLength={12}

        />    

    
    </View>
    
   </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    width:'98%'
  },

  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 5,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 5,
  },
  
  input: {
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: '120%',
  },
  button: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    padding: 36,
    width: '120%',
    paddingTop:5,
    paddingLeft:10,
    paddingRight:80
  },
    labelInputContainer:{
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  textLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 10,
    fontSize: 18, // Adjust the value to set the desired font size
  },
  
  calculation: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  totalContainer:{
    flexDirection:'row',
    alignItems: 'flex-start',

    marginBottom: 1,
  },
});

export default OpScreen1;
