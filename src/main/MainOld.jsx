// Navigation.jsx

import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/guest/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "../components/SplashScreen";

const Stack = createStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
