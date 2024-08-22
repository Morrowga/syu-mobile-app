import React from "react";
import { View, ActivityIndicator, StyleSheet, StatusBar } from "react-native";

const LoadingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingScreen;
