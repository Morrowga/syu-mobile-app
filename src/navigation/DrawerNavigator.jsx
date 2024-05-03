import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { StyleSheet, Text, View, Image } from "react-native";
import HomeScreen from "../screens/app/HomeScreen";
import Icon from "react-native-vector-icons/Ionicons"; // Adjust based on your preferred icon set
import { Box, Divider } from "native-base";

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

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View>
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
            <Text style={styles.logoText}>SYU MOBILE</Text>
          </Box>
        </View>
      </View>
      <Divider />
      <DrawerItemList {...props} />
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
        name="Dashboard"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
          drawerLabel: "Dashboard",
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
    paddingHorizontal: 10,
  },
  logoBox: { flexDirection: "row", alignItems: "center", paddingTop: 10 },
  logoText: {
    paddingBottom: 15,
    paddingLeft: 10,
  },
});
