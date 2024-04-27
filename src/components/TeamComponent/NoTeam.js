import React from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ContentContext from '../../Context/ContentContext';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const NoTeamComponent = ({updateAllTeam}) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const imageSource = { uri: ContentContext.orderHisBag };


  return (
    <View style={styles.container}>
      <ImageBackground
        source={imageSource}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.titleText}>No Team Found</Text>
          <Text style={styles.subtitleText}>Or You Don't have Perm</Text>
          <TouchableOpacity style={styles.refreshButton} onPress={updateAllTeam}>
            <FontAwesome name="refresh" size={24} color="white" />
            <Text style={styles.buttonText}>Refresh</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitleText: {
    color: 'white',
    fontSize: 20,
    marginBottom: 30,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 18,
  },
});

export default NoTeamComponent;
