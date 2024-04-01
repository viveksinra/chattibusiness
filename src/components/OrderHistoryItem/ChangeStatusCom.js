import React, { useState } from 'react';
import { View, Text, TextInput, Modal, StyleSheet, TouchableOpacity } from 'react-native';

const ChangeStatusCom = ({ visible, description, inputLabel, onConfirm, onCancel }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.inputLabel}>{inputLabel}</Text>
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Enter value"
          />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={onCancel}>
              <Text style={[styles.button, styles.cancelButton]}>Canceles</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onConfirm(inputValue)}>
              <Text style={[styles.button, styles.confirmButton]}>Confirm</Text>
            </TouchableOpacity>
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
    minWidth: 300,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
  },
  inputLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    width: '45%',
  },
  cancelButton: {
    backgroundColor: '#ccc', // changed color
    color: 'black', // changed color
  },
  confirmButton: {
    backgroundColor: '#ccc', // changed color
    color: 'black', // changed color
  },
});

export default ChangeStatusCom;
