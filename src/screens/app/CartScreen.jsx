import { Alert, StyleSheet, TouchableOpacity } from "react-native";
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
  Divider,
  FlatList,
  Heading,
  Stack,
  Text,
  VStack,
  View,
} from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { deleteAllCartData, deleteCategory } from "../../redux/slices/cartSlice";
import { capitalize } from "../../helpers/general";
import MainStyles from "../../components/styles/MainStyle";

const CartScreen = () => {
  const { cartData } = useSelector((state) => state.cart);
  const cartCategories = useSelector(getCategoryFromState);
  const navigation = useNavigation();
  const totalQty = useSelector(selectTotalQuantity);
  const totalPrice = useSelector(selectTotalPrice);
  const { categories } = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  const goCartProductList = (category_id, category_name) => {
    navigation.navigate("Cart Product List", { category_id, category_name });
  };

  const handleDeleteCategory = (categoryId) => {
    dispatch(deleteCategory(categoryId));
  };

  const goCheckout = () => {
    let isValid = limitQty();
    if (isValid) {
      navigation.navigate("Address Confirmation");
    }
  };
  const renderItem = ({ item, index }) => (
    <Box>
      <Box
        key={index}
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
            style={{...MainStyles.flexRowBetween}}
            alignItems="center"
            space={2}
          >
            <Box>
              <Heading size="sm" style={{...MainStyles.titleFont}}>
                {capitalize(item.category_name)}
              </Heading>
              <Text style={{...MainStyles.normalFont, paddingTop: 4}}>
                {item.totalPrice} KS
              </Text>
            </Box>
            <Badge 
              // colorScheme="danger"
              variant="solid"
              // rounded="full"
              _text={{
                fontSize: 13,
              }}
              bg={'#000'}
              mx={1}
              // mb={5}
            >
              {item.qty}
            </Badge>
            <VStack>
            <Box>
              <TouchableOpacity
                onPress={() =>
                  goCartProductList(item.category_id, item.category_name)
                }
              >
                <Box style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <Text style={{...MainStyles.normalFont, color: '#044fc7', lineHeight: 30, fontSize: 13, paddingTop: 2}}>
                    ကြည့်မည်
                  </Text>
                </Box>
              </TouchableOpacity>
              <Box my={2}>
                <Divider />
              </Box>
              <TouchableOpacity
                onPress={() =>
                  handleDeleteCategory(item.category_id)
                }
              >
                <Box style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <Text style={{...MainStyles.normalFont, color: 'red', lineHeight: 30, fontSize: 13, paddingTop: 2}}>
                    ဖယ်မည်
                  </Text>
                </Box>
              </TouchableOpacity>
            </Box>
            </VStack>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );

  const renderEmptyComponent = () => (
    <View style={{...styles.emptyContainer, ...MainStyles.normalFont}}>
      <Text>No Items in your cart</Text>
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
        let message = `${capitalize(current_category.category_name)} အနည်းဆုံး ${limitation} ခုယူပေးရပါမည်။ \n`;
        error_message.push(message);
      }
    });
    if (error_message.length > 0) {
      const message = error_message.join("\n");
      Alert.alert("ပြန်လည်စစ်ဆေးရန် ! \n", message, [{ text: "OK" }]);
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
        contentContainerStyle={{ flexGrow: 1,
          padding: 10 }}
        ListEmptyComponent={renderEmptyComponent}
        keyExtractor={(item) => item.category_id}
      />
      {totalQty && totalQty != 0 ? (
        <View>
          <Box p={4} style={{...MainStyles.flexRowBetween}}>
            <Heading size="sm" style={{...MainStyles.normalFont,fontSize: 20, lineHeight: 30}}>Total ({totalQty})</Heading>
            <Text style={{...MainStyles.normalFont, fontSize: 20, lineHeight: 30}}>{totalPrice} Ks</Text>
          </Box>
          <Box
            p={4}
            style={{...MainStyles.flexRowBetween}}
            w="full"
          >
            <Button w="49%" bg={theme.app_button_color} rounded="full" onPress={goCheckout}>
                <Box style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <Box style={{marginTop: 3, marginRight: 4}}>
                    <Icon name="bag-check-outline" style={{color: '#fff'}} size={20} />
                  </Box>
                  <Text style={{...MainStyles.normalFont, color: '#fff', lineHeight: 30}}>အော်ဒါတင်မည်</Text>
                </Box>
            </Button>
            <Button
              w="49%"
              rounded="full"
              onPress={clearCart}
              background="red.500"
            >
              <Box style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <Box style={{marginTop: 3, marginRight: 4}}>
                    <Icon name="trash-outline" style={{color: '#fff'}} size={20} />
                  </Box>
                  <Text style={{...MainStyles.normalFont, color: '#fff', lineHeight: 30}}>အကုန်ဖယ်မည်</Text>
                  </Box>
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
    marginLeft: 5,
    marginRight: 5
  },
  cartCategoryList: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CartScreen;
