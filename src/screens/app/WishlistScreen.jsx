import { StyleSheet, View, TouchableOpacity,RefreshControl,Text } from "react-native";
import {
  AspectRatio,
  Image,
  Box,
  FlatList,
  Input,
  Select,
  CheckIcon,
} from "native-base";
import { useEffect, useState,useRef } from 'react';
import Icon from "react-native-vector-icons/Ionicons";
import { getCategories } from "../../api/feed";
import { getWishlists } from "../../api/wishlist";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { clearWishlistData } from "../../redux/slices/wishlistSlice";


const WishlistScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [q, setSearch] = useState('');
  const categoryRef = useRef(null);
  const { categories } = useSelector((state) => state.feed);
  const { wishlists,next_page, isLoading } = useSelector((state) => state.wishlist);

  const fetchCategories = () =>
  {
    const filter = {
      per_page: 99999,
      page: 1
    }
    dispatch(getCategories(filter))
    .then((resp) => {
    })
    .catch((error) => {
      console.error("Categories fetched failed:", error);
    });
  }

  const onRefresh = () => {
    dispatch(clearWishlistData())
    fetchWishlists(1)
  };

  const onEndReached = () => {
    if (!isLoading && next_page > 1) {
      fetchWishlists();
    }
  };

  const handleSortInput = (value) => {
    categoryRef.current.value = value;

    dispatch(clearWishlistData())
    fetchWishlists(1);
  }


  const handleSearchInputChange = (value) => {
    setSearch(value);
  }

  const fetchWishlists = (initial_page) =>
    {
      const filter = {
        category_id: categoryRef.current.value ?? '',
        q: q,
        page: initial_page ?? next_page
      }

      dispatch(getWishlists(filter))
      .then((resp) => {
        console.log(wishlists?.data);
      })
      .catch((error) => {
        console.error("Wishlists fetched failed:", error);
      });
    }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchCategories()
      dispatch(clearWishlistData())
      fetchWishlists(1)
    });
    return () => unsubscribe();
  },[]); 

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => console.log("pressed...")}>
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
            <Image source={{ uri: item.image_url }} alt="image" resizeMode="cover" />
          </AspectRatio>
        </Box>
      </Box>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        mx={5}
        mt={5}
      >
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
            rightElement={
              <Icon color="black" name="search-outline" onPress={fetchWishlists} style={styles.inputInnerIcon} size={20} />
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
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            ref={categoryRef} 
            onValueChange={(itemValue) => handleSortInput(itemValue)}
          >
            {categories?.map((categoryItem) => (
              <Select.Item
                label={categoryItem.name}
                value={categoryItem.id}
                key={categoryItem.id}
              />
            ))}
            <Select.Item
                label={'All'}
                value={''}
                key={''}
              />
          </Select>
        </Box>
      </Box>

      <View style={{ flex: 1 }}>
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
            <RefreshControl
              refreshing={isLoading}
              onRefresh={onRefresh}
            />
          }
          ListEmptyComponent={() => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , marginTop: 30}}>
              <Text>No data...</Text>
            </View>
          )}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputInnerIcon:{
    paddingRight: 10
  },
});
export default WishlistScreen;
