import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import Main from './src/main/Main';
import { useFonts } from 'expo-font';
import { NetworkStatusProvider } from './src/contexts/NetworkStatusProvider';
import { Asset } from 'expo-asset';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Overpass': require('./assets/fonts/Overpass-Regular.ttf'),
    'MatemasieRegular': Asset.fromModule(require('./assets/fonts/Matemasie-Regular.ttf')).uri,
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
