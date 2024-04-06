// OrderButtonComponent.js

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const OrderButtonComponent = ({ order, handleCancelOrder, renderRightButton }) => {
  return (
    <View style={styles.buttonsContainer}>
      {(order.orderStatus.id !== "cancelled" && order.orderStatus.id !== "allCompleted") &&
        <TouchableOpacity onPress={handleCancelOrder}>
          <Text style={[styles.button, styles.cancelButton]}>Cancel Order</Text>
        </TouchableOpacity>}
      {renderRightButton()}
    </View>
  );
};

const styles = {
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: 'red',
    color: 'white',
  },
};

export default OrderButtonComponent;
