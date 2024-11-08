import { StyleSheet, Text, View,TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useEffect } from "react";
import { useRoute } from '@react-navigation/native';
import {
  Image,
  HStack,
  Stack,
  Box,
  FlatList,
  Heading,
  Skeleton,
} from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../../api/order";
import MainStyles from "../../components/styles/MainStyle";

const OrderCategoryDetailScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { product_detail, isLoading } = useSelector((state) => state.order);

  const route = useRoute();

  const fetchProductDetail = (orderId, categoryId) =>
  {
    const filter = {
      order_id: orderId,
      category_id: categoryId
    }
    dispatch(getProductDetail(filter))
  }
  

  useEffect(() => {

    const { params } = route;

    const { category_name, order_name, order_id, category_id } = params;

    fetchProductDetail(order_id, category_id)

    navigation.setOptions({
      headerTitle: () => <Heading style={[MainStyles.titleFont, {fontSize: 17}]} textTransform='capitalize'>{`${order_name} (${category_name})`}</Heading>,
      headerBackTitle: "Back",
    });

  }, []);

  const data = [
    {
      id: 1,
      url: "https://i.pinimg.com/564x/96/b8/a3/96b8a3fb97906b5e2ff29fff3e205c26.jpg",
      totalPrice: 1000,
      qty: 3,
      size: '3 x 3',
    },
    {
      id: 2,
      url: "https://i.pinimg.com/564x/b1/c7/1f/b1c71f494c11bf67bd333b8943c1340d.jpg",
      totalPrice: 2000,
      qty: 3,
      size: '3 x 3',
    },
    {
      id: 3,
      url: "https://i.pinimg.com/564x/a1/e8/08/a1e808211ef66a56fc430b58805e9e90.jpg",
      totalPrice: 3000,
      qty: 3,
      size: '3 x 3',
    },
    {
      id: 4,
      url: "https://i.pinimg.com/564x/49/5b/ad/495bade2bf589665a804c26e21ec993a.jpg",
      totalPrice: 4000,
      qty: 3,
      size: '3 x 3',
    },
    {
      id: 5,
      url: "https://i.pinimg.com/564x/0f/e9/93/0fe993d90864db5b8bd14518eceed654.jpg",
      totalPrice: 5000,
      qty: 3,
      size: '3 x 3',
    },
  ];

  const renderItem = ({ item, index }) => (
    <TouchableOpacity>
        <Box
          key={index}
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
          <Skeleton isLoaded={item !== undefined} startColor="#f3f3f3" height={90} endColor="#d9d9d9">
            <Stack p="4" space={3}>
              <HStack flexDirection="row" alignItems="center" space={2}>
                <Image
                  source={{ uri: item.image_url }}
                  alt="image"
                  resizeMode="cover"
                  w={50}
                  h={50}
                />
                <Stack>
                  <Heading textAlign="left" size="xs" style={{...MainStyles.normalFont}}>{item?.quality?.name + ' ( ' + item?.size?.name + ' )'} </Heading>
                  <Heading textAlign="left" size="xs" my={2} style={{...MainStyles.normalFont}}>{item?.size?.size} </Heading>
                  <Text style={{marginTop: 5,...MainStyles.normalFont}}>QTY: {item.qty} x {item.per_amt} = {item.total_amt} </Text>
                </Stack>
              </HStack>
            </Stack>
          </Skeleton>
        </Box>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
       <FlatList
        data={product_detail}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 10 }}
        keyExtractor={(item,index) => index}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default OrderCategoryDetailScreen;
