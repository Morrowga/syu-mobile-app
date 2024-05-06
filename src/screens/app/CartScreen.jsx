import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { getCategoryFromState } from "../../redux/selectors/cartSelectors";
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

  const goCartProductList = (category_id, category_name) => {
    navigation.navigate("Cart Product List", { category_id, category_name });
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
        data={cartCategories}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 10 }}
        ListEmptyComponent={renderEmptyComponent}
        keyExtractor={(item) => item.category_id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default CartScreen;
