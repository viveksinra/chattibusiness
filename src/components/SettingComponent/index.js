import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import LanguageSelector from './LanguageSelector';
import ProfileButton from './ProfileButton';
import DeleteChatButton from './DeleteChatButton';
import ShareCom from './shareCom';
import LogOutButton from './LogOutButton';
const handleProfileUpdate = () => {
  // Handle navigation or any logic for updating the profile
  // You can navigate to a new page using navigation library like React Navigation
};
const App = () => {
  return (
    <LinearGradient colors={['#FFFFFF', '#D9E4F5']} style={styles.container}>
      {/* <OtherComponent /> */}
      <ProfileButton onPress={handleProfileUpdate} />
      {/* <ThemeSelector /> */}
      <LanguageSelector showIconOnly={false}  />
      <DeleteChatButton />
      <ShareCom />
      <LogOutButton />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
