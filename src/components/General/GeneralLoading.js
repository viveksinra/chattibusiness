import React from 'react';
import { Modal, ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const GeneralLoading = ({ loading, loadingText }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={loading}>
      <View style={styles.generalModalContainer}>
        <LottieView
          source={require('../../../commonAssets/animation/getting-response.json')}
          autoPlay
          loop
          style={styles.newAnimation}
        />
        <ActivityIndicator size="large" color="white" />
        <Text style={styles.generalModalMessage}>{loadingText}</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  generalModalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  newAnimation: {
    width: 300,
    height: 300,
  },
  generalModalMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
});

export default GeneralLoading;
