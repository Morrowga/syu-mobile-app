import "react-native-gesture-handler";
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { StyleSheet, Text, View } from "react-native";
import SplashScreen from './src/screens/SplashScreen';

export default function App() {
  return (
    <Provider store={store}>
      <SplashScreen />
    </Provider>
  );
}
