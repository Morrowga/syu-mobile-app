import { StyleSheet, Text, View, TouchableOpacity,RefreshControl } from "react-native";
import { 
  AspectRatio, 
  Image, 
  Stack, 
  Box, 
  Heading, 
  Skeleton,
  FlatList 
} from "native-base";
import { useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../api/feed";
import MainStyles from "../../components/styles/MainStyle";

const FeedsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { isError, error_message, categories, isLoading } = useSelector((state) => state.feed);

  const fetchCategories = () =>
  {
    const filter = {
      per_page: 10,
      page: 1
    }
    
    dispatch(getCategories(filter))

    console.log(categories);
  }
  
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchCategories()
    });
    return () => unsubscribe();
  },[]); 

  const onRefresh = () => {
    fetchCategories()
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Product List", {
          category: item,
        })
      }
    >
      <Box
        key={item}
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
        <Box>
          <Skeleton isLoaded={item.image_url !== undefined} startColor="#f3f3f3" height={120} endColor="#d9d9d9">
            <AspectRatio w="100%" ratio={16 / 5}>
              <Image
                  source={
                    item.image_url
                        ? { uri: item.image_url }
                        : ''
                  }
                  alt={''}
                  style={{ width: '100%', height: '100%' }}
              />
              {/* <LazyLoadImage source={item.image_url} alt="image" /> */}
            </AspectRatio>
          </Skeleton>
        </Box>
        <Stack p="4" space={3}>
          <Skeleton isLoaded={item.name !== undefined} height={6}>
            <Stack style={{...MainStyles.flexRowBetween}} space={2}>
                <Heading size="md" style={{...MainStyles.titleFont, ...MainStyles.textShadow}} textTransform='capitalize'>{item.name}</Heading>
                <Text
                  style={MainStyles.normalFont}
                  fontSize="xs"
                  _light={{ color: "violet.500" }}
                  _dark={{ color: "violet.400" }}
                  fontWeight="500"
                >
                  {item.total_product_count >= 1 ?  item.total_product_count + ' Designs' : '0 Design'}
                </Text>
              </Stack>
          </Skeleton>
        </Stack>
      </Box>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
       refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
          />
        }
        data={categories}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 10 }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({});

export default FeedsScreen;
