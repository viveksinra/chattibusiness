import React, { useContext, useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, ImageBackground, ToastAndroid, TouchableOpacity, Text, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import ContentContext, { startUrl } from '../Context/ContentContext';
import GeneralLoading from '../components/General/GeneralLoading';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import NoOrderHistory from '../components/OrderHistoryItem/NoOrderHistory';
import AllTeamItem from '../components/TeamComponent/AllTeamItem';
import NoTeam from '../components/TeamComponent/NoTeam';

const image = { uri: ContentContext.orderHisBag };

const AllTeamScreen = () => {
  const [loading, setLoading] = useState(false);
  const [coreTeam, setCoreTeam] = useState([]);
  const [businessTeam, setBusinessTeam] = useState([]);
  const [operativeTeam, setOperativeTeam] = useState([]);
  const [collaboratorTeam, setCollaboratorTeam] = useState([]);
  const [userTeam, setUserTeam] = useState([]);
  const [selectedTab, setSelectedTab] = useState('user'); // Default to 'user'

  const { t } = useTranslation();

  const fetchData = async (tab) => {
    setLoading(true);
    try {
      let url = `${startUrl}/chattiApi/allCommon/allTeam/getByRole/${tab}`;
      let token = await SecureStore.getItemAsync('authToken');
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      let myRes = response.data;
      if (myRes.variant === 'success') {
        switch (tab) {
          case 'user':
            setUserTeam(myRes.data);
            break;
          case 'core':
            setCoreTeam(myRes.data);
            break;
          case 'business':
            setBusinessTeam(myRes.data);
            break;
          case 'operative':
            setOperativeTeam(myRes.data);
            break;
          case 'collaborator':
            setCollaboratorTeam(myRes.data);
            break;
          default:
            setUserTeam(myRes.data);
            break;
        }
        ToastAndroid.show('Data Loaded.. ', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Some error occurred ', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Some error occurred ', ToastAndroid.SHORT);
      console.log('Some error occurred while sending or setting the message' + error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(selectedTab);
  }, [selectedTab]);

  const renderTabs = () => {
    const tabs = [
      { id: 'user', label: 'User' },
      { id: 'collaborator', label: 'Collaborator' },
      { id: 'operative', label: 'Operative' },
      { id: 'business', label: 'Business' },
      { id: 'core', label: 'Core' },
      { id: 'admin', label: 'Admin' },
    ];

    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, selectedTab === tab.id && styles.selectedTab]}
            onPress={() => setSelectedTab(tab.id)}
          >
            <Text style={[styles.tabText, selectedTab === tab.id && styles.selectedTabText]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderTeamList = () => {
    switch (selectedTab) {
      case 'user':
        return userTeam.length === 0 ? <NoTeam updateAllTeam={() => fetchData(selectedTab)} /> : <FlatList data={userTeam} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => <AllTeamItem team={item} fetchData={fetchData} />} />;
      case 'core':
        return coreTeam.length === 0 ? <NoTeam updateAllTeam={() => fetchData(selectedTab)} /> : <FlatList data={coreTeam} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => <AllTeamItem team={item} fetchData={fetchData} />} />;
      case 'collaborator':
        return collaboratorTeam.length === 0 ? <NoTeam updateAllTeam={() => fetchData(selectedTab)} /> : <FlatList data={collaboratorTeam} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => <AllTeamItem team={item} fetchData={fetchData} />} />;
      case 'operative':
        return operativeTeam.length === 0 ? <NoTeam updateAllTeam={() => fetchData(selectedTab)} /> : <FlatList data={operativeTeam} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => <AllTeamItem team={item} fetchData={fetchData} />} />;
      case 'business':
        return businessTeam.length === 0 ? <NoTeam updateAllTeam={() => fetchData(selectedTab)} /> : <FlatList data={businessTeam} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => <AllTeamItem team={item} fetchData={fetchData} />} />;
      default:
        return null;
    }
  };

  return (
    <ImageBackground source={image} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.tabsContainer}>{renderTabs()}</View>
        {renderTeamList()}
        <GeneralLoading loading={loading} loadingText={'Updating Order History'} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tab: {
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  selectedTab: {
    backgroundColor: '#086096',
  },
  tabText: {
    fontWeight: 'bold',
  },
  selectedTabText: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default AllTeamScreen;
