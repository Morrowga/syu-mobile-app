import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigator from './BottomNavigator';
import ProductListScreen from '../screens/app/ProductListScreen';
import OrderInfoScreen from '../screens/app/OrderInfoScreen';
import NotificationsScreen from '../screens/app/NotificationsScreen';
import CartProductListScreen from '../screens/app/CartProductListScreen';
import OrderCategoryDetailScreen from '../screens/app/OrderCategoryDetailScreen';
import CheckoutScreen from '../screens/app/CheckoutScreen';
import OrderConfirmScreen from '../screens/app/OrderConfirmScreen';
import ShippingAddressScreen from '../screens/app/ShippingAddressScreen';
import SuccessScreen from '../screens/app/SuccessScreen';
import MainStyles from '../components/styles/MainStyle';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: MainStyles.titleFont,
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
      <Stack.Screen
        name="Order Category Detail"
        component={OrderCategoryDetailScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Make Payment"
        component={OrderConfirmScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Address Confirmation"
        component={ShippingAddressScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Success Screen"
        component={SuccessScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const AppStackWrapper = () => {
  return (
      <AppStack />
  );
};

export default AppStackWrapper;
