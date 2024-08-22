// LoadingOverlay.js
import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import MainStyles from './styles/MainStyle';

const LoadingOverlay = () => {
  return (
    <View style={styles.overlay}>
      <Image
        source={require('../../assets/SYU.png')}
        style={styles.image}
      />
      <Text style={{...styles.loadingText, ...MainStyles.titleFont}}>
        Loading...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 1)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 100,
      height: 100,
      marginBottom: 20,
    },
    loadingText: {
      marginTop: 10,
      color: '#fff',
      fontSize: 18,
      flexDirection: 'row',
    },
    loadingDots: {
      fontSize: 18,
      color: '#fff',
    },
  });

export default LoadingOverlay;
