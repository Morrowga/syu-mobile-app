// Navigation.jsx

import { useEffect, useCallback } from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import LoadingScreen from "../components/LoadingScreen";
import AppStack from "../navigation/AppNavigator";
import AuthStack from "../navigation/AuthNavigator";
import NoInternetScreen from "../screens/NoInternetScreen"; // Import the NoInternetScreen
import { useDispatch, useSelector } from "react-redux";
import { getUserData, validateToken } from "../api/auth";
import { startLoading } from "../redux/slices/authSlice";
import { getThemeData } from "../api/theme";
import { useNetworkStatus } from "../contexts/NetworkStatusProvider";

const Navigation = () => {
  const isConnected = useNetworkStatus();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const isAuth = auth.isAuth;
  const isLoading = auth.isLoading;
  const theme = useSelector((state) => state.theme);
  // const navigationTheme = {
  //   dark: false,
  //   colors: {
  //     primary: theme.app_bg_color,
  //     background: theme.app_bg_color,
  //     card: theme.app_bg_color,
  //     text: theme.app_text_color,
  //     border: "rgb(199, 199, 204)",
  //     notification: "rgb(255, 69, 58)",
  //   },
  // };

  useEffect(() => {
    dispatch(startLoading());
    dispatch(getThemeData());
    dispatch(getUserData());
  }, [dispatch]);

  const handleRetry = useCallback(() => {
    dispatch(startLoading());
    dispatch(getThemeData());
    dispatch(getUserData());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isConnected) {
    return <NoInternetScreen onRetry={handleRetry} />;
  }
  return (
    <NativeBaseProvider>
    <NavigationContainer>
      {isAuth ? (
          <AppStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  </NativeBaseProvider>
  );
};

export default Navigation;
