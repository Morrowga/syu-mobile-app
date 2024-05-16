import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Adjust based on your preferred icon set
import FeedsScreen from "../screens/app/FeedsScreen";
import CartScreen from "../screens/app/CartScreen";
import DrawerNavigator from "./DrawerNavigator";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const theme = useSelector((state) => state.theme);
  return (
    <Tab.Navigator
      initialRouteName="Menu"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Menu") {
            iconName = focused ? "menu" : "menu-outline";
          } else if (route.name === "Feeds") {
            iconName = focused ? "newspaper" : "newspaper-outline";
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerShown: true,
      })}
    >
      <Tab.Screen
        name="Menu"
        component={DrawerNavigator}
        options={() => ({
          headerShown: false,
        })}
      />
      <Tab.Screen name="Feeds" component={FeedsScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
