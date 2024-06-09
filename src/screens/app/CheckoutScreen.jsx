import { StyleSheet } from "react-native";
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
  HStack,
  Heading,
  IconButton,
  Stack,
  Text,
  VStack,
  View,
  Icon,
  Input,
  TextArea,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createOrder } from "../../api/order";
import { deleteAllCartData } from "../../redux/slices/cartSlice";
import PointModalBox from "../../components/PointModalBox";

const CheckoutScreen = () => {
  const dispatch = useDispatch();
  const cartCategories = useSelector(getCategoryFromState);
  const { cartData } = useSelector((state) => state.cart);
  const { points } = useSelector((state) => state.auth);
  const { isLoading, isError, error_message } = useSelector(
    (state) => state.order
  );

  const navigation = useNavigation();
  const totalQty = useSelector(selectTotalQuantity);
  const totalPrice = useSelector(selectTotalPrice);
  const [toggleNote, setToggleNote] = useState(false);
  const [note, setNote] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [totalPointPrice, setTotalPointPrice] = useState(totalPrice);
  const [isUsedPoints, setIsUsedPoints] = useState(false);
  const [usedPoints, setUsedPoints] = useState(0);

  const orderCartItems = cartData.map((cart) => {
    return {
      product_id: cart.id,
      size_id: cart.size,
      category_id: cart.category_id,
      quality_id: cart.quality,
      qty: cart.qty,
      total_price: cart.totalPrice,
    };
  });

  const toggleNoteFunc = () => {
    setToggleNote((toggle) => !toggle);
  };

  const cancelNote = () => {
    setNote("");
    setToggleNote(false);
  };

  const addNote = () => {
    setToggleNote(false);
  };
  const goCartProductList = (category_id, category_name) => {
    navigation.navigate("Cart Product List", { category_id, category_name });
  };
  const orderConfirm = async () => {
    const formData = {
      total_price: totalPrice,
      note: note,
      products: JSON.stringify(orderCartItems),
      used_points:usedPoints
    };

    await dispatch(createOrder(formData)).then((resp) => {
      const order_id = resp?.payload?.id;

      // navigation.navigate("Order Confirm Screen", { order_id: order_id });
      navigation.navigate("Success Screen", { order_id: order_id });
    });
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const userCancelPoints = () => {
    setIsUsedPoints(false);
    setIsOpen(false);
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

  const userUsedPoints = (used_points) => {
    if (used_points && used_points != 0) {
      setTotalPointPrice((totalPointPrice) => totalPointPrice - used_points);
      setUsedPoints(used_points);
      setIsUsedPoints(true);
    } else {
      setIsUsedPoints(false);
    }
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
          <Box px={4} pb={2}>
            <HStack alignItems="center">
              <TouchableOpacity onPress={toggleNoteFunc}>
                <View flexDirection="row" alignItems="center" paddingBottom={1}>
                  <Text>Note</Text>
                  <Icon as={Ionicons} name="pencil" size="sm" />
                </View>
              </TouchableOpacity>
            </HStack>
            {toggleNote ? (
              <Box>
                <TextArea
                  placeholder="Enter note..."
                  onChangeText={(value) => setNote(value)}
                  value={note}
                />
                <HStack space={2} marginY={2}>
                  <Button
                    size="sm"
                    backgroundColor="red.500"
                    onPress={cancelNote}
                  >
                    Cancel
                  </Button>
                  <Button size="sm" onPress={addNote}>
                    Add
                  </Button>
                </HStack>
              </Box>
            ) : (
              <View>
                <Text>{note}</Text>
              </View>
            )}
          </Box>

          <Box px={4} flexDirection="row" justifyContent="space-between">
            <Heading size="sm">Total Count ({totalQty})</Heading>
            <Text>{totalPrice} Ks</Text>
          </Box>

          <Box
            px={4}
            pt={2}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Heading size="sm">Your Points ({Number(points)})</Heading>
            <Button size="xs" width="20%" onPress={() => setIsOpen(true)}>
              Use
            </Button>
            <PointModalBox
              isOpen={isOpen}
              onClose={closeModal}
              points={points}
              onSubmit={userUsedPoints}
              onCancel={userCancelPoints}
            />
          </Box>

          {isUsedPoints ? (
            <Box px={4} pt={2} flexDirection="row" justifyContent="flex-end">
              <Text>
                {totalPointPrice} KS (- {usedPoints} points used)
              </Text>
            </Box>
          ) : (
            ""
          )}

          <Box p={4} flexDirection="row" justifyContent="center" w="full">
            <Button
              w="full"
              rounded="full"
              onPress={() => orderConfirm()}
              isLoading={isLoading}
            >
              Order Confirm
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

  noteSection: {
    padding: 20,
  },
});

export default CheckoutScreen;
