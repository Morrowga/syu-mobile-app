import { Alert, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryFromState,
  selectTotalPrice,
  selectTotalQuantity,
} from "../../redux/selectors/cartSelectors";
import {
  Badge,
  Box,
  Button,
  FlatList,
  Heading,
  Stack,
  Text,
  VStack,
  View,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { deleteAllCartData } from "../../redux/slices/cartSlice";

const CartScreen = () => {
  const { cartData } = useSelector((state) => state.cart);
  const cartCategories = useSelector(getCategoryFromState);
  const navigation = useNavigation();
  const totalQty = useSelector(selectTotalQuantity);
  const totalPrice = useSelector(selectTotalPrice);
  const { categories } = useSelector((state) => state.feed);
  const dispatch = useDispatch();

  const goCartProductList = (category_id, category_name) => {
    navigation.navigate("Cart Product List", { category_id, category_name });
  };
  const goCheckout = () => {
    let isValid = limitQty();
    if (isValid) {
      navigation.navigate("Shipping Address Screen");
    }
  };
  const renderItem = ({ item }) => (
    <Box
      key={item}
      flex={1}
      width="100%"
      mt={3}
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
      _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700",
      }}
      _web={{
        shadow: 2,
        borderWidth: 0,
      }}
      _light={{
        backgroundColor: "gray.50",
      }}
    >
      <Stack p="4" space={3}>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          space={2}
        >
          <Heading size="sm">
            {item.category_name} ({item.totalPrice}) KS
          </Heading>
          <VStack>
            <Badge // bg="red.400"
              colorScheme="danger"
              rounded="full"
              mb={-4}
              mr={-4}
              zIndex={1}
              variant="solid"
              alignSelf="flex-end"
              _text={{
                fontSize: 12,
              }}
            >
              {item.qty}
            </Badge>
            <Button
              mx={{
                base: "auto",
                md: 0,
              }}
              p="2"
              bg="cyan.500"
              _text={{
                fontSize: 14,
              }}
              onPress={() =>
                goCartProductList(item.category_id, item.category_name)
              }
            >
              View Detail
            </Button>
          </VStack>
        </Stack>
      </Stack>
    </Box>
  );

  const renderEmptyComponent = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>No data available</Text>
    </View>
  );

  const clearCart = () => {
    dispatch(deleteAllCartData());
  };

  const limitQty = () => {
    let category_ids = cartCategories.map((cart) => cart.category_id);
    let error_message = [];
    category_ids.forEach((category_id) => {
      let limitation = categories.find(
        (category) => category.id == category_id
      )?.limitation;
      let current_category = cartCategories.find(
        (cart) => cart.category_id == category_id
      );
      if (current_category.qty < limitation) {
        let message = `${current_category.category_name} need to add at least ${limitation} pcs \n`;
        error_message.push(message);
      }
    });
    if (error_message.length > 0) {
      const message = error_message.join("\n");
      Alert.alert("Alert", message, [{ text: "OK" }]);
      return false;
    }
    return true;
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.cartCategoryList}
        data={cartCategories}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 10 }}
        ListEmptyComponent={renderEmptyComponent}
        keyExtractor={(item) => item.category_id}
      />
      {totalQty && totalQty != 0 ? (
        <View>
          <Box p={4} flexDirection="row" justifyContent="space-between">
            <Heading size="sm">Total Count ({totalQty})</Heading>
            <Text>{totalPrice} Ks</Text>
          </Box>
          <Box
            p={4}
            flexDirection="row"
            justifyContent="space-between"
            w="full"
          >
            <Button w="50%" rounded="full" onPress={goCheckout}>
              Proceed To Checkout
            </Button>
            <Button
              w="45%"
              rounded="full"
              onPress={clearCart}
              background="red.500"
            >
              Clear Cart
            </Button>
          </Box>
        </View>
      ) : (
        ""
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cartCategoryList: {
    flex: 1,
  },
});
export default CartScreen;
