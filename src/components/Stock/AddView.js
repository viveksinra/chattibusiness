import { StyleSheet, Text, View,  TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import React from 'react'

const AddView = ({title,isAdding,setIsAdding,addText,viewText}) => {
  return (
    <View style={styles.header}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity onPress={() => setIsAdding(!isAdding)} style={styles.toggleButton}>
    <Feather name={isAdding ? "database" : "plus-circle"} size={24} color="#1E5078"  />       
  <Text style={styles.toggleButtonText}>{isAdding ? viewText : addText}</Text>
</TouchableOpacity>
  </View>
  )
}

export default AddView

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 10,
      },
      sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#1E5078',
      },
      toggleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 50,
        backgroundColor: '#f9f9f9',
      },
      toggleButtonText: {
        marginLeft: 10,
        color: '#1E5078',
        fontSize: 16,
      },
})