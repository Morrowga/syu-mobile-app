import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/guest/LoginScreen";
import OtpScreen from "../screens/guest/OtpScreen";
import LoadingScreen from "../components/LoadingScreen";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();
const AuthStack = () => {
  const { isApiRun } = useSelector((state) => state.auth);

  return (
    <Stack.Navigator>
      {isApiRun ? (
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <>
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
        </>
      )}
    </Stack.Navigator>
  );
};
export default AuthStack;
