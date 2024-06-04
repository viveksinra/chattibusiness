import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import AddView from './AddView';
import SellForm from './SellForm';
import SellList from './SellList';
import { startUrl } from '../../Context/ContentContext';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

export default function SellDataTab({ products }) {
  const [sellListData, setSellListData] = useState({allSellData:[],overallData:{}});
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const getSellListData = async () => {
    setLoading(true);
    const url = `${startUrl}/chattiApi/allCommon/stockSell/getall`;

    try {
      // Retrieve the authorization token from SecureStore
      const token = await SecureStore.getItemAsync('authToken');

      // Make an API call to get the sell data from the server
      const response = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });

      if (response.data.variant === "success") {
        console.log("stock is getting loaded")
        setSellListData(response.data.data);
        console.log(response.data.data)

      } else {
        alert("Failed to connect to server, check your internet connection");
      }
    } catch (error) {
      console.error("Error fetching sell data:", error);
      alert("Failed to fetch sell data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSellListData();
  }, []);

  useEffect(() => {
    if (sellListData.length <= 0) {
      setIsAdding(true);
    }
  }, [sellListData]);

  return (
    <ScrollView style={{ backgroundColor: '#fff', width: "100%" }}>
      <SafeAreaView style={{ flex: 1, marginTop: 1, backgroundColor: '#fff' }}>
        <AddView
          title={"Sell Data"}
          isAdding={isAdding}
          setIsAdding={setIsAdding}
          addText={'New Sell'}
          viewText={'View Sell'}
        />
        {isAdding ? (
          products.length > 0 ? (<SellForm products={products} setIsAdding={setIsAdding} />) :  (<Text>No stock data</Text>)
        ) : (
          loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            sellListData ? (
              <SellList sellListData={sellListData} />
            ) : (
              <Text>No sale data</Text>
            )
          )
        )}
      </SafeAreaView>
    </ScrollView>
  );
}
