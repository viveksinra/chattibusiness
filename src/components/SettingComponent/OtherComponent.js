import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const otherComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.option}>
        <View style={styles.optionContent}>
          <View style={styles.optionTextContainer}>
            <Ionicons name="person-outline" size={24} color="black" />
            <Text style={styles.optionText}>Account</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color="black" />
        </View>
      </View>
      <View style={styles.option}>
        <View style={styles.optionContent}>
          <View style={styles.optionTextContainer}>
            <Ionicons name="chatbubbles-outline" size={24} color="black" />
            <Text style={styles.optionText}>Chats</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color="black" />
        </View>
      </View>
      <View style={styles.option}>
        <View style={styles.optionContent}>
          <View style={styles.optionTextContainer}>
            <Ionicons name="notifications-outline" size={24} color="black" />
            <Text style={styles.optionText}>Notifications</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color="black" />
        </View>
      </View>
      <View style={styles.option}>
        <View style={styles.optionContent}>
          <View style={styles.optionTextContainer}>
            <Ionicons name="help-circle-outline" size={24} color="black" />
            <Text style={styles.optionText}>Help</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color="black" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  option: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    marginLeft: 15,
    fontSize: 18,
    color: '#333',
  },
});

export default otherComponent;
