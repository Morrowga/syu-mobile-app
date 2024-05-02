import "react-native-gesture-handler";
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { StyleSheet, Text, View } from "react-native";
import SplashScreen from './src/screens/SplashScreen';
import Navigation from './src/navigators/Navigation';

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
