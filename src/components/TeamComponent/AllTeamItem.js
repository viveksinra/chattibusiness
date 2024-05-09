import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons
import { useNavigation } from '@react-navigation/native';
import CallMsgButton from './../General/CallMsgButton';
import ChangeRoleButoon from './ChangeRoleButton';

const AllTeamItem = ({ team,fetchData,roleId }) => {
  const navigation = useNavigation();
  function handleOneOrder() {
    // navigation.navigate('OneOrderScreen', { userId: team._id });
  }
  return (
    <TouchableOpacity key={team._id} style={styles.container} onPress={handleOneOrder}>
      <Image source={{ uri: team.userImage }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.date}>Date: {team.date}</Text>
        <Text style={styles.teamName}>Name: {team.name}</Text>
        <Text style={styles.mobile}>Mobile: {team.mobileNumber}</Text>
        {/* <Text style={styles.status}>Status: {team.status}</Text> */}
        <View style={styles.totalContainer}>
          <Text style={styles.calculation}>Role: {team.role.label}</Text>
          {(roleId && (roleId === "admin" || roleId === "core")) &&(<ChangeRoleButoon team={team} fetchData={fetchData}/>)}
          {/* <Text style={styles.total}>: ₹{totalAmount.toFixed(2)}</Text> */}
        </View>
        <CallMsgButton mobileNumber={team.mobileNumber}/>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  calculation: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  status: {
    fontSize: 16,
    color: '#020275',
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
    color: '#6e7502',
    marginBottom: 5,
  },
  
});

export default AllTeamItem;
