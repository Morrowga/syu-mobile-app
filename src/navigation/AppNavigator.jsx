import { createStackNavigator } from "@react-navigation/stack";
import BottomNavigator from "./BottomNavigator";
const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
    </Stack.Navigator>
  );
};
export default AppStack;
