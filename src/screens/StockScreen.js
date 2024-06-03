import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { FontAwesome } from '@expo/vector-icons';
import ContentContext, { startUrl } from '../Context/ContentContext';
import TermPopup from '../authentication/authComponent/MobileLogin/TermPopup';
import GeneralLoading from '../components/General/GeneralLoading';
import StockData from '../components/Stock/StockData';
import SellDataTab from '../components/Stock/SellDataTab';

const image = { uri: ContentContext.mainBg };

const StockScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [allStock, setAllStock] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState('stockData');

  const getStock = async () => {
    setLoading(true);
    const url = `${startUrl}/chattiApi/allCommon/stock/getall`;
    const token = await SecureStore.getItemAsync('authToken');

    try {
      const response = await axios.get(url, {
        headers: { Authorization: token },
      });
      if (response.data.variant === "success") {
        setAllStock(response.data.data);
      } else {
        alert("Failed to connect to server, check your internet connection");
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      alert("Failed to fetch product data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStock();
  }, []);

  const handleRefresh = () => {
    getStock();
  };

  const renderTabs = () => {
    const tabs = [
      { id: 'stockData', label: t('Stock Data') },
      { id: 'sellData', label: t('Sell Data') },
    ];

    return tabs.map(tab => (
      <TouchableOpacity
        key={tab.id}
        style={[styles.tab, selectedTab === tab.id && styles.selectedTab]}
        onPress={() => setSelectedTab(tab.id)}
      >
        <Text style={[styles.tabText, selectedTab === tab.id && styles.selectedTabText]}>{tab.label}</Text>
      </TouchableOpacity>
    ));
  };

  const renderContent = () => {
    return selectedTab === 'stockData' ? (
      <>
          <Text style={styles.headerText}>
            Stock Data
            <Text style={styles.highlightText}> quality </Text>
         Wise  :-
            <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
            <FontAwesome name="refresh" size={24} color="green" />
            <Text> {t('refresh')}</Text>
          </TouchableOpacity>
          </Text>

    
      <StockData products={allStock} />

      </>
    ) : (
      <>
                <Text style={styles.headerText}>
            Sell Data
            <Text style={styles.highlightText}> quality </Text>
         Wise  :-
            <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
            <FontAwesome name="refresh" size={24} color="green" />
            <Text> {t('refresh')}</Text>
          </TouchableOpacity>
          </Text>
      <SellDataTab />

      </>
    );
  };

  return (
    <ScrollView>
      <GeneralLoading loading={loading} loadingText={t('Placing your Order')} />
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
      

          <View style={styles.tabContainer}>
            {renderTabs()}
          </View>

          <View style={styles.contentContainer}>
            {renderContent()}
          </View>

          <TermPopup />
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  headerText: {
    color: '#00BFFF',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 15,
  },
  highlightText: {
    color: '#34d399',
    fontWeight: 'bold',
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ddd',
    paddingVertical: 10,
  },
  tab: {
    padding: 10,
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
  },
  tabText: {
    fontSize: 16,
    color: 'black',
  },
  selectedTabText: {
    color: 'blue',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StockScreen;
