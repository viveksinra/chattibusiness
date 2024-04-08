import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, Pressable } from 'react-native';

const PriceUpdateModal = ({ isVisible, currentPrice, onClose, handleUpdate, newPrice, setNewPrice }) => {

  const [errorMessage, setErrorMessage] = useState('');
  const [priceDiff, setPriceDiff] = useState(0);

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.currentPrice}>{`Current Price: ${currentPrice}`}</Text>
          <Text style={styles.newPriceLabel}>New Price</Text>
          <TextInput
            style={styles.input}
            value={newPrice.toString()}
            onChangeText={text => {
              setNewPrice(text);
              setPriceDiff(parseFloat(text) - currentPrice);
            }}
            keyboardType="numeric"
          />
          {priceDiff !== 0 && (
            <Text style={styles.priceDiff}>
              {`Price will ${priceDiff > 0 ? 'increase' : 'decrease'} by ${Math.abs(priceDiff)}`}
            </Text>
          )}
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
          <View style={styles.modalButtons}>
            <Pressable style={[styles.modalButton, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
            <Pressable style={[styles.modalButton, styles.updateButton]} onPress={handleUpdate}>
              <Text style={styles.buttonText}>Update</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  cancelButton: {
    backgroundColor: 'red',
    marginRight: 10,
  },
  updateButton: {
    backgroundColor: 'green',
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  newPriceLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  priceDiff: {
    fontSize: 14,
    color: 'blue',
    marginBottom: 10,
  },
});

export default PriceUpdateModal;
