// Navigation.jsx

import { useEffect } from "react";
import { NativeBaseProvider } from "native-base";

import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "../components/SplashScreen";
import AppStack from "../navigation/AppNavigator";
import AuthStack from "../navigation/AuthNavigator";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../api/auth";
import { startLoading } from "../redux/slices/authSlice";

const Navigation = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const isAuth = auth.isAuth;
  const isLoading = auth.isLoading;
  useEffect(() => {
    dispatch(startLoading());
    setTimeout(() => {
      dispatch(getUserData());
    }, 2000);
  }, [dispatch]);

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
