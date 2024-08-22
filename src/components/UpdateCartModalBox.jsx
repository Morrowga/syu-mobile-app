import React from "react";
import {
  Modal,
  Button,
  Image,
  View,
  Input,
  IconButton,
  Text,
  InputRightAddon,
  InputGroup,
  Select,
  CheckIcon,
  Box,
  Divider,
} from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseCartQty,
  deleteItem,
  increaseCartQty,
  updateCartQtyByInput,
  updateQuality,
  updateSize,
} from "../redux/slices/cartSlice";
import LazyLoadImage from "./LazyLoadImage";
import MainStyles from "./styles/MainStyle";

const UpdateCartModalBox = ({
  id,
  isOpen,
  onClose,
  imageSrc,
  sizes,
  theme,
  qualities,
}) => {
  const dispatch = useDispatch();
  const { cartData } = useSelector((state) => state.cart);
  const cartDetail = cartData.find((cart) => cart.uniqueId == id);

  const decreaseQty = (uniqueId) => {
    if (uniqueId) {
      dispatch(decreaseCartQty(uniqueId));
      if (cartDetail?.qty === 1) {
        onClose();
      }
    }
  };

  const increaseQty = (uniqueId) => {
    dispatch(increaseCartQty(uniqueId));
  };

  const handleInputChange = (value, uniqueId) => {
    const newQuantity = parseInt(value, 10);
    dispatch(updateCartQtyByInput({ id: uniqueId, qty: newQuantity }));
  };

  const handleQualitySelectBox = (value) => {
    dispatch(updateQuality({ id, quality: value, sizes, qualities }));
  };

  const handleSizeSelectBox = (value) => {
    dispatch(updateSize({ id, size: value, sizes, qualities }));
  };

  const deleteProduct = async (uniqueId) => {
    dispatch(deleteItem(uniqueId));
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
        <Modal.Header style={{ borderBottomWidth: 0 }}>
          <Box style={{ flexDirection: "row", justifyContent: 'start' }}>
            <Box marginY={0.9} marginX={1}>
              <Icon name="help-circle-outline" size={22} />
            </Box>
            <Text style={{ lineHeight: 28 }}>
              အသေးစိတ်ကြည့်ရန်
            </Text>
          </Box>
        </Modal.Header>
        <Modal.Body>
          {imageSrc
            ?
            <LazyLoadImage
              source={imageSrc}
              height={300}
              alt="Preview"
              style={styles.image}
            />
            :
            <Image
              source={{uri: theme?.app_logo_img}}
              alt="Preview"
              style={styles.image}
            />
          }

          <View style={styles.modalBody}>
            <View style={{...styles.cartInput,...MainStyles.flexRowCenter}}>
              <IconButton
                variant="solid"
                style={{ backgroundColor: theme?.app_button_color }}
                icon={<Icon name="remove" color="#fff" />}
                rounded="full"
                width="10"
                height="10"
                onPress={() => decreaseQty(cartDetail?.uniqueId)}
              />
              <Input
                size={"xs"}
                value={String(cartDetail?.qty)}
                style={[styles.input, MainStyles.normalFont]}
                w="15%"
                mx={2}
                keyboardType="number-pad"
                onChangeText={(e) => handleInputChange(e, cartDetail.uniqueId)}
              />
              <IconButton
                variant="solid"
                style={{ backgroundColor: theme?.app_button_color }}
                icon={<Icon name="add" color="#fff" />}
                rounded="full"
                width="10"
                height="10"
                onPress={() => increaseQty(cartDetail.uniqueId)}
              />

              <View style={styles.totalPrice}>
                <InputGroup justifyContent="center">
                  <Input
                    readOnly
                    h={10}
                    value={String(cartDetail?.totalPrice)}
                    minW={70}
                    style={[MainStyles.normalFont]}
                    placeholder="nativebase"
                  />
                  <InputRightAddon style={[MainStyles.normalFont]} children={"Ks"} />
                </InputGroup>
              </View>
            </View>
            <View style={styles.selectBox}>
              <Select
                rounded="30"
                selectedValue={cartDetail?.quality}
                minW={130}
                h={10}
                placeholder="Quality"
                style={[MainStyles.normalFont]}
                _selectedItem={{
                  bg: "transparent",
                  endIcon: <CheckIcon style={{ color: '#000' }} size="5" />,
                }}
                mt={1}
                size={"sm"}
                onValueChange={(itemValue) => handleQualitySelectBox(itemValue)}
              >
                {qualities.map((size) => (
                  <Select.Item
                    style={[MainStyles.normalFont, { borderRadius: 30 }]}
                    label={size.name}
                    value={size.id}
                    key={size.id}
                  />
                ))}
              </Select>
              <Select
                rounded="30"
                selectedValue={cartDetail?.size}
                style={[MainStyles.normalFont]}
                placeholder="Size"
                _selectedItem={{
                  bg: "transparent",
                  endIcon: <CheckIcon style={{ color: '#000' }} size="5" />,
                }}
                mt={1}
                h={10}
                minW={160}
                onValueChange={(itemValue) => handleSizeSelectBox(itemValue)}
              >
                {sizes.map((size) => (
                  <Select.Item
                    style={[MainStyles.normalFont, { borderRadius: 30 }]}
                    label={size.name + " (" + size.size + ")"}
                    value={size.id}
                    key={size.id}
                  />
                ))}
              </Select>
            </View>
          </View>
        </Modal.Body>
        <Box style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
          <Divider width={'50%'} style={{ opacity: 0.3 }} />
        </Box>
        <Modal.Footer style={{...styles.footer, ...MainStyles.flexRowCenter}}>
          <Button width="50%" bg={theme.app_button_color} style={MainStyles.normalFont} onPress={onClose} rounded="full">
            <Box style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Box style={{ marginTop: 5, marginRight: 4 }}>
                <Icon name="checkmark-circle-outline" style={{ color: '#fff' }} size={20} />
              </Box>
              <Text style={{ lineHeight: 30, color: '#fff' }}>
                အတည်ပြုမည်။
              </Text>
            </Box>
          </Button>
          <Button
            background="red.500"
            onPress={() => deleteProduct(cartDetail.uniqueId)}
            rounded="full"
          >
            <Box style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Box style={{ marginTop: 5, marginRight: 4 }}>
                <Icon name="trash-outline" style={{ color: '#fff' }} size={20} />
              </Box>
              <Text style={{ lineHeight: 30, color: '#fff' }}>
                စာရင်းဖယ်မည်။
              </Text>
            </Box>
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
    gap: 10,
  },
  input: {
    textAlign: "center",
  },
  footer: {
    gap: 10,
    borderTopWidth: 0
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
