import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
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

const CartScreen = () => {
  const { cartData } = useSelector((state) => state.cart);
  const cartCategories = useSelector(getCategoryFromState);
  const navigation = useNavigation();
  const totalQty = useSelector(selectTotalQuantity);
  const totalPrice = useSelector(selectTotalPrice);

  const goCartProductList = (category_id, category_name) => {
    navigation.navigate("Cart Product List", { category_id, category_name });
  };
  const goCheckout = () => {
    navigation.navigate("Checkout");
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
          <Box p={4} flexDirection="row" justifyContent="center" w="full">
            <Button w="full" rounded="full" onPress={goCheckout}>
              Proceed To Checkout
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
