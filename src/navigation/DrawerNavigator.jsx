import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "../screens/app/HomeScreen";
import OrderListScreen from "../screens/app/OrderListScreen";
import ProfileScreen from "../screens/app/ProfileScreen";
import WishlistScreen from "../screens/app/WishlistScreen";
import AddToCartScreen from "../screens/app/CartScreen";
import Icon from "react-native-vector-icons/Ionicons";
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator
    screenOptions={{
      drawerActiveTintColor: "tomato",
      drawerInactiveTintColor: "gray",
      drawerLabelStyle: { fontSize: 15 },
    }}
  >
    <Drawer.Screen
      name="HomeDrawer"
      component={HomeScreen}
      options={{
        drawerIcon: ({ color, size }) => (
          <Icon name="home-outline" color={color} size={size} />
        ),
        drawerLabel: "Home",
      }}
    />
    <Drawer.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        drawerIcon: ({ color, size }) => (
          <Icon name="person-outline" color={color} size={size} />
        ),
      }}
    />
    <Drawer.Screen
      name="OrderList"
      component={OrderListScreen}
      options={{
        drawerIcon: ({ color, size }) => (
          <Icon name="list-outline" color={color} size={size} />
        ),
      }}
    />
    <Drawer.Screen
      name="Wishlist"
      component={WishlistScreen}
      options={{
        drawerIcon: ({ color, size }) => (
          <Icon name="heart-outline" color={color} size={size} />
        ),
      }}
    />
    <Drawer.Screen
      name="Cart"
      component={AddToCartScreen}
      options={{
        drawerIcon: ({ color, size }) => (
          <Icon name="cart-outline" color={color} size={size} />
        ),
      }}
    />
  </Drawer.Navigator>
);

export default DrawerNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
