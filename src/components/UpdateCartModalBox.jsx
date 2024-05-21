import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Image,
  View,
  Input,
  HStack,
  IconButton,
  Text,
  KeyboardAvoidingView,
  InputRightAddon,
  InputGroup,
  Select,
  CheckIcon,
} from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { throttle } from "lodash";
import {
  decreaseCartQty,
  deleteItem,
  increaseCartQty,
  updateCartQty,
  updateCartQtyByInput,
  updateQuality,
  updateSize,
} from "../redux/slices/cartSlice";

const UpdateCartModalBox = ({
  id,
  isOpen,
  onClose,
  imageSrc,
  sizes,
  qualities,
}) => {
  const dispatch = useDispatch();
  const { cartData } = useSelector((state) => state.cart);
  const cartDetail = cartData.find((cart) => cart.id == id);

  const decreaseQty = (id) => {
    if (id) {
      dispatch(decreaseCartQty(id));
      if (cartDetail?.qty === 1) {
        onClose();
      }
    }
  };

  const increaseQty = (id) => {
    dispatch(increaseCartQty(id));
  };

  const handleInputChange = (value, product_id) => {
    const newQuantity = parseInt(value, 10);
    dispatch(updateCartQtyByInput({ id: product_id, qty: newQuantity }));
  };

  const handleQualitySelectBox = (value) => {
    dispatch(updateQuality({ id, quality: value, sizes, qualities }));
  };

  const handleSizeSelectBox = (value) => {
    dispatch(updateSize({ id, size: value, sizes, qualities }));
  };
  const deleteProduct = async (id) => {
    dispatch(deleteItem(id));
    onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      avoidKeyboard
      _overlay={{
        useRNModal: false,
        useRNModalOnAndroid: false,
      }}
    >
      <Modal.Content>
        <Modal.Header>Item Detail</Modal.Header>
        <Modal.Body>
          {imageSrc ? (
            <Image
              source={{ uri: imageSrc }}
              alt="Preview"
              style={{ width: "100%", height: 300 }}
            />
          ) : (
            ""
          )}

          <View style={styles.modalBody}>
            <View style={styles.cartInput}>
              <IconButton
                variant="solid"
                icon={<Icon name="add" color="#fff" />}
                rounded="full"
                width="10"
                height="10"
                onPress={() => increaseQty(cartDetail.id)}
              />

              <Input
                size={"xs"}
                value={String(cartDetail?.qty)}
                style={styles.input}
                w="15%"
                mx={2}
                keyboardType="number-pad"
                onChangeText={(e) => handleInputChange(e, cartDetail.id)}
              />

              <IconButton
                variant="solid"
                icon={<Icon name="remove" color="#fff" />}
                rounded="full"
                width="10"
                height="10"
                onPress={() => decreaseQty(cartDetail?.id)}
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
                selectedValue={cartDetail?.quality}
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
                selectedValue={cartDetail?.size}
                placeholder="Size"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                h={10}
                minW={160}
                onValueChange={(itemValue) => handleSizeSelectBox(itemValue)}
              >
                {sizes.map((size) => (
                  <Select.Item
                    label={size.name + " (" + size.size + ")"}
                    value={size.id}
                    key={size.id}
                  />
                ))}
              </Select>
            </View>
          </View>
        </Modal.Body>
        <Modal.Footer style={styles.footer}>
          <Button onPress={onClose} rounded="full">
            Confirm
          </Button>
          <Button
            backgroundColor="red.500"
            onPress={() => deleteProduct(cartDetail.id)}
            rounded="full"
          >
            Remove From Cart
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
    gap: 10,
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

export default UpdateCartModalBox;
