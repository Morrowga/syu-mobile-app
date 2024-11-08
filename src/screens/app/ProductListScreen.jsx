import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  useWindowDimensions,
  LogBox,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {
  AspectRatio,
  Box,
  FlatList,
  Input,
  Fab,
  Heading,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import DetailModalBox from "../../components/DetailModalBox";
import { useDispatch, useSelector } from "react-redux";
import { selectTotalQuantity } from "../../redux/selectors/cartSelectors";
import { getFeeds } from "../../api/feed";
import { clearFeedData } from "../../redux/slices/feedSlice";
import LazyLoadImage from "../../components/LazyLoadImage";
import MainStyles from "../../components/styles/MainStyle";

const ProductListScreen = () => {
  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    imageSrc: "",
    id: "",
    category_id: "",
    category_name: "",
    price: 0,
    isWishlist: false,
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
  const theme = useSelector((state) => state.theme);
  
  const route = useRoute();
  const { params } = route;
  const { category } = params;
  const navigation = useNavigation();
  const totalQty = useSelector(selectTotalQuantity);

  const windowWidth = useWindowDimensions().width;
  const itemWidth = (windowWidth - 30) / 2;

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
    setModalInfo(prevState => {
      const updatedInfo = {
        isOpen: true,
        id: data?.id,
        imageSrc: data?.image_url,
        category_id: category?.id,
        category_name: category?.name,
        price: 0,
        isWishlist: data?.isWishlist,
      };
      return updatedInfo;
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
      isWishlist: false,
    });
  };

  const goToCart = () => {
    navigation.navigate("Cart");
  };

  const onRefresh = () => {
    dispatch(clearFeedData());
    fetchFeeds(1);
  };

  const onEndReached = useCallback(() => {
    if (!isLoading && next_page <= feed_last_page) {
      fetchFeeds(next_page);
    }
  }, [isLoading, next_page, feed_last_page]);

  const searchFeed = () => {
    dispatch(clearFeedData());
    fetchFeeds(1);
  };
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Heading style={MainStyles.titleFont} textTransform='capitalize'>{category.name}</Heading>,
      headerBackTitle: "Back",
    });
    dispatch(clearFeedData());
    fetchFeeds(1);

    LogBox.ignoreLogs(["source.uri should not be an empty string"]);
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item)} key={item.id}>
      <Box
        key={item}
        width={itemWidth}
        mt={3}
        rounded="lg"
        overflow="hidden"
        bg="transparent"
        shadow={0} 
        elevation={0} 
        borderColor="#000"
        borderWidth={1.5}
      >
          <AspectRatio w="100%" ratio={16 / 16}>
            <LazyLoadImage source={item.image_url} alt="image" />
          </AspectRatio>
      </Box>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Box alignItems="center" px={2}  pt={5} flexDirection="row">
        <Input
          variant="rounded"
          size="lg"
          height={45}
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
        theme={theme}
        isWishlist={modalInfo.isWishlist}
      />
      {totalQty > 0 ? (
        <Fab
          placement="bottom-right"
          onPress={goToCart}
          style={MainStyles.fabStyle}
          icon={<Icon color="white" name="cart" size={20} />}
          label={
            <Text style={{color: '#fff'}} fontSize="sm">
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
