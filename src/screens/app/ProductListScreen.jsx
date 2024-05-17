import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  LogBox,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {
  AspectRatio,
  Image,
  Box,
  FlatList,
  Button,
  Input,
  Fab,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import DetailModalBox from "../../components/DetailModalBox";
import { useDispatch, useSelector } from "react-redux";
import { selectTotalQuantity } from "../../redux/selectors/cartSelectors";
import { getFeeds } from "../../api/feed";
import { clearFeedData } from "../../redux/slices/feedSlice";

const ProductListScreen = () => {
  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    imageSrc: "",
    id: "",
    category_id: "",
    category_name: "",
    price: 0,
  });

  const [q, setSearch] = useState("");
  const dispatch = useDispatch();
  const {
    isError,
    error_message,
    feeds,
    feed_last_page,
    isLoading,
    next_page,
  } = useSelector((state) => state.feed);
  const route = useRoute();
  const { params } = route;
  const { category } = params;
  const navigation = useNavigation();
  const totalQty = useSelector(selectTotalQuantity);

  const handleSearchInputChange = (value) => {
    setSearch(value);
  };

  const fetchFeeds = (initial_page) => {
    const filter = {
      q: q,
      page: initial_page ?? next_page,
      category_id: category.id,
    };
    dispatch(getFeeds(filter));
  };

  const openModal = (data) => {
    setModalInfo({
      isOpen: true,
      id: data.id,
      imageSrc: data.image_url,
      category_id: category.id,
      category_name: category.name,
      price: 100,
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

  const onRefresh = () => {
    dispatch(clearFeedData());
    fetchFeeds(1);
  };

  const onEndReached = () => {
    if (!isLoading && next_page > 1) {
      fetchFeeds();
    }
  };

  const searchFeed = () => {
    dispatch(clearFeedData());
    fetchFeeds(1);
  };
  useEffect(() => {
    navigation.setOptions({
      title: category.name,
      headerBackTitle: "Back",
    });

    fetchFeeds();

    LogBox.ignoreLogs(["source.uri should not be an empty string"]);
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
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
            <Image
              source={{ uri: item.image_url ?? null }}
              alt="image"
              resizeMode="cover"
            />
          </AspectRatio>
        </Box>
      </Box>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Box alignItems="center" pl={5} pr={5} pt={5} flexDirection="row">
        <Input
          variant="rounded"
          size="lg"
          mx="3"
          onChangeText={(value) => handleSearchInputChange(value)}
          backgroundColor="#fff"
          borderColor="#000"
          focusOutlineColor="#000"
          placeholder="Search"
          flex={1}
          rightElement={
            <Icon
              color="black"
              name="search-outline"
              style={styles.inputInnerIcon}
              onPress={searchFeed}
              size={20}
            />
          }
        />
      </Box>
      <FlatList
        style={styles.listStyle}
        mt={4}
        data={feeds}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ padding: 10 }}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
      />
      <DetailModalBox
        isOpen={modalInfo.isOpen}
        id={modalInfo.id}
        imageSrc={modalInfo.imageSrc}
        onClose={closeModal}
        category_id={modalInfo.category_id}
        category_name={modalInfo.category_name}
        price={modalInfo.price}
        qualities={category?.qualities}
        sizes={category?.sizes}
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
  inputInnerIcon: {
    paddingRight: 10,
  },
  listStyle: {
    flex: 1,
  },
});
export default ProductListScreen;
