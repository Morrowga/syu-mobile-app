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
import { addWishlist, removeWishlist } from "../api/wishlist";
import { toggleWishlist } from "../redux/slices/feedSlice";

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
  isWishlist,
}) => {
  const dispatch = useDispatch();
  const { cartData } = useSelector((state) => state.cart);

  const [cartDetail, setCartDetail] = useState({});

  useEffect(() => {
    let initial_price =
      qualities.length > 0 && sizes.length > 0
        ? Number(qualities[0].price) + Number(sizes[0].price)
        : 0;
    let quality_id = qualities.length > 0 ? qualities[0].id : null;
    let size_id = sizes.length > 0 ? sizes[0].id : null;
    setCartDetail({
      id,
      category_id,
      category_name,
      imageSrc,
      price: initial_price,
      sizePrice: sizes.length > 0 ? Number(sizes[0].price) : 0,
      qualityPrice: qualities.length > 0 ? Number(qualities[0].price) : 0,
      qty: 1,
      totalPrice: initial_price,
      isWishlist,
      quality: quality_id,
      size: size_id,
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

  const handleSizeSelectBox = (size_id) => {
    const current_size = sizes.find((size) => size.id == size_id);
    const sizePrice = Number(current_size.price);
    setCartDetail((prevState) => {
      const newPrice = prevState.qualityPrice + sizePrice;
      return {
        ...prevState,
        size: size_id,
        sizePrice,
        price: newPrice,
        totalPrice: prevState.qty * newPrice,
      };
    });
  };

  const handleQualitySelectBox = (quality_id) => {
    const current_quality = qualities.find(
      (quality) => quality.id == quality_id
    );
    const qualityPrice = Number(current_quality.price);
    setCartDetail((prevState) => {
      const newPrice = prevState.sizePrice + qualityPrice;
      return {
        ...prevState,
        quality: quality_id,
        qualityPrice,
        price: newPrice,
        totalPrice: prevState.qty * newPrice,
      };
    });
  };

  const addToWishlist = () => {
    setCartDetail((prevState) => ({
      ...prevState,
      isWishlist: !prevState.isWishlist,
    }));
    dispatch(addWishlist({ product_id: id }));
    dispatch(toggleWishlist({ product_id: id }));
  };

  const removeFromWishlist = () => {
    if (isWishlist) {
      setCartDetail((prevState) => ({
        ...prevState,
        isWishlist: !prevState.isWishlist,
      }));
      dispatch(removeWishlist({ product_id: id }));
      dispatch(toggleWishlist({ product_id: id }));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <Modal.Content>
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
                {qualities.map((quality) => (
                  <Select.Item
                    label={quality.name}
                    value={quality.id}
                    key={quality.id}
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
          <IconButton
            rounded="full"
            variant="solid"
            onPress={isWishlist ? removeFromWishlist : addToWishlist}
            icon={
              cartDetail?.isWishlist ? (
                <Icon name="heart" color="#fff" size={20} />
              ) : (
                <Icon name="heart-outline" color="#fff" size={20} />
              )
            }
          ></IconButton>
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
    gap: 10,
  },
  selectBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 15,
  },
  totalPrice: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});

export default DetailModalBox;
