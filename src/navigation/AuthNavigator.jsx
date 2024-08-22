import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/guest/LoginScreen";
import OtpScreen from "../screens/guest/OtpScreen";
import { useSelector } from "react-redux";
import { View } from "native-base";
import { StyleSheet } from "react-native";
import LoadingOverlay from "../components/LoadingOverLay";

const Stack = createStackNavigator();
const AuthStack = () => {
  const { isApiRun } = useSelector((state) => state.auth);

  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTP"
          component={OtpScreen}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
      {isApiRun && (
        <LoadingOverlay />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
export default AuthStack;
