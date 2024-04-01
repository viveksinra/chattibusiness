import 'intl-pluralrules';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './src/navigation';
import { AppContextProvider } from './context/appContext';
import 'react-native-gesture-handler';

import i18n from './src/lan/i18n'
export default function App() {
  return (
    <View style={styles.container}>
    <AppContextProvider>

      <Navigator />
      </AppContextProvider>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
