import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SellDataTab = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sell Data</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default SellDataTab;
