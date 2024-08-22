// NoInternetScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MainStyles from '../components/styles/MainStyle';
import Icon from "react-native-vector-icons/Ionicons";

const NoInternetScreen = ({ onRetry }) => {
  return (
    <View style={styles.container}>
    <Icon name="warning-outline" size={60} style={{color: '#f7c408'}} />
    <Text style={{...styles.text, ...MainStyles.normalFont, marginTop: 10}}>No Internet Connection</Text>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default NoInternetScreen;
