import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Image,
  View,
  Input,
  HStack,
  IconButton,
  KeyboardAvoidingView,
  Text,
  Select,
  CheckIcon,
  Divider,
  InputGroup,
  InputRightAddon,
} from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateTotalQty,
  setCartData,
  updateCartQty,
} from "../redux/slices/cartSlice";

const DetailModalBox = ({
  isOpen,
  id,
  onClose,
  imageSrc,
  category_id,
  category_name,
  price,
  sizes,
  qualities,
}) => {
  const dispatch = useDispatch();
  const { cartData } = useSelector((state) => state.cart);

  const [cartDetail, setCartDetail] = useState({});

  useEffect(() => {
    setCartDetail({
      id,
      category_id,
      category_name,
      imageSrc,
      price,
      qty: 1,
      totalPrice: price,

      quality: null,
      size: null,
    });
  }, [id]);

  const incrementQty = () => {
    setCartDetail((prevState) => ({
      ...prevState,
      qty: prevState.qty + 1,
      totalPrice: (prevState.qty + 1) * prevState.price,
    }));
  };

  const decrementQty = () => {
    setCartDetail((prevState) => ({
      ...prevState,
      qty: prevState.qty > 1 ? prevState.qty - 1 : 1,
      totalPrice: (prevState.qty > 1 ? prevState.qty - 1 : 1) * prevState.price,
    }));
  };

  const addToCart = () => {
    if (!cartDetail.size || !cartDetail.quality) {
      return;
    }
    let isExists = cartData.find((cart) => cart.id == cartDetail.id);
    if (isExists) {
      dispatch(updateCartQty(cartDetail));
    } else {
      dispatch(setCartData(cartDetail));
    }
    onClose();
  };

  const handleQtyChange = (newQty) => {
    const qty = parseInt(newQty, 10) || 1;
    setCartDetail((prevState) => ({
      ...prevState,
      qty,
      totalPrice: qty * prevState.price,
    }));
  };

  const handleSizeSelectBox = (value) => {
    setCartDetail((prevState) => ({
      ...prevState,
      size: value,
    }));
  };

  const handleQualitySelectBox = (value) => {
    setCartDetail((prevState) => ({
      ...prevState,
      quality: value,
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Item Detail</Modal.Header>
        <Modal.Body>
          <Image
            source={{ uri: imageSrc }}
            alt="Preview"
            style={{ width: "100%", height: 300 }}
          />

          <View style={styles.modalBody}>
            <View style={styles.cartInput}>
               <IconButton
                variant="solid"
                icon={<Icon name="remove" color="#fff" />}
                rounded="full"
                width="10"
                height="10"
                onPress={decrementQty}
              />
              <Input
                size={"xs"}
                value={String(cartDetail.qty)}
                style={styles.input}
                w="15%"
                mx={2}
                keyboardType="number-pad"
                onChangeText={handleQtyChange}
              />
              <IconButton
                variant="solid"
                icon={<Icon name="add" color="#fff" />}
                rounded="full"
                width="10"
                height="10"
                onPress={incrementQty}
              />

              <View style={styles.totalPrice}>
                <InputGroup justifyContent="center">
                  <Input
                    readOnly
                    h={10}
                    value={String(cartDetail?.totalPrice)}
                    minW={70}
                    placeholder="nativebase"
                  />
                  <InputRightAddon children={"KS"} />
                </InputGroup>
              </View>
            </View>

            <View style={styles.selectBox}>
              <Select
                selectedValue={cartDetail.quality}
                minW={130}
                h={10}
                placeholder="Quality"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                size={"sm"}
                onValueChange={(itemValue) => handleQualitySelectBox(itemValue)}
              >
                {qualities.map((size) => (
                  <Select.Item
                    label={size.name}
                    value={size.id}
                    key={size.id}
                  />
                ))}
              </Select>
              <Select
                selectedValue={cartDetail.size}
                placeholder="Size"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                h={10}
                minW={130}
                onValueChange={(itemValue) => handleSizeSelectBox(itemValue)}
              >
                {sizes.map((size) => (
                  <Select.Item
                    label={size.name}
                    value={size.id}
                    key={size.id}
                  />
                ))}
              </Select>
            </View>
          </View>
        </Modal.Body>
        <Modal.Footer style={styles.footer}>
          <Button rounded="full" onPress={addToCart}>
            Add To Cart
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBody: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 10,
  },
  cartInput: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  input: {
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  selectBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  totalPrice: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});

export default DetailModalBox;
