import React, { useState } from 'react';
import { View, Text, TextInput, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // make sure to install @expo/vector-icons

const ChangeStatusCom = ({ visible, description, inputLabel, onConfirm, onCancel,comment,setComment }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onCancel} style={styles.crossButton}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.inputLabel}>{inputLabel}</Text>
          <TextInput
            style={styles.input}
            value={comment}
            onChangeText={setComment}
            placeholder="Enter Comment.."
          />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={onCancel}>
              <Text style={[styles.button, styles.cancelButton]}>Cancel</Text>
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
  },
  cancelButton: {
    backgroundColor: '#ccc', // changed color
    color: 'black', // changed color
  },
  confirmButton: {
    backgroundColor: '#ccc', // changed color
    color: 'black', // changed color
  },
  crossButton: {
    alignSelf: 'flex-end',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'red',
    // marginTop: 10,
    // padding: 10,
  },
});

export default ChangeStatusCom;
