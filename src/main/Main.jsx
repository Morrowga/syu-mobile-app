// Navigation.jsx

import { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider } from 'native-base';

import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "../components/SplashScreen";
import AppStack from "../navigation/AppNavigator";
import AuthStack from "../navigation/AuthNavigator";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "../redux/slices/authSlice";

const Stack = createStackNavigator();

const Navigation = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const isAuth = auth.isAuth;
  const isLoading = auth.isLoading;
  useEffect(() => {
    dispatch(getAuth());
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        {isAuth ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default Navigation;
