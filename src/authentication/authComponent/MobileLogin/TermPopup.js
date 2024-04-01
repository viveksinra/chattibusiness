import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Make sure to install the necessary icons package
import TermAndCondition from './TermPolicyText';
import { useTranslation } from 'react-i18next';

const TermPopup = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { t } = useTranslation();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <TouchableOpacity onPress={toggleModal} style={{ padding: 10, marginBottom: 0 }}>
      <Text style={styles.termsText}>
      {t('tAndC')}
    </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.headerText}>Term of Use and Privacy Policy</Text>
            <TouchableOpacity onPress={toggleModal}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            <Text>
              {TermAndCondition}
             
            </Text>
          </ScrollView>
        </View>
      </Modal>
      </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsText: {
    color: 'rgba(0, 0, 0, 0.6)', // changed from light gray to dark gray
    fontSize: 15,
    fontWeight: '400',
    marginTop: 16,
  },
  modalContainer: {
    flex: 1,
    marginTop: 50,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'lightgray',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalBody: {
    padding: 20,
  },
});

export default TermPopup;
