import React, { useState } from 'react';

import { AntDesign } from '@expo/vector-icons'; // make sure to install @expo/vector-icons
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AccordionItem = ({ title, content,defaultState }) => {
  const [expanded, setExpanded] = useState(defaultState);

  return (
    <View style={[styles.container, expanded ? styles.expanded : styles.collapsed]}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.title}>{title}</Text>
          <AntDesign name={expanded ? 'up' : 'down'} size={24} color="black" />
        </View>
      </TouchableOpacity>
      {expanded && <View>{content}</View>} 
    </View>
  );
};

const styles = StyleSheet.create({ 
  container: {
    alignItems: 'space-inbetween',
    marginLeft: 5,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  expanded: {
    backgroundColor: '#f0f0f0',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  collapsed: {
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  // ... rest of your styles
});

module.exports = AccordionItem