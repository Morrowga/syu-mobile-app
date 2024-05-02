import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/guest/LoginScreen";
const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};
export default AuthStack;
