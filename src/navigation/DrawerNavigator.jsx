import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { StyleSheet, View, Image } from "react-native";
import HomeScreen from "../screens/app/HomeScreen";
import WishlistScreen from "../screens/app/WishlistScreen";
import ProfileScreen from "../screens/app/ProfileScreen";
import OrderListScreen from "../screens/app/OrderListScreen";
import CartScreen from "../screens/app/CartScreen";
import Icon from "react-native-vector-icons/Ionicons";
import { Badge, Box, Heading } from "native-base";
import NotificationIcon from "../components/NotificationIcon";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../api/auth";
import MainStyles from "../components/styles/MainStyle";
import AdScreen from '../screens/app/AdScreen';
import { MaterialIcons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

const getThemeData = () => {
  const theme = useSelector((state) => state.theme);
  return theme;
};



const getNotifications = () => {
  const {notifications, isLoading, isError} = useSelector((state) => state.notification);
  return notifications;
};

const getWishlists = () => {
  const {wishlists} = useSelector((state) => state.wishlist);
  return wishlists;
}




const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.container}>
          <Box style={styles.logoBox}>
            <Image
              source={{ uri: getThemeData()?.app_logo_img }}
              style={{
                width: 200,
                height: 120,
                resizeMode: "contain",
                marginBottom: 20,
              }}
            />
          </Box>
        </View>
      </View>

      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        labelStyle={[{ color: "gray" }, MainStyles.titleFont]}
        onPress={() => handleLogout()}
        icon={({ color, size }) => (
          <Icon name="power-outline" color="gray" size={size} />
        )}
      />
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <>
      <Drawer.Navigator
        drawerContent={CustomDrawerContent}
        screenOptions={({ route }) => ({
          headerTintColor: '#1e5781',
          drawerActiveTintColor: "#1e5781",
          drawerInactiveTintColor: "gray",
          drawerLabelStyle: { 
            fontSize: 15,
            ...MainStyles.titleFont
          },
        })}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon name="home-outline" color={color} size={size} />
            ),
            headerTitle: () => <Heading style={[MainStyles.titleFont, MainStyles.textShadow]} textTransform='capitalize'>Home</Heading>,
            headerRight: () => (
              <NotificationIcon
                notificationCount={getNotifications()?.length}
                color={getThemeData()?.app_text_color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerTitle: () => <Heading style={[MainStyles.titleFont , MainStyles.textShadow]} textTransform='capitalize'>Profile</Heading>,
            drawerIcon: ({ color, size }) => (
              <Icon name="person-outline" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Orders"
          component={OrderListScreen}
          options={{
            headerTitle: () => <Heading style={[MainStyles.titleFont, MainStyles.textShadow]} textTransform='capitalize'>Orders</Heading>,
            drawerIcon: ({ color, size }) => (
              <Icon name="list-outline" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Wishlist"
          component={WishlistScreen}
          options={{
            headerTitle: () => 
              <Heading style={[MainStyles.titleFont, MainStyles.textShadow]} textTransform='capitalize'>
                Wishlist
              </Heading>,
            drawerIcon: ({ color, size }) => (
              <Icon name="heart-outline" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Cart"
          component={CartScreen}
          options={{
            headerTitle: () => <Heading style={[MainStyles.titleFont, MainStyles.textShadow]} textTransform='capitalize'>Cart</Heading>,
            drawerIcon: ({ color, size }) => (
              <Icon name="cart-outline" color={color} size={size} />
            ),
          }}
        />
         <Drawer.Screen
          name="Watch Ad"
          component={AdScreen}
          options={{
            headerTitle: () => <Heading style={[MainStyles.titleFont, MainStyles.textShadow]} textTransform='capitalize'>Watch Ad</Heading>,
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="slideshow" color={color} size={size} />
            ),
          }}
        />
      </Drawer.Navigator>
    </>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  drawerContent: {
    width: "auto",
    height: 100,
  },
  logoBox: { flexDirection: "row", alignItems: "center", paddingTop: 10 },
  logoText: {
    paddingBottom: 15,
    paddingLeft: 10,
  },
});
