import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import Main from './src/main/Main';
import { useFonts } from 'expo-font';
import { NetworkStatusProvider } from './src/contexts/NetworkStatusProvider';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { checkToken, logout } from './src/api/auth';
import storage from './src/storage/storage';

export default function App() {
  const [fontsLoaded] = useFonts({
    'BonaNova': require('./assets/fonts/BonaNovaSC-Regular.ttf'),
    'BonaNovaBold': require('./assets/fonts/BonaNovaSC-Bold.ttf'),
    'Overpass': require('./assets/fonts/Overpass-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NetworkStatusProvider>
        <Main />
      </NetworkStatusProvider>
    </Provider>
  );
}
