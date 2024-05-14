import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/guest/LoginScreen";
import OtpScreen from "../screens/guest/OtpScreen";
import LoadingScreen from "../components/LoadingScreen";
import { useSelector } from "react-redux";
import { View } from "native-base";
import { ActivityIndicator, StyleSheet } from "react-native";

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
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
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
