import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome'; // import the Icon component
import { useNavigation } from '@react-navigation/native';


const ProfileButton = ({name,status,userImage,roleId}) => {

  const capitalizedStr = roleId.charAt(0).toUpperCase() + roleId.slice(1)

  const {t} = useTranslation();
  const navigation = useNavigation();
  function handleShowProfile() {
    navigation.navigate('ProfileScreen');
  }
  return (
    <TouchableOpacity style={styles.container} onPress={handleShowProfile}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: userImage }} style={styles.image} />
      </View>
      <View style={styles.profileContainer}>
        <Text style={styles.name}>
          {name}
        </Text>
        <Text style={styles.status} numberOfLines={1}>
          {status}
        </Text>
        <Text style={styles.role} numberOfLines={1}>
          Role: {capitalizedStr}
        </Text>
      </View>
      <View>
  <Icon name="edit" size={20} color="#000" />
</View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Add this to align items on the extremes
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 5,
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  role: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  status: {
    fontSize: 16,
    color: '#888',
  },
});

export default ProfileButton;
