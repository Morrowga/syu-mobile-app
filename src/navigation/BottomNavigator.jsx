import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons"; // Adjust based on your preferred icon set
import FeedsScreen from "../screens/app/FeedsScreen";
import CartScreen from "../screens/app/CartScreen";
import DrawerNavigator from "./DrawerNavigator";
import { useSelector } from "react-redux";
import { Badge, Box, Heading } from "native-base";
import MainStyles from "../components/styles/MainStyle";
import { selectTotalQuantity } from "../redux/selectors/cartSelectors";
const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const theme = useSelector((state) => state.theme);
  const cartItemsCount = useSelector(selectTotalQuantity);

  return (
    <Tab.Navigator
      initialRouteName="Menu"
      screenOptions={({ route }) => ({
        headerTitle: () => <Heading style={[MainStyles.titleFont, MainStyles.textShadow]} textTransform='capitalize'>{route.name}</Heading>,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Menu") {
            iconName = focused ? "menu" : "menu-outline";
          } else if (route.name === "Feeds") {
            iconName = focused ? "newspaper" : "newspaper-outline";
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
          }
          return <>
            {(iconName === 'cart' || iconName === 'cart-outline') && cartItemsCount > 0 &&
              <Badge
                colorScheme="danger"
                rounded="full"
                mb={-5}
                mr={9}
                zIndex={1}
                variant="solid"
                alignSelf="flex-end"
                _text={{
                  fontSize: 12
                }}
              >
                {cartItemsCount}
              </Badge>
            }
          <Box>
            <Icon name={iconName} size={size} color={color} />
          </Box>
          </>;
        },
        tabBarActiveTintColor: "#1e5781",
        tabBarInactiveTintColor: "gray",
        headerShown: true,
      })}
    >
      <Tab.Screen
        name="Menu"
        component={DrawerNavigator}
        options={() => ({
          headerShown: false,
        })}
      />
      <Tab.Screen name="Feeds" component={FeedsScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
