import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('हिंदी');

  useEffect(() => {
    // Retrieve the selected language from AsyncStorage
    const retrieveLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('selectedLanguage');
        if (storedLanguage) {
          setSelectedLanguage(storedLanguage);
        }
      } catch (error) {
        console.log('Error retrieving language from AsyncStorage:', error);
      }
    };

    retrieveLanguage();
  }, []);

  const updateLanguage = async (language) => {
    setSelectedLanguage(language);
    try {
      // Save the selected language to AsyncStorage
      await AsyncStorage.setItem('selectedLanguage', language);
    } catch (error) {
      console.log('Error saving language to AsyncStorage:', error);
    }
  };

  return (
    <LanguageContext.Provider value={{ selectedLanguage, updateLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };
