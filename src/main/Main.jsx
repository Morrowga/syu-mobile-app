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
import { getThemeData } from "../api/theme";

const Navigation = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const isAuth = auth.isAuth;
  const isLoading = auth.isLoading;
  const theme = useSelector((state) => state.theme);

  const navigationTheme = {
    dark: false,
    colors: {
      primary: theme.app_bg_color,
      background: theme.app_bg_color,
      card: theme.app_bg_color,
      text: theme.app_text_color,
      border: "rgb(199, 199, 204)",
      notification: "rgb(255, 69, 58)",
    },
  };
  useEffect(() => {
    dispatch(startLoading());
    dispatch(getThemeData());
    setTimeout(() => {
      dispatch(getUserData());
    }, 2000);
  }, [dispatch]);

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <NativeBaseProvider>
      <NavigationContainer theme={navigationTheme}>
        {isAuth ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default Navigation;
