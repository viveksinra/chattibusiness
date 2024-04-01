import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LanguageSelector from '../components/SettingComponent/LanguageSelector';
import ProfileButton from '../components/SettingComponent/ProfileButton';
import ShareCom from '../components/SettingComponent/shareCom';
import LogOutButton from '../components/SettingComponent/LogOutButton';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import ContentContext, { startUrl } from '../Context/ContentContext';
import { AppContext } from '../../context/appContext';
import handleSetData from '../utils/handleSetData';
import SocialAccount from '../components/Contact/SocialAccount';
import TermPopup from '../authentication/authComponent/MobileLogin/TermPopup';

const SettingScreen = () => {
  const { name,
    setName,
    mobileNumber,
    setMobileNumber,
    status,
    setStatus,
    userImage,
    setUserImage } = useContext(AppContext);
  useEffect(() => {
    // Call handleSetData when the component mounts
    handleSetData({ setName, setStatus, setUserImage, setMobileNumber });

  }, []); 

  return (
    <LinearGradient colors={['#FFFFFF', '#D9E4F5']} style={styles.container}>
      {/* <OtherComponent /> */}
      <ProfileButton name={name} status={status} userImage={userImage}/>
      {/* <ThemeSelector /> */}
      <LanguageSelector showIconOnly={false}  />
      {/* <ShareCom /> */}
      {/* <SocialAccount /> */}

      <LogOutButton />
<TermPopup /> 

    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SettingScreen;
