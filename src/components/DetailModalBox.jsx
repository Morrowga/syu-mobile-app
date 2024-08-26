import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  View,
  Input,
  IconButton,
  Text,
  Select,
  CheckIcon,
  InputGroup,
  InputRightAddon,
  Box,
  Divider,
  useToast,
} from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import { Image,StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setCartData,
  updateCartQty,
} from "../redux/slices/cartSlice";
import { addWishlist, removeWishlist } from "../api/wishlist";
import { toggleWishlist } from "../redux/slices/feedSlice";
import LazyLoadImage from "./LazyLoadImage";
import MainStyles from "./styles/MainStyle";

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
  theme,
  cameFromWhere = 'product',
  onRefresh = null
}) => {
  const dispatch = useDispatch();
  const { cartData } = useSelector((state) => state.cart);
  const toast = useToast();

  const [cartDetail, setCartDetail] = useState({});

  useEffect(() => {
    let initial_price =
    qualities.length > 0 && sizes.length > 0
        ? Number((qualities.find(q => q.is_default) || qualities[0]).price) +
          Number((sizes.find(s => s.is_default) || sizes[0]).price)
        : 0;
    let quality_id = qualities.length > 0 ? (qualities.find(q => q.is_default) || qualities[0]).id : null;
    let size_id = sizes.length > 0 ? (sizes.find(s => s.is_default) || sizes[0]).id : null;
        
    setCartDetail({
      id,
      category_id,
      category_name,
      imageSrc,
      price: initial_price,
      sizePrice: sizes.length > 0 ? Number(sizes[0].price) : 0,
      qualityPrice: qualities.length > 0 ? Number(qualities[0].price) : 0,
      uniqueId: '',
      qty: 1,
      totalPrice: initial_price,
      isWishlist,
      quality: quality_id,
      size: size_id,
    });
  }, [id, imageSrc]);

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

    let foundCartItem = cartData.find(
      (cart) =>
        cart.id === cartDetail.id &&
        cart.size === cartDetail.size &&
        cart.quality === cartDetail.quality
    );

    let isExists = !!foundCartItem; 

    if (isExists) {
      cartDetail.uniqueId = foundCartItem.uniqueId;

      dispatch(updateCartQty(cartDetail));
    } else {
      dispatch(setCartData(cartDetail));
    }


    toast.show({
      render: () => {
        return <Box bg="#1e5781" px="2" py="1" rounded="full">
                  <Text style={{...MainStyles.normalFont, color: '#fff', padding: 5}}>{isExists ? 'Item information updated' : 'Item added into cart'}</Text>
              </Box>;
      }
    });

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
    const current_size = sizes.find((size) => size.id === size_id);
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
      (quality) => quality.id === quality_id
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

  const toggleWishlistStatus = () => {
    console.log(cartDetail);
    setCartDetail((prevState) => ({
      ...prevState,
      isWishlist: !prevState.isWishlist,
    }));

    if (isWishlist) {
      console.log(isWishlist)
      dispatch(removeWishlist({ product_id: id }));
    } else {
      console.log(isWishlist);
      dispatch(addWishlist({ product_id: id }));
    }
    dispatch(toggleWishlist({ product_id: id }));

    toast.show({
      render: () => {
        return <Box bg="#1e5781" px="2" py="1" rounded="full">
                  <Text style={{...MainStyles.normalFont, color: '#fff', padding: 5}}>{cartDetail?.isWishlist ? 'Item removed from wishlist' : 'Item added into wishlist'}</Text>
              </Box>;
      }
    });
  };

  const removeFromWishlist = () => {
    setCartDetail((prevState) => ({
      ...prevState,
      isWishlist: !prevState.isWishlist,
    }));
    
    dispatch(removeWishlist({ product_id: id }));

    onRefresh();

    onClose();
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header style={{borderBottomWidth: 0}}>
          <Box style={{...MainStyles.flexRowStart}}>
            <Box marginY={0.9} marginX={1}>
              <Icon name="help-circle-outline" size={22} />
            </Box>
            <Text style={{lineHeight: 28, ...MainStyles.titleFont}}>
              အသေးစိတ်ကြည့်ရန်
            </Text>
          </Box>
        </Modal.Header>
        <Box style={{display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
          <Divider width={'50%'} style={{opacity: 0.3}} /> 
        </Box>
        <Modal.Body my={0}>
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
            <View style={styles.cartInput}>
              <IconButton
                variant="solid"
                style={{backgroundColor: theme?.app_button_color}}
                icon={<Icon name="remove" color="#fff" />}
                rounded="full"
                width="10"
                isDisabled={cartDetail.qty <= 1}
                height="10"
                onPress={decrementQty}
              />
              <Input
                size={"xs"}
                value={String(cartDetail.qty)}
                style={[styles.input, MainStyles.normalFont]}
                w="15%"
                mx={2}
                keyboardType="number-pad"
                onChangeText={handleQtyChange}
              />
              <IconButton
                variant="solid"
                icon={<Icon name="add" color="#fff" />}
                style={{backgroundColor: theme?.app_button_color}}
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
                    value={String(cartDetail.totalPrice)}
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
                selectedValue={cartDetail.quality}
                minW={130}
                h={10}
                style={[MainStyles.normalFont]}
                placeholder="Quality"
                _selectedItem={{
                  bg: "transparent",
                  endIcon: <CheckIcon style={{color: '#000'}} size="5" />,
                }}
                mt={1}
                size={"sm"}
                onValueChange={handleQualitySelectBox}
              >
                {qualities.map((quality) => (
                  <Select.Item
                    style={[MainStyles.normalFont, {borderRadius: 30}]}
                    label={quality.name}
                    value={quality.id}
                    key={quality.id}
                  />
                ))}
              </Select>
              <Select
                rounded="30" 
                selectedValue={cartDetail.size}
                style={[MainStyles.normalFont]}
                placeholder="Size"
                _selectedItem={{
                  bg: "transparent",
                  endIcon: <CheckIcon style={{color: '#000'}} size="5" />,
                }}
                mt={1}
                h={10}
                minW={160}
                onValueChange={handleSizeSelectBox}
              >
                {sizes.map((size) => (
                  <Select.Item
                    style={[MainStyles.normalFont, {borderRadius: 30}]}
                    label={`${size.name} (${size.size})`}
                    value={size.id}
                    key={size.id}
                  />
                ))}
              </Select>
            </View>
          </View>
        </Modal.Body>
        <Box style={{display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
          <Divider width={'50%'} style={{opacity: 0.3}} /> 
        </Box>
        {
          cameFromWhere == 'product' 
          ? 
            <Modal.Footer style={{...styles.footer, ...MainStyles.flexRowCenter}}>
              <Box>
                <IconButton
                  rounded="full"
                  variant="solid"
                  style={[styles.iconBtn, {backgroundColor: '#fff', marginTop: 5}]}
                  onPress={toggleWishlistStatus}
                  icon={
                    cartDetail.isWishlist ? (
                      <Icon name="heart" color="#e85144" size={20} />
                    ) : (
                      <Icon name="heart-outline" color="#e85144" size={20} />
                    )
                  }
                />
              </Box>
              <Button 
              rounded="full" 
              style={{ 
              backgroundColor: theme?.app_button_color, 
              width: '80%',
              }}
              onPress={addToCart}>
                <Box style={{...MainStyles.flexRowCenter}}>
                  <Box style={{marginTop: 5, marginRight: 4}}>
                    <Icon name="cart-outline" style={{color: '#fff'}} size={20} />
                  </Box>
                  <Text style={{lineHeight: 30, color: '#fff'}}>
                    စျေးခြင်းထဲထည့်မည်
                  </Text>
                </Box>
              </Button>
            </Modal.Footer>
          :
            <Modal.Footer style={styles.footer}>
            <Button rounded="full" 
              style={{ 
              backgroundColor: 'red', 
              width: '100%',
              }}
              onPress={removeFromWishlist}
            >
              <Box style={{...MainStyles.flexRowCenter}}>
                <Box style={{marginTop: 5, marginRight: 4}}>
                  <Icon name="trash-outline" style={{color: '#fff'}} size={20} />
                </Box>
                <Text style={{lineHeight: 30, color: '#fff'}}>
                  စာရင်းဖယ်မည်။
                </Text>
              </Box>
            </Button>
            <Button rounded="full" 
              style={{ 
              backgroundColor: theme?.app_button_color, 
              width: '100%',
              }}
              onPress={addToCart}
            >
              <Box style={{...MainStyles.flexRowCenter}}>
                <Box style={{marginTop: 5, marginRight: 4}}>
                  <Icon name="cart-outline" style={{color: '#fff'}} size={20} />
                </Box>
                <Text style={{lineHeight: 30, color: '#fff'}}>
                  စျေးခြင်းထဲထည့်မည်
                </Text>
              </Box>
            </Button>
          </Modal.Footer>
        }
      </Modal.Content>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBody: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 40,
  },
  cartInput: {
    flexDirection: "row",
    alignItems: "center",
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
  iconBtn: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 15
  },
});

export default DetailModalBox;
