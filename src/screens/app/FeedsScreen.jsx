import { StyleSheet, Text, View, TouchableOpacity,RefreshControl } from "react-native";
import { 
  AspectRatio, 
  Image, 
  Stack, 
  Box, 
  Heading, 
  FlatList 
} from "native-base";
import { useEffect,useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { categories } from "../../api/feed";

const FeedsScreen = () => {
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const fetchCategories = () =>
  {
    dispatch(categories())
    .then((resp) => {
      setData(resp.payload.data.data)
      setRefreshing(false);
    })
    .catch((error) => {
      console.error("Categories fetched failed:", error);
    });
  }
  
  useEffect(() => {
    fetchCategories()
  }, []); 

  const onRefresh = () => {
    setRefreshing(true);

    fetchCategories()
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Product List", {
          category_id: item.id,
          category_name: item.name,
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
          <AspectRatio w="100%" ratio={16 / 5}>
            <Image source={{ uri: item.image_url }} alt="image" />
          </AspectRatio>
        </Box>
        <Stack p="4" space={3}>
          <Stack flexDirection="row" justifyContent="space-between" space={2}>
            <Heading size="md">{item.name}</Heading>
            <Text
              fontSize="xs"
              _light={{ color: "violet.500" }}
              _dark={{ color: "violet.400" }}
              fontWeight="500"
            >
              1000+ Design
            </Text>
          </Stack>
        </Stack>
      </Box>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
       refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        data={data}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 10 }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({});

export default FeedsScreen;
