import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Adjust based on your preferred icon set
import HomeScreen from "../screens/app/HomeScreen";
import NewFeedScreen from "../screens/app/NewFeed";
import AddToCartScreen from "../screens/app/AddToCartScreen";

const Tab = createBottomTabNavigator();

const BottomNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Home") {
          iconName = focused ? "home" : "home-outline";
        } else if (route.name === "NewFeed") {
          iconName = focused ? "newspaper" : "newspaper-outline";
        } else if (route.name === "AddToCart") {
          iconName = focused ? "cart" : "cart-outline";
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      headerShown: false,
    })}
    tabBarOptions={{
      activeTintColor: "tomato",
      inactiveTintColor: "gray",
    }}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="NewFeed" component={NewFeedScreen} />
    <Tab.Screen name="AddToCart" component={AddToCartScreen} />
  </Tab.Navigator>
);

export default BottomNavigator;
