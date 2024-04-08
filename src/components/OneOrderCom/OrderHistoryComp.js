import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AccordionItem from '../../components/General/AccordionItem';

const OrderHistoryComp = ({ order }) => {
  return (
    <AccordionItem
    title="Order Details"
    defaultState={true}
    content={(
    <View style={styles.container}>
      {order.history.map((items, index) => 
       { 
       return( items.map((item, index)=> (
<View key={item._id} style={styles.historyItem}>
          <Text style={styles.historyText}>{item.fieldName}: Changed from {item.oldP} to {item.newP}</Text>
          <Text style={styles.historyText}>Comment: {item.comment}</Text>
        </View>
       )))}
      )}
    </View>)}
     />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  historyItem: {
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  historyText: {
    fontSize: 16,
    color: 'black',
  },
});

export default OrderHistoryComp;
