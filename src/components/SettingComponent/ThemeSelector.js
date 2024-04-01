import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Modal, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ThemeSelector = () => {
  const [selectedTheme, setSelectedTheme] = useState('System');
  const [isThemeModalVisible, setThemeModalVisible] = useState(false);

  const handleThemeSelection = (theme) => {
    setSelectedTheme(theme);
    setThemeModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.option}
        onPress={() => setThemeModalVisible(true)}
      >
        <View style={styles.optionContent}>
          <View style={styles.optionTextContainer}>
            <Ionicons name="color-palette-outline" size={24} color="black" />
            <Text style={styles.optionText}>Theme</Text>
          </View>
          <Text style={styles.selectedText}>{selectedTheme}</Text>
        </View>
      </TouchableOpacity>
      <Modal visible={isThemeModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Theme</Text>
          <TouchableOpacity
            style={[
              styles.modalOption,
              selectedTheme === 'Light' && styles.selectedOption,
            ]}
            onPress={() => handleThemeSelection('Light')}
          >
            <Text
              style={[
                styles.modalOptionText,
                selectedTheme === 'Light' && styles.selectedOptionText,
              ]}
            >
              Light
              {selectedTheme === 'Light' && (
                <Ionicons
                  name="checkmark-sharp"
                  size={24}
                  color="#00F"
                  style={styles.checkmarkIcon}
                />
              )}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.modalOption,
              selectedTheme === 'Dark' && styles.selectedOption,
            ]}
            onPress={() => handleThemeSelection('Dark')}
          >
            <Text
              style={[
                styles.modalOptionText,
                selectedTheme === 'Dark' && styles.selectedOptionText,
              ]}
            >
              Dark
              {selectedTheme === 'Dark' && (
                <Ionicons
                  name="checkmark-sharp"
                  size={24}
                  color="#00F"
                  style={styles.checkmarkIcon}
                />
              )}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.modalOption,
              selectedTheme === 'System' && styles.selectedOption,
            ]}
            onPress={() => handleThemeSelection('System')}
          >
            <Text
              style={[
                styles.modalOptionText,
                selectedTheme === 'System' && styles.selectedOptionText,
              ]}
            >
              System
              {selectedTheme === 'System' && (
                <Ionicons
                  name="checkmark-sharp"
                  size={24}
                  color="#00F"
                  style={styles.checkmarkIcon}
                />
              )}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setThemeModalVisible(false)}
          >
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
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
  selectedText: {
    fontSize: 18,
    color: '#777',
  },
  modalContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalOption: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#f1f1f1',
  },
  modalOptionText: {
    fontSize: 18,
    marginLeft: 10,
  },
  selectedOptionText: {
    fontWeight: 'bold',
  },
  checkmarkIcon: {
    marginLeft: 'auto',
  },
  modalCloseButton: {
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
  },
  modalCloseButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ThemeSelector;
