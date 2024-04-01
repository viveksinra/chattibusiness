// src/screens/NotImplementedScreen.js

import { View, Text, Image, StyleSheet } from 'react-native';
import ContentContext from '../Context/ContentContext';

const NotImplementedScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Not Implemented!</Text>
      <Image
        source={{
          uri: ContentContext.commingSoon,
        }}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: 'gray',
  },
  image: {
    width: '80%',
    aspectRatio: 2 / 1,
  },
});

export default NotImplementedScreen;