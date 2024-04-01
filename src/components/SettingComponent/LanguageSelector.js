import 'intl-pluralrules';

import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Modal, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const LanguageSelector = ({ showIconOnly }) => {
  const { t, i18n } = useTranslation();

  const languages = [
    { code: 'hi', name: 'हिंदी' },
    { code: 'en', name: 'English' },
  ];

  const onceSelectedLanguage = i18n.language || languages[0].code;
  const [selectedLanguage, setSelectedLanguage] = useState(onceSelectedLanguage);
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);

  const handleLanguageSelection = (languageCode) => {
    setSelectedLanguage(languageCode);
    setLanguageModalVisible(false);

    // Update the language globally using i18next
    i18n.changeLanguage(languageCode);
  };

  useEffect(() => {
    // Update the selected language when the language changes from another place
    setSelectedLanguage(i18n.language);
  }, [i18n.language]);

  return (
    <>
   { showIconOnly ?  (
    <TouchableOpacity onPress={() => setLanguageModalVisible(true)}>
  <View style={styles.navOptionTextContainer}>
    <Ionicons name="language-outline" size={24} color="black" />
    <Text style={styles.selectnavText}>
      {t("LanguageCode")=="en-IN"?"English":"हिंदी"}
    </Text>
    <Ionicons name="chevron-down-outline" size={24} color="black" />
  </View>
</TouchableOpacity>
      ) : 
  (    <TouchableOpacity
        style={styles.option}
        onPress={() => setLanguageModalVisible(true)}
      >
        <View style={styles.optionContent}>
          <View style={styles.optionTextContainer}>
            <Ionicons name="language-outline" size={24} color="black" />
            <Text style={styles.optionText}>{t("setting.language")}</Text>
          </View>
          <Text style={styles.selectedText}>
          {t("LanguageCode")=="en-IN"?"English":"हिंदी"}
          </Text>
        </View>
      </TouchableOpacity>)}

      <Modal visible={isLanguageModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{t('lanPop.one')}</Text>
          {languages.map((language) => (
            <TouchableOpacity
              key={language.code}
              style={[
                styles.modalOption,
                selectedLanguage === language.code && styles.selectedOption,
              ]}
              onPress={() => handleLanguageSelection(language.code)}
            >
              <Text
                style={[
                  styles.modalOptionText,
                  selectedLanguage === language.code && styles.selectedOptionText,
                ]}
              >
                {language.name}
                {selectedLanguage === language.code && (
                  <Ionicons
                    name="checkmark-sharp"
                    size={24}
                    color="#00F"
                    style={styles.checkmarkIcon}
                  />
                )}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setLanguageModalVisible(false)}
          >
            <Text style={styles.modalCloseButtonText}>{t('lanPop.two')}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
// for nav bar

navOptionTextContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 10,
},
selectnavText: {
  fontSize: 18,
  color: '#333',
  marginLeft: 5,
  marginRight: 5,
  fontWeight: 'bold',
  textTransform: 'uppercase',
},

// for setting page

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
    backgroundColor: '#FF0000',
    alignItems: 'center',
    borderRadius:30
  },
  modalCloseButtonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default LanguageSelector;
