import {
  Box,
  FlatList,
  Image,
  Stack,
  View,
  Heading,
  HStack,
  Text,
  Spacer,
  IconButton,
} from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import UpdateCartModalBox from "../../components/UpdateCartModalBox";
import MainStyles from "../../components/styles/MainStyle";

const CartProductListScreen = () => {
  const route = useRoute();
  const { params } = route;
  const { category_id, category_name } = params;
  const navigation = useNavigation();
  const { cartData } = useSelector((state) => state.cart);
  const { categories } = useSelector((state) => state.feed);
  const theme = useSelector((state) => state.theme);
  const productList = cartData.filter(
    (cart) => cart.category_id == category_id
  );
  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    imageSrc: "",
    id: "",
  });
  const qualities = categories.find(
    (category) => category.id == category_id
  )?.qualities;
  const sizes = categories.find(
    (category) => category.id == category_id
  )?.sizes;

  const categoryQualities = qualities.filter(
    (quality) => quality.category_id == category_id
  );
  const categorySizes = sizes.filter(
    (quality) => quality.category_id == category_id
  );

  const getSelectedQuality = (id) => {
    return categoryQualities.find((quality) => quality.id == id)?.name;
  };
  const getSelectedSize = (id) => {
    return categorySizes.find((size) => size.id == id)?.name;
  };

  const openModal = (data) => {
    setModalInfo({
      isOpen: true,
      id: data.uniqueId,
      imageSrc: data.imageSrc,
    });
  };

  const closeModal = () => {
    setModalInfo({
      isOpen: false,
      id: "",
      imageSrc: "",
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Heading style={MainStyles.titleFont} textTransform='capitalize'>{category_name}</Heading>,
      headerBackTitle: "Back",
    });

  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item)}>
      <Box
        key={item.id}
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
          <HStack flexDirection="row" alignItems="center" space={2}>
            <Image
              source={{ uri: item.imageSrc }}
              alt="image"
              resizeMode="cover"
              w={50}
              h={50}
            />
            <Stack>
              <Heading size="xs">({item.totalPrice}) KS</Heading>
              <Text>QTY: {item.qty} </Text>
            </Stack>
            <Spacer />
            <Stack alignItems="flex-end">
                <Heading size="xs">{getSelectedQuality(item?.quality)}</Heading>
                <Text> {getSelectedSize(item?.size)} </Text>
            </Stack>
          </HStack>
        </Stack>
      </Box>
    </TouchableOpacity>
  );

  const renderEmptyComponent = () => (
    <View style={{...styles.emptyContainer, ...MainStyles.normalFont}}>
      <Text>No Items in your cart</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={productList}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={{ flexGrow: 1, padding: 10 }}
        keyExtractor={(item) => item.uniqueId}
      />
      <UpdateCartModalBox
        isOpen={modalInfo.isOpen}
        id={modalInfo.id}
        imageSrc={modalInfo.imageSrc}
        theme={theme}
        onClose={closeModal}
        sizes={categorySizes}
        qualities={categoryQualities}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CartProductListScreen;
