import { StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { getCategoryFromState } from "../../redux/selectors/cartSelectors";
import { Box, Button, FlatList, Heading, Stack, Text, View } from "native-base";

const CartScreen = () => {
  const { cartData } = useSelector((state) => state.cart);
  const cartCategories = useSelector(getCategoryFromState);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => {}}>
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
            <Heading size="md">
              {item.category_name} ({item.qty})
            </Heading>
            <Button>View Detail</Button>
          </Stack>
        </Stack>
      </Box>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartCategories}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 10 }}
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
