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
}) => {
  const dispatch = useDispatch();
  const { cartData } = useSelector((state) => state.cart);

  const [cartDetail, setCartDetail] = useState({});

  const incrementQty = () => {
    setCartDetail((prevState) => ({
      ...prevState,
      qty: prevState.qty + 1,
    }));
  };

  const decrementQty = () => {
    setCartDetail((prevState) => ({
      ...prevState,
      qty: prevState.qty > 1 ? prevState.qty - 1 : 1,
    }));
  };

  const addToCart = () => {
    let isExists = cartData.find((cart) => cart.id == cartDetail.id);
    if (isExists) {
      dispatch(updateCartQty(cartDetail));
    } else {
      dispatch(setCartData(cartDetail));
    }
    onClose();
  };

  useEffect(() => {
    setCartDetail({
      id,
      category_id,
      category_name,
      imageSrc,
      qty: 1,
    });
  }, [id]);

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
                icon={<Icon name="add" color="#fff" />}
                rounded="full"
                width="10"
                height="10"
                onPress={incrementQty}
              />

              <Input
                size={"xs"}
                value={String(cartDetail.qty)}
                style={styles.input}
                w="15%"
                mx={2}
                keyboardType="number-pad"
                onChangeText={(newQty) => {
                  setCartDetail((prevState) => ({
                    ...prevState,
                    qty: parseInt(newQty, 10) || 1,
                  }));
                }}
              />

              <IconButton
                variant="solid"
                icon={<Icon name="remove" color="#fff" />}
                rounded="full"
                width="10"
                height="10"
                onPress={decrementQty}
              />
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
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
  },
  cartInput: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
  input: {
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default DetailModalBox;
