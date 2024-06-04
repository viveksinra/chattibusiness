import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const LabeledInput = ({ label, value, onChangeText, placeholder, keyboardType }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.labeledInputContainer}>
      {(isFocused || value) && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, (isFocused || value) && styles.inputWithLabel]}
        placeholder={!isFocused ? placeholder : ''}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  labeledInputContainer: {
    marginBottom: 20,
  },
  label: {
    position: 'absolute',
    top: -10,
    left: 10,
    fontSize: 12,
    color: '#555',
    backgroundColor: '#f9f9f9', // Matches the container background
    paddingHorizontal: 5,
    zIndex: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  inputWithLabel: {
    paddingTop: 18, // Adjust padding to avoid overlapping text
  },
});

export default LabeledInput;
