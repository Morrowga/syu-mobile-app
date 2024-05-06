import { createStackNavigator } from "@react-navigation/stack";
import BottomNavigator from "./BottomNavigator";
import ProductListScreen from "../screens/app/ProductListScreen";
import OrderInfoScreen from "../screens/app/OrderInfoScreen";
import NotificationsScreen from "../screens/app/NotificationsScreen";
import CartProductListScreen from "../screens/app/CartProductListScreen";

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
      <Stack.Screen
        name="Product List"
        component={ProductListScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Order Info"
        component={OrderInfoScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ headerShown: true }}
      />

      <Stack.Screen
        name="Cart Product List"
        component={CartProductListScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};
export default AppStack;
