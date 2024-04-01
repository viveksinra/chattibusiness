// MainHeader.js

import React, { useEffect } from 'react';
import { View, Image, Animated } from 'react-native';
const logoImage = require('../../../commonAssets/images/appLogo.png');
const logoImageEng = require('../../../commonAssets/images/appLogoEng.png');
import { useTranslation } from 'react-i18next';

const MainHeader = () => {
  const buttonOpacity = new Animated.Value(1);
  const { t } = useTranslation();

  useEffect(() => {
    const animateButton = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(buttonOpacity, {
            toValue: 0.5,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(buttonOpacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateButton();

    return () => {
      buttonOpacity.stopAnimation();
    };
  }, []);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Animated.View style={{ opacity: buttonOpacity }}>
        <Image
          source={ (t('LanguageCode') === "en-IN" )? logoImageEng : logoImage}
          style={{ width: 150, height: 30, marginLeft: 2 }}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

export default MainHeader;
