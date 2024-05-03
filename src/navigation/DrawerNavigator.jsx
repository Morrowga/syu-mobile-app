import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "../screens/app/HomeScreen";
import Icon from "react-native-vector-icons/Ionicons"; // Adjust based on your preferred icon set
const Drawer = createDrawerNavigator();

const ProfileScreen = () => (
  <View style={styles.container}>
    <Text>Profile Screen</Text>
  </View>
);
const OrderListScreen = () => (
  <View style={styles.container}>
    <Text>Order List Screen</Text>
  </View>
);
const WishlistScreen = () => (
  <View style={styles.container}>
    <Text>Wishlist Screen</Text>
  </View>
);
const AddToCartScreen = () => (
  <View style={styles.container}>
    <Text>AddToCart Screen</Text>
  </View>
);

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
      name="AddToCart"
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
