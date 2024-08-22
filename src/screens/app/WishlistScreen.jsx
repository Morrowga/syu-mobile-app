import {
  StyleSheet,
  View,
  TouchableOpacity,
  RefreshControl,
  useWindowDimensions,
  Text,
  LogBox,
} from "react-native";
import {
  AspectRatio,
  Image,
  Box,
  FlatList,
  Input,
  Select,
  CheckIcon,
  HStack,
  Spinner,
} from "native-base";
import { useEffect, useState, useRef, useCallback } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { getCategories } from "../../api/feed";
import { getWishlists } from "../../api/wishlist";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { selectTotalQuantity } from "../../redux/selectors/cartSelectors";
import { clearWishlistData } from "../../redux/slices/wishlistSlice";
import DetailModalBox from "../../components/DetailModalBox";
import MainStyles from "../../components/styles/MainStyle";
import { capitalize } from "../../helpers/general";
import { BlurView } from "expo-blur";

const WishlistScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [q, setSearch] = useState("");
  const { categories } = useSelector((state) => state.feed);
  const categoryRef = useRef(null);
  const [category, setCategory] = useState(categories.length > 0 ? categories[0] : []);

  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    imageSrc: "",
    id: "",
    category_id: "",
    category_name: "",
    price: 0,
    isWishlist: false,
  });
  const theme = useSelector((state) => state.theme);
  const totalQty = useSelector(selectTotalQuantity);
  const { cartData } = useSelector((state) => state.cart);
  const { wishlists, next_page, isLoading, last_page } = useSelector(
    (state) => state.wishlist
  );

  const windowWidth = useWindowDimensions().width;
  const itemWidth = (windowWidth - 30) / 2;

  const fetchCategories = () => {
    const filter = {
      per_page: 99999,
      page: 1,
    };
    dispatch(getCategories(filter));
  };

  const onRefresh = () => {
    dispatch(clearWishlistData());

    fetchWishlists(1);
  };

  const onEndReached = useCallback(() => {
    if (!isLoading && next_page <= last_page) {
      fetchWishlists(next_page);
    }
  }, [isLoading, next_page, last_page]);


  const handleSortInput = (value) => {
    categoryRef.current.value = value;

    dispatch(clearWishlistData());

    fetchWishlists(1);
    
    const findCategory = categories.find(cat => cat.id === categoryRef.current.value);

    setCategory(findCategory);
  };

  const handleSearchInputChange = (value) => {
    setSearch(value);
  };

  const searchWishlist = () => {
    dispatch(clearWishlistData());
    fetchWishlists(1);
  }

  const fetchWishlists = (initial_page) => {
    const filter = {
      category_id: categoryRef.current.value ?? "",
      q: q,
      page: initial_page ?? next_page,
    };

    dispatch(getWishlists(filter))
      .then((resp) => {
      })
      .catch((error) => {
        console.error("Wishlists fetched failed:", error);
      });
  };

  const openModal = (data) => {
    console.log(cartData);
    const findCategory = categories.find(cat => cat.id === data?.category_id);
    setCategory(findCategory);

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

  useEffect(() => {
      LogBox.ignoreAllLogs(); 
      dispatch(clearWishlistData());

      fetchCategories();
      fetchWishlists(1);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item)}>
      <Box
        key={item}
        width={itemWidth}
        mt={3}
        rounded="lg"
        overflow="hidden"
        bg="transparent"
        shadow={0} 
        elevation={0} 
        borderWidth={0}
      >
        <Box>
        <AspectRatio w="100%" ratio={16 / 16}>
          <Image 
            source={{ uri: item.image_url }} 
            alt="image" 
            w="100%" 
            h="100%"
          />
        </AspectRatio>
        </Box>
      </Box>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Box style={{...MainStyles.flexRowBetween}} mx={5} mt={5}>
        <Box width="57%">
          <Input
            variant="rounded"
            size="md"
            mt={1}
            onChangeText={(value) => handleSearchInputChange(value)}
            backgroundColor="#fff"
            borderColor="#000"
            focusOutlineColor="#000"
            placeholder="Search"
            w="100%"
            height={45}
            rightElement={
              <Icon
                color="black"
                name="search-outline"
                onPress={searchWishlist}
                style={styles.inputInnerIcon}
                size={20}
              />
            }
          />
        </Box>
        <Box width="40%">
          <Select
            variant="rounded"
            size="md"
            backgroundColor="#fff"
            borderColor="#000"
            focusOutlineColor="#000"
            accessibilityLabel="Sort"
            placeholder="Sort"
            height={45}
            _selectedItem={{
              bg: "transparent",
              endIcon: <CheckIcon style={{color: '#000'}} size="5" />,
            }}
            mt={1}
            ref={categoryRef}
            onValueChange={(itemValue) => handleSortInput(itemValue)}
          >
            {categories?.map((categoryItem) => (
              <Select.Item
                label={capitalize(categoryItem.name)}
                value={categoryItem.id}
                key={categoryItem.id}
              />
            ))}
            <Select.Item label={"All"} value={""} key={""} />
          </Select>
        </Box>
      </Box>

      <View style={{ flex: 1 }}>
        {!isLoading && 
          <>
            <FlatList
              mt={4}
              data={wishlists}
              renderItem={renderItem}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              contentContainerStyle={{ padding: 10 }}
              keyExtractor={(item) => item.id}
              style={styles.wishlist}
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
              qualities={category?.qualities ?? []}
              sizes={category?.sizes ?? []}
              theme={theme}
              isWishlist={modalInfo.isWishlist}
              cameFromWhere={'wishlist'}
              onRefresh={onRefresh}
            />
            {/* {totalQty > 0 ? (
              <Fab
                placement="bottom-right"
                onPress={goToCart}
                style={MainStyles.fabStyle}
                rounded="full"
                icon={<Icon color="white" name="cart" size={20} />}
                label={
                  <Text style={{color: '#fff'}} fontSize="sm">
                    {totalQty}
                  </Text>
                }
              />
            ) : (
              ""
            )} */}
          </>
        }  
        {isLoading &&
          <View style={styles.loadingContainer}>
            <HStack space={2} justifyContent="center">
              <Spinner color="#000" accessibilityLabel="Loading posts" />
            </HStack>
          </View>
        }
         {(!isLoading && wishlists?.length == 0) &&
          <View style={{flex: 2, alignItems: 'center'}}>
            <Text style={{alignContent: 'center', opacity: 0.3}}>No items in your wishlist</Text>
          </View>
        }
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  inputInnerIcon: {
    paddingRight: 10,
  },
});
export default WishlistScreen;
