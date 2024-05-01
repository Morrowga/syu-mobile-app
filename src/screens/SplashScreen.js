// CustomSplashScreen.js
import React, { useEffect } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/store'; 

const SplashScreen = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.loading.isLoading);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setLoading(false));
    }, 3000); 

    return () => clearTimeout(timer);
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.splash}>
        <Text style={styles.textStyle}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.body}>
        <Text style={styles.textStyle}>Open up App.js to start working on your app!</Text>
    </View>
  );
};

export default SplashScreen;


const styles = StyleSheet.create({
    body: 
    {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
    },
    splash: 
    {
        backgroundColor: "#000",
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center' 
    },
    textStyle: 
    {
        color: '#fff',
    }
});
