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
  Stack,
  Text,
  View,
  TextArea,
  Divider,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createOrder } from "../../api/order";
import { deleteAllCartData } from "../../redux/slices/cartSlice";
import PointModalBox from "../../components/PointModalBox";
import { capitalize } from "../../helpers/general";
import MainStyles from "../../components/styles/MainStyle";
import Icon from "react-native-vector-icons/Ionicons";
import OrderConfirmModalBox from "../../components/OrderConfirmModalBox";

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
  const [isOpenOrderModal, setIsOpenOrderModal] = useState(false);
  const [totalPointPrice, setTotalPointPrice] = useState(totalPrice);
  const [isUsedPoints, setIsUsedPoints] = useState(false);
  const [usedPoints, setUsedPoints] = useState(0);
  const theme = useSelector((state) => state.theme);
  const { outOfArea } = useSelector((state) => state.order);


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

  // const goCartProductList = (category_id, category_name) => {
  //   navigation.navigate("Cart Product List", { category_id, category_name });
  // };

  const orderModalConfirm = async () => {
    submitOrder('pp')
    // if(outOfArea?.name_en == 'Out Of Area or Gate') {submitOrder('pp')} else {setIsOpenOrderModal(true)}
  };

  // const orderConfirm = async (paymentType) => {
  //   submitOrder(paymentType);
  // }

  const submitOrder = async (paymentType) => {
    const formData = {
      total_price: totalPrice,
      note: note,
      payment_type: paymentType == 0 ? 'cod' : 'pp',
      products: JSON.stringify(orderCartItems),
      used_points:usedPoints
    };

    await dispatch(createOrder(formData)).then((resp) => {
      const order_id = resp?.payload?.id;

      dispatch(deleteAllCartData());

      paymentType == 0 ? navigation.navigate("Success Screen", { order_id: order_id }) : navigation.navigate("Make Payment", { order_id: order_id });
    });
  }

  const goToOrderHistories = () => {
    navigation.navigate("Orders")
  }

  const closeModal = () => {
    setIsOpen(false)
  };

  const closeOrderModal = () => {
    setIsOpenOrderModal(false)
  };

  const userCancelPoints = () => {
    setIsUsedPoints(false);
    setIsOpen(false);
    setUsedPoints(0);
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
          style={{...MainStyles.flexRowBetween}}
          alignItems="center"
          space={2}
        >
          <Heading size="sm" style={{...MainStyles.titleFont}}>
            {capitalize(item.category_name)}
          </Heading>
          <Badge
            colorScheme="danger"
            // rounded="full"
            bg="gray.400"
            variant="solid"
            alignSelf="flex-end"
            borderRadius={10}
            w={9}
            h={9}
            _text={{
              fontSize: 12,
            }}
          >
            {item.qty}
          </Badge>
          <Heading size="sm" style={{...MainStyles.normalFont}}>
            {item.totalPrice} KS
          </Heading>
        </Stack>
      </Stack>
    </Box>
  );

  const renderEmptyComponent = () => (
    <View style={{ flex: 1, alignItems: "center",...MainStyles.flexRowCenter }}>
      <Text style={{...MainStyles.normalFont}}>
         Order in process.
      </Text>
      <TouchableOpacity onPress={() => goToOrderHistories()}>
          <Text style={{...MainStyles.normalFont, color: '#044fc7'}}>Check in Order Histories</Text>
      </TouchableOpacity>
    </View>
  );

  const userUsedPoints = (used_points) => {
    if (used_points > 0) {
      setTotalPointPrice((totalPointPrice) => totalPointPrice - used_points);
      setUsedPoints(used_points);
      setIsUsedPoints(true);
    } else {
      setUsedPoints(used_points);
      setIsUsedPoints(false);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.cartCategoryList}
        data={cartCategories}
        renderItem={renderItem}
        contentContainerStyle={{ flexGrow: 1, padding: 10 }}
        ListEmptyComponent={renderEmptyComponent}
        keyExtractor={(item) => item.category_id}
      />

      {totalQty && totalQty != 0 ? (
        <View>
          <Box px={4} pb={2}>
            <HStack alignItems="center">
              <TouchableOpacity onPress={toggleNoteFunc}>
                <View style={styles.shadowContainer} flexDirection="row" alignItems="center" paddingBottom={1}>
                  <Icon name="reader-outline" size="sm" style={{fontSize: 20, color: '#044fc7'}} />
                  <Text style={{fontSize: 16, lineHeight: 30, paddingTop: 8, paddingLeft: 5, color: '#044fc7'}}>Note ရေးမည်။ </Text>
                </View>
              </TouchableOpacity>
            </HStack>
            {toggleNote ? (
              <Box marginBottom={10}>
                <TextArea
                  size="xl"
                  fontSize={13}
                  _input={MainStyles.normalFont}
                  borderRadius={15}
                  _focus={{
                    borderColor: "#000",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    ...MainStyles.normalFont,
                  }}
                  placeholder="ဤ နေရာ တွင် စာတိုရေးရန်"
                  onChangeText={(value) => setNote(value)}
                  value={note}
                />
                <HStack space={2} marginY={2}>
                  <Button
                    size="sm"
                    backgroundColor="red.500"
                    onPress={cancelNote}
                    borderRadius={10}
                  >
                    <Text style={{...MainStyles.normalFont, color: '#fff', lineHeight: 30, fontSize: 13}}>
                      ဖယ်မည်
                    </Text>
                  </Button>
                  <Button 
                    size="sm" 
                    borderRadius={10}
                    bg={theme.app_button_color}
                    onPress={addNote}
                  >
                    <Text style={{...MainStyles.normalFont, color: '#fff', lineHeight: 30, fontSize: 13}}>
                      စာတိုသိမ်းမည်
                    </Text>
                  </Button>
                </HStack>
              </Box>
            ) : (
              <View>
                <Text style={{...MainStyles.normalFont, color: '#000', lineHeight: 30, fontSize: 13}}>{note}</Text>
              </View>
            )}
          </Box>
          <Box
            px={4}
            pt={2}
            style={{...MainStyles.flexRowBetween}}
            alignItems="center"
          >
            <Heading size="sm" style={{...MainStyles.normalFont, fontSize: 16, lineHeight: 35}}>Points ပိုင်ဆိုင်မှု ({Number(points)})</Heading>
            {points > 0 && 
            <Button 
              bg={theme.app_button_color}
              borderRadius={10}
              // width="30%" 
              onPress={() => setIsOpen(true)}>
              <Text style={{...MainStyles.normalFont, lineHeight: 30,color: '#fff', fontSize: 12}}>အသုံးပြုမည်</Text>
            </Button>
            }
            <PointModalBox
              isOpen={isOpen}
              onClose={closeModal}
              points={points}
              onSubmit={userUsedPoints}
              onCancel={userCancelPoints}
              theme={theme}
            />
          </Box>
          {outOfArea?.name_en == 'Out Of Area or Gate' && 
          <Box
            px={4}
            pt={2}
            style={{...MainStyles.flexRowBetween}}
            alignItems="center"
          >
            <Heading size="sm" style={{...MainStyles.normalFont, fontSize: 16, lineHeight: 35}}>ဂိတ်တင်ခ</Heading>
            <Box>
                <Text style={{...MainStyles.normalFont, fontSize: 18, lineHeight: 35}}>
                    {parseInt(outOfArea?.cost)} Ks
                </Text>
            </Box>
          </Box>
          }
          <Box
              style={{
                marginTop: 10,
                marginBottom: 10,
                ...MainStyles.centerAll
              }}
            >
            <Divider width={"90%"} height={0.4} bg="#000" style={{ opacity: 0.5 }} />
          </Box>
          {isUsedPoints ? (
            <>
              <Box px={4} pt={2} style={{...MainStyles.flexRowBetween}}>
                <Heading size="sm" style={{...MainStyles.normalFont, fontSize: 17, lineHeight: 30}}>Point Used</Heading>
                <Text style={{...MainStyles.normalFont, fontSize: 20, lineHeight: 30}}>-{usedPoints}</Text>
              </Box>
              <Box
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  ...MainStyles.centerAll
                }}
              >
                <Divider width={"90%"} height={0.4} bg="#000" style={{ opacity: 0.5 }} />
              </Box>
               <Box px={4} py={2} flexDirection="row" justifyContent="flex-end">
                <Text style={{...MainStyles.normalFont, fontSize: 20, lineHeight: 30, textDecorationLine: 'line-through', color: 'red'}}>{ outOfArea?.name_en == 'Out Of Area or Gate' ? (parseInt(totalPrice) + parseInt(outOfArea?.cost)) : parseInt(totalPrice)} Ks</Text>
              </Box>
            </>
          ) : (
            ""
          )}
          <Box px={4} style={{...MainStyles.flexRowBetween}}>
            <Heading size="sm" style={{...MainStyles.normalFont, fontSize: 20, lineHeight: 30}}>Total ({totalQty})</Heading>
            <Text style={{...MainStyles.normalFont, fontSize: 20, lineHeight: 30}}>{(outOfArea?.name_en == 'Out Of Area or Gate' ? (parseInt(totalPrice) + parseInt(outOfArea?.cost)) : parseInt(totalPrice)) - usedPoints} Ks</Text>
          </Box>

          <Box p={4} flexDirection="row" justifyContent="center" marginY={5} w="full">
              <Button
                isLoading={isLoading}
                rounded="full"
                onPress={() => orderModalConfirm()}
                style={{
                  backgroundColor: theme?.app_button_color,
                  width: "100%",
                  marginTop: 8,
                }}
              >
                <Box style={{ ...MainStyles.flexRowCenter }}>
                  <Box style={{marginTop: 5, marginRight: 4}}>
                    <Icon name="cog-outline" style={{color: '#fff'}} size={20} />
                  </Box>
                  <Text style={{ lineHeight: 30, color: "#fff" }}>
                    အော်ဒါအတည်ပြုမည်
                  </Text>
                </Box>
              </Button>
              {/* <OrderConfirmModalBox
                isOpen={isOpenOrderModal}
                onClose={closeOrderModal}
                onSubmit={orderConfirm}
                theme={theme}
              /> */}
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
  shadowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default CheckoutScreen;
