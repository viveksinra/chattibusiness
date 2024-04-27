import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ToastAndroid, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { startUrl } from '../../Context/ContentContext';


const ChangeRoleButton = ({team,fetchData}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState(team.role);
  const [allHead, setAllHead] = useState([]);
  const [selectedHead, setSelectedHead] = useState();


  const roles = [
    { label: 'Core', id: 'core' },
    { label: 'Business', id: 'business' },
    { label: 'Operative', id: 'operative' },
    { label: 'Collaborator', id: 'collaborator' },
    { label: 'User', id: 'user' },
  ];

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    if (role.id === 'business' || role.id === 'operative' || role.id === 'collaborator') {
      GetAndSetAllHead(role);
    } else {
      setAllHead([]);
    }
  };

  const GetAndSetAllHead = async (role) => {
    let end = "core"
    if(role.id == "operative"){
        end = "business"
    }else if(role.id == "collaborator"){
        end = "operative"
    }

    try {
      let url = `${startUrl}/chattiApi/allCommon/allTeam/getByRole/${end}`;
      let token = await SecureStore.getItemAsync('authToken');
      const response = await axios.get(
        url,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );
      let myRes = response.data;
      if (myRes.variant === 'success') {
        setAllHead(myRes.data);
        ToastAndroid.show('Data Loaded.. ', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Some error occurred ', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Some error occurred ', ToastAndroid.SHORT);
      console.log('Some error occurred while sending or setting the message' + error);
    }
  };
  const updateRoleApi = async () => {

    try {
      let url = `${startUrl}/chattiApi/allCommon/oneUser/updateRole/${team._id}`;
      let token = await SecureStore.getItemAsync('authToken');
      const response = await axios.post(
        url,
        {selectedHead,selectedRole},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );
      let myRes = response.data;
      if (myRes.variant === 'success') {
        fetchData()
        ToastAndroid.show('Updated.. ', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Some error occurred ', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Some error occurred ', ToastAndroid.SHORT);
      console.log('Some error occurred while sending or setting the message' + error);
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
        <Text style={styles.buttonText}>Change Role</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Select Role:</Text>
          <View style={styles.rolesContainer}>
            {roles.map((role) => (
              <TouchableOpacity
                key={role.id}
                onPress={() => handleRoleChange(role)}
                style={[
                  styles.roleButton,
                  selectedRole && selectedRole.id === role.id && styles.selectedRoleButton,
                ]}
              >
                <Text style={[styles.roleButtonText, selectedRole && selectedRole.id === role.id && styles.selectedRoleButtonText]}>{role.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {allHead && (
            <View style={styles.rolesContainer}>
              <Text style={styles.modalTitle}>Select Head:</Text>
              {allHead.map((head) => (
                <TouchableOpacity
                  key={head.id}
                  onPress={() => setSelectedHead(head)}
                  style={[
                    styles.roleButton,
                    selectedHead && selectedHead._id === head._id && styles.selectedRoleButton,
                  ]}
                >
                  <Text style={[styles.roleButtonText, selectedHead && selectedHead._id === head.id && styles.selectedRoleButtonText]}>{(head.name)? head.name:head.mobileNumber}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.updateButton,
                !selectedRole && { backgroundColor: 'lightgray' }, // Disable button if no role is selected
              ]}
              onPress={() => {
                if (selectedRole) {
                    updateRoleApi()
                }else{
                    Alert("Select a role")
                }
              }}
              disabled={!selectedRole} // Disable button if no role is selected
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'lightgray',
    borderRadius: 15,
    padding: 5,
  },
  closeButtonText: {
    fontSize: 18,
    color: 'black',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rolesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  roleButton: {
    backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  selectedRoleButton: {
    backgroundColor: 'blue',
  },
  roleButtonText: {
    fontSize: 16,
  },
  selectedRoleButtonText: {
    color: 'white',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  updateButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});

export default ChangeRoleButton;
