import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ImageBackground, Button, Alert } from 'react-native';
import ContentContext, { startUrl } from '../Context/ContentContext';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { ToastAndroid } from 'react-native';
import { AppContext } from '../../context/appContext';
import handleSetData from '../utils/handleSetData';

const ProfileScreen = () => {
  const { name,
    setName,
    mobileNumber,
    setMobileNumber,
    status,
    setStatus,
    userImage,
    setUserImage } = useContext(AppContext); // replace with your image url
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  useEffect(() => {
    // Call handleSetData when the component mounts
    handleSetData({ setName, setStatus, setUserImage, setMobileNumber });

  }, []); 
  const handleImageChange = async () => {
// Alert.alert('icon clicked')
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.3,
    });

    if (!result.canceled) {
    
      let localUri = result.assets[0].uri;
      
      let filename = localUri.split('/').pop();
    
      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
    
      // Prepare the data
      let formData = new FormData();
      formData.append('userImage', { uri: localUri, name: filename, type, });
    
      try {
        let url = `${startUrl}/chattiApi/allCommon/profile/userImage`;
        let token = await SecureStore.getItemAsync('authToken');
    
        const response = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': token,
          },
        });
    
        let myRes = response.data;
        if (myRes.variant === "success") {
    handleSetData({ setName, setStatus, setUserImage, setMobileNumber });
          ToastAndroid.show('Profile Picture Updated', ToastAndroid.SHORT);
        }
      } catch (error) {
        ToastAndroid.show('Some error occurred', ToastAndroid.SHORT);
        console.log("Some error occurred while sending or setting the message" + error);
      }
    }
    
  };

  const commonUpdateFunction = async (requestData, type) => {
    try {
      let url = `${startUrl}/chattiApi/allCommon/profile/updateUserData`;
      // Retrieve the token from SecureStore
      let token = await SecureStore.getItemAsync('authToken');
      // Set the Authorization header for the request
      const response = await axios.post(
        url,
        { ...requestData, type },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );
      let myRes = response.data;
      if (myRes.variant === 'success') {
        ToastAndroid.show(myRes.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('some error occurred ', ToastAndroid.SHORT);
      console.log('Some error occurred while sending or setting the message' + error);
    }
  };
  
  const handleNameChange = async () => {
    await commonUpdateFunction({ name }, 'name');
  };
  
  const handleStatusChange = async () => {
    await commonUpdateFunction({ status }, 'status');
  };

  
  

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: ContentContext.mainBg }} style={styles.imageBG}>
        <TouchableOpacity onPress={handleImageChange} style={styles.imageContainer}>
          <Image source={{ uri: userImage }} style={styles.userImage} />
          <View style={styles.iconContainer} >
          <MaterialIcons name="add-a-photo" size={24} color="white"  style={styles.cameraIcon} />
          </View>
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Name</Text>
          {isEditingName ? (
            <View style={styles.editContainer}>
              <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
              />
              <Button title="Save" onPress={() => {setIsEditingName(false),handleNameChange()}} />
            </View>
          ) : (
            <View style={styles.editContainer}>
              <Text>{name}</Text>
              <Button title="Edit" onPress={() => setIsEditingName(true)} />
            </View>
          )}
          <Text style={styles.label}>Status</Text>
          {isEditingStatus ? (
            <View style={styles.editContainer}>
              <TextInput
              multiline={true}
              numberOfLines={10}
                style={styles.input}
                onChangeText={setStatus}
                value={status}
              />
              <Button title="Save" onPress={() => {setIsEditingStatus(false),handleStatusChange()}} />
            </View>
          ) : (
            <View style={styles.editContainer}>
              <Text>{status}</Text>
              <Button title="Edit" onPress={() => setIsEditingStatus(true)} />
            </View>
          )}
          <Text style={styles.label}>Mobile Number</Text>
          <Text style={styles.nonEditableLabel}>{mobileNumber}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBG: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    marginTop: 25,
    marginBottom: 20,
    alignItems: 'center',
  },
  userImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  cameraIcon: {
    position: 'absolute',
  },
  infoContainer: {
    width: '80%',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    height: 40,
    width:'80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
    paddingLeft: 10,
    
  },
  editContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nonEditableLabel: {
    fontSize: 18,
    marginTop: 10,
    color: 'gray',
  },
  iconContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'green',
    borderRadius: 24,
    width: 32,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
