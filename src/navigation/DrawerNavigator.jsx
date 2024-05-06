import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { StyleSheet, Text, View, Image } from "react-native";
import HomeScreen from "../screens/app/HomeScreen";
import WishlistScreen from "../screens/app/WishlistScreen";
import ProfileScreen from "../screens/app/ProfileScreen";
import OrderListScreen from "../screens/app/OrderListScreen";
import LoginScreen from "../screens/guest/LoginScreen";
import CartScreen from "../screens/app/CartScreen";
import Icon from "react-native-vector-icons/Ionicons";
import { Box, Button, IconButton } from "native-base";
import NotificationIcon from "../components/NotificationIcon";
import CustomizationScreen from "../screens/app/CustomizationScreen";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.container}>
          <Box style={styles.logoBox}>
            <Image
              source={require("../../assets/logo3.png")}
              style={{
                width: 50,
                height: 70,
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
        labelStyle={{ color: "gray" }}
        onPress={() => {}}
        icon={({ color, size }) => (
          <Icon name="log-out" color="gray" size={size} />
        )}
      />
    </DrawerContentScrollView>
  );
};
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={({ route }) => ({
        drawerActiveTintColor: "tomato",
        drawerInactiveTintColor: "gray",
        drawerLabelStyle: { fontSize: 15 },
      })}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
          headerRight: () => <NotificationIcon notificationCount={5} />,
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
        name="Orders"
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
        component={CartScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="cart-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Customization"
        component={CustomizationScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="cog-outline" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
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
