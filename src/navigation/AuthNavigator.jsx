import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/guest/LoginScreen";
import OtpScreen from "../screens/guest/OtpScreen";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Otp"
          component={OtpScreen}
          options={{ headerShown: false }}
        />
    </Stack.Navigator>
    
  );
};
export default AuthStack;
