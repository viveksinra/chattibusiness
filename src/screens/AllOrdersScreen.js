import React, { useContext, useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, ImageBackground, ToastAndroid, TouchableOpacity, Text } from 'react-native';
import OrderListItem from '../components/OrderHistoryItem/index';
import { useTranslation } from 'react-i18next';
import ContentContext, { startUrl } from '../Context/ContentContext';
import GeneralLoading from '../components/General/GeneralLoading';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import NoOrderHistory from '../components/OrderHistoryItem/NoOrderHistory';

const image = { uri: ContentContext.orderHisBag };

const AllOrdersScreen = () => {
  const [loading, setLoading] = useState(false);
  const [newOrders, setNewOrders] = useState([]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [selectedTab, setSelectedTab] = useState('new'); // Default to 'New'

  const { t } = useTranslation();

  const updateOrderHis = async () => {
    setLoading(true);
    try {
      let url = `${startUrl}/chattiApi/allCommon/order/get/allOrder/${selectedTab}`;
      let token = await SecureStore.getItemAsync('authToken');
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );
      let myRes = response.data;
      if (myRes.variant === 'success') {
        if (selectedTab === "accepted") {
          setAcceptedOrders(myRes.data);
        } else if (selectedTab === "cancelled") {
          setCancelledOrders(myRes.data);
        } else {
          setNewOrders(myRes.data);
        }
        ToastAndroid.show('Data Loaded.. ', ToastAndroid.SHORT);
      } else {
        // Show a more specific error message here if needed
        ToastAndroid.show('Some error occurred ', ToastAndroid.SHORT);
      }
    } catch (error) {
      // Show a more specific error message here if needed
      ToastAndroid.show('Some error occurred ', ToastAndroid.SHORT);
      console.log('Some error occurred while sending or setting the message' + error);
    }
    setLoading(false);
  };

  useEffect(() => {
    updateOrderHis();
  }, [selectedTab]); // Include selectedTab in the dependency array

  const renderTabs = () => {
    const tabs = [
      { id: 'accepted', label: 'Accepted' },
      { id: 'new', label: 'New' },
      { id: 'cancelled', label: 'Cancelled' }
    ];

    return tabs.map(tab => (
      <TouchableOpacity
        key={tab.id}
        style={[styles.tab, selectedTab === tab.id && styles.selectedTab]}
        onPress={() => setSelectedTab(tab.id)}
      >
        <Text style={[styles.tabText, selectedTab === tab.id && styles.selectedTabText ]}>{tab.label}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <ImageBackground source={image} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.tabsContainer}>
          {renderTabs()}
        </View>
        {(selectedTab === 'new' && newOrders.length === 0) ||
         (selectedTab === 'accepted' && acceptedOrders.length === 0) ||
         (selectedTab === 'cancelled' && cancelledOrders.length === 0) ? (
          <NoOrderHistory />
        ) : (
          <FlatList
            data={selectedTab === 'new' ? newOrders : selectedTab === 'accepted' ? acceptedOrders : cancelledOrders}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <OrderListItem order={item} />}
          />
        )}
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
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tab: {
    padding: 10,
    borderRadius: 5,
  },
  selectedTab: {
    backgroundColor: 'green',
  },
  tabText: {
    fontWeight: 'bold',
  },
  selectedTabText: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default AllOrdersScreen;
