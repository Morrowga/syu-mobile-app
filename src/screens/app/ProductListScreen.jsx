import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { AspectRatio, Image, Box, FlatList, Input, Fab } from "native-base";
import { useNavigation } from "@react-navigation/native";
import DetailModalBox from "../../components/DetailModalBox";
import { useSelector } from "react-redux";
import { selectTotalQuantity } from "../../redux/selectors/cartSelectors";

const ProductListScreen = () => {
  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    imageSrc: "",
    id: "",
    category_id: "",
    category_name: "",
    price: 0,
  });
  const route = useRoute();
  const { params } = route;
  const { category_id, category_name } = params;
  const navigation = useNavigation();
  const totalQty = useSelector(selectTotalQuantity);

  const data = [
    {
      id: 1,
      url: "https://i.pinimg.com/564x/96/b8/a3/96b8a3fb97906b5e2ff29fff3e205c26.jpg",
      category_id: 1,
      category_name: "stickers",
      price: 500,
    },
    {
      id: 2,
      url: "https://i.pinimg.com/564x/b1/c7/1f/b1c71f494c11bf67bd333b8943c1340d.jpg",
      category_id: 1,
      category_name: "stickers",
      price: 500,
    },
    {
      id: 3,
      url: "https://i.pinimg.com/564x/a1/e8/08/a1e808211ef66a56fc430b58805e9e90.jpg",
      category_id: 2,
      category_name: "badges",
      price: 1000,
    },
    {
      id: 4,
      url: "https://i.pinimg.com/564x/49/5b/ad/495bade2bf589665a804c26e21ec993a.jpg",
      category_id: 2,
      category_name: "badges",
      price: 1000,
    },
    {
      id: 5,
      url: "https://i.pinimg.com/564x/0f/e9/93/0fe993d90864db5b8bd14518eceed654.jpg",
      category_id: 2,
      category_name: "badges",
      price: 1000,
    },
    {
      id: 6,
      url: "https://i.pinimg.com/564x/fb/96/b1/fb96b1190e2a073f4e166c1edcc77728.jpg",
      category_id: 1,
      category_name: "stickers",
      price: 500,
    },
    {
      id: 7,
      url: "https://i.pinimg.com/564x/7d/45/ea/7d45eadae5ab3c6f943e7d936715c234.jpg",
      category_id: 1,
      category_name: "stickers",
      price: 500,
    },
    {
      id: 8,
      url: "https://i.pinimg.com/564x/19/f2/8e/19f28ea9e448d79820462a3a43d4f1ac.jpg",
      category_id: 1,
      category_name: "stickers",
      price: 500,
    },
    {
      id: 9,
      url: "https://i.pinimg.com/736x/bf/17/b8/bf17b8fa6173d42fbbc06ae2f1d7a981.jpg",
      category_id: 1,
      category_name: "stickers",
      price: 500,
    },
    {
      id: 10,
      url: "https://i.pinimg.com/564x/68/48/fa/6848fa757bb9aed273511f5422321284.jpg",
      category_id: 1,
      category_name: "stickers",
      price: 500,
    },
    {
      id: 11,
      url: "https://i.pinimg.com/564x/e6/6b/11/e66b11e896413ae1a63de3eb4740e01e.jpg",
      category_id: 3,
      category_name: "posters",
      price: 500,
    },
    {
      id: 12,
      url: "https://i.pinimg.com/564x/ec/d3/d9/ecd3d99edb6a23b280a345a32528cb61.jpg",
      category_id: 3,
      category_name: "posters",
      price: 500,
    },
    {
      id: 13,
      url: "https://i.pinimg.com/564x/69/6a/65/696a654b9e9699715a24bcca6dc14863.jpg",
      category_id: 3,
      category_name: "posters",
      price: 500,
    },
    {
      id: 14,
      url: "https://i.pinimg.com/564x/8b/1b/b5/8b1bb5d91c5ad6391f252f06d01b2bde.jpg",
      category_id: 3,
      category_name: "posters",
      price: 500,
    },
    {
      id: 15,
      url: "https://i.pinimg.com/564x/d5/13/ac/d513ac293476c6f7438c8cdcb07ad12f.jpg",
      category_id: 3,
      category_name: "posters",
      price: 500,
    },
  ];

  const qualities = [
    {
      id: 1,
      category_id: 1,
      name: "Plastic",
    },
    {
      id: 2,
      category_id: 1,
      name: "Metal",
    },
    {
      id: 3,
      category_id: 1,
      name: "Wood",
    },
    {
      id: 4,
      category_id: 2,
      name: "Iron",
    },
    {
      id: 5,
      category_id: 2,
      name: "Titanium",
    },
    {
      id: 6,
      category_id: 2,
      name: "Diamond",
    },

    {
      id: 7,
      category_id: 3,
      name: "Gold",
    },
    {
      id: 8,
      category_id: 3,
      name: "Platinum",
    },
    {
      id: 9,
      category_id: 3,
      name: "Copper",
    },
  ];
  const sizes = [
    {
      id: 1,
      category_id: 1,
      name: "2x4",
    },
    {
      id: 2,
      category_id: 1,
      name: "2.5x3.5",
    },
    {
      id: 3,
      category_id: 1,
      name: "1x4",
    },
    {
      id: 4,
      category_id: 2,
      name: "2x3",
    },
    {
      id: 5,
      category_id: 2,
      name: "5x6",
    },
    {
      id: 6,
      category_id: 2,
      name: "4x5",
    },

    {
      id: 7,
      category_id: 3,
      name: "4x2",
    },
    {
      id: 8,
      category_id: 3,
      name: "6x9",
    },
    {
      id: 9,
      category_id: 3,
      name: "3x9",
    },
  ];

  const categoryQualities = qualities.filter(
    (quality) => quality.category_id == category_id
  );
  const categorySizes = sizes.filter(
    (quality) => quality.category_id == category_id
  );
  const productListByCategory = data.filter(
    (data) => data.category_id == category_id
  );
  const openModal = (data) => {
    setModalInfo({
      isOpen: true,
      id: data.id,
      imageSrc: data.url,
      category_id: data.category_id,
      category_name: data.category_name,
      price: data.price,
    });
  };

  const closeModal = () => {
    setModalInfo({
      isOpen: false,
      id: "",
      imageSrc: "",
      category_id: "",
      category_name: "",
      price: 0,
    });
  };

  const goToCart = () => {
    navigation.navigate("Cart");
  };

  useEffect(() => {
    navigation.setOptions({
      title: category_name,
      headerBackTitle: "Back",
    });
  }, []);
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item)} key={item.id}>
      <Box
        key={item}
        maxW="180"
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
        <Box>
          <AspectRatio w="100%" ratio={16 / 16}>
            <Image source={{ uri: item.url }} alt="image" resizeMode="cover" />
          </AspectRatio>
        </Box>
      </Box>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Box alignItems="center" pl={5} pr={5} pt={5}>
        <Input
          variant="rounded"
          size="2xl"
          mx="3"
          backgroundColor="#fff"
          borderColor="#000"
          focusOutlineColor="#000"
          placeholder="Search"
          w="100%"
        />
      </Box>
      <FlatList
        style={styles.listStyle}
        mt={4}
        data={productListByCategory}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ padding: 10 }}
        keyExtractor={(item) => item.id}
      />
      <DetailModalBox
        isOpen={modalInfo.isOpen}
        id={modalInfo.id}
        imageSrc={modalInfo.imageSrc}
        onClose={closeModal}
        category_id={modalInfo.category_id}
        category_name={modalInfo.category_name}
        price={modalInfo.price}
        qualities={categoryQualities}
        sizes={categorySizes}
      />
      {totalQty > 0 ? (
        <Fab
          placement="bottom-right"
          onPress={goToCart}
          icon={<Icon color="white" name="cart" size={20} />}
          label={
            <Text color="white" fontSize="sm">
              {totalQty}
            </Text>
          }
        />
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
  listStyle: {
    flex: 1,
  },
});
export default ProductListScreen;
