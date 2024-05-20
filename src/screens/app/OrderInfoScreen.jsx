import { StyleSheet, View,TouchableOpacity } from "react-native";
import { useRoute } from '@react-navigation/native';
import { 
  Heading,
  Box,
  FlatList,
  Stack, 
  Text, 
  Badge,
  Divider,
  Button,
  Image, 
  VStack, 
  HStack
} from "native-base";
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetail } from "../../api/order";
import { getCategories } from "../../api/feed";

const OrderInfoScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const [categorizedProducts, setCategorizedProducts] = useState([]);
  const { order_detail, isLoading } = useSelector((state) => state.order);
  const { isError, error_message, categories } = useSelector((state) => state.feed);
  const orderStatus = order_detail?.order_status;
  let buttonBottom;

  // const getThemeData = () => {
  //   const theme = useSelector((state) => state.theme);
  //   console.log(theme);
  //   return theme;
  // };

  const fetchCategories = () =>
    {
      const filter = {
        per_page: 10,
        page: 1
      }
      
      dispatch(getCategories(filter))
    }

  switch (orderStatus) {
    case 'confirmed':
      buttonBottom = (
        <HStack m={5} justifyContent="flex-end">
          <Button w="full" variant="outline" rounded="full">
            Save Gallery
          </Button>
        </HStack>
      );
    break;
    case 'delivered':
      buttonBottom = (
        <HStack m={5} justifyContent="flex-end">
          <Button w="full" variant="outline" rounded="full">
            Save Gallery
          </Button>
        </HStack>
      );
    break;
    case 'cancel':
      buttonBottom = (
        <HStack m={10} justifyContent="flex-end">
          <Box w="full">
            <Text fontWeight="bold" textAlign="center" color="#f4372d" p={2}>Your order is canceled</Text>
          </Box>
        </HStack>
      );
    break;
    case 'expired':
      buttonBottom = (
        <HStack m={5} justifyContent="flex-end">
          <Box w="full">
            <Text fontWeight="bold" color="#f4372d" p={2} textTransform="capitalize">Order Status - {order_detail?.order_status}</Text>
            <Button colorScheme="success" variant="outline" rounded="full">
              Reorder Again
            </Button>
          </Box>
        </HStack>
      );
    break;
    case 'pending':
      buttonBottom = (
        <HStack m={5} justifyContent="flex-end">
          <Box w="full">
            <Text fontWeight="bold" color="#fe9c08" p={2} textTransform="capitalize">Order Status - {order_detail?.order_status}</Text>
            <Button colorScheme="danger" variant="outline" rounded="full">
              Payment Action Needed
            </Button>
          </Box>
        </HStack>
      );
    break;
    default:
      buttonBottom = (
        <HStack m={5} justifyContent="flex-end">
          <Box w="full">
            <Button colorScheme="secondary" disabled variant="outline" rounded="full">
              Unkown Status
            </Button>
          </Box>
        </HStack>
      );
      break;
  }

  const fetchOrderDetail = (orderId) =>
  {
    dispatch(getOrderDetail(orderId))
  }

  const listCategorizedProducts = () => {
    const updatedCategorizedProducts = [];

    categories?.forEach(category => {
      const productsInCategory = order_detail?.products?.filter(product => product.category_id === category.id);
      if (productsInCategory.length > 0) {
        
        const totalAmt = productsInCategory.reduce((acc, curr) => acc + curr.total_amt, 0);

        const categoryObject = {
          category: category.name,
          products: productsInCategory,
          total_amt: totalAmt
        };

        updatedCategorizedProducts.push(categoryObject);

      }
    });

    setCategorizedProducts(updatedCategorizedProducts);
  }
  
  useEffect(() => {
    const { params } = route;

    const { order_id } = params;

    fetchCategories();

    fetchOrderDetail(order_id)

    listCategorizedProducts()

    navigation.setOptions({
      title: order_detail?.order_no,
      headerBackTitle: "Back",    
    });

  }, []);

  const renderItem = ({ item }) => (
    <VStack>
        <Box 
          key={item}
          flex={1}
          width="100%"
          overflow="hidden"
          _dark={{
          }}
          _web={{
            shadow: 2,
            borderWidth: 0
          }}
          _light={{
          }}
        >
          <Stack p="4" space={3}>
            <Stack flexDirection="row" justifyContent="space-between" space={2}>
              <Box>
                <Heading size="sm" textTransform="capitalize">
                    {item.category}
                </Heading>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Order Category Detail", {
                      category_name: item.name,
                      order_name: orderName
                    })
                  }
                >
                  <Text mt={1} color="#20acc1" 
                  >
                    View Details
                  </Text>
                </TouchableOpacity>
              </Box>
              <Text>
                  QTY: {item.products?.length}
              </Text>
              <Box>
                <Text>{item.total_amt} Ks</Text>
              </Box>
            </Stack>
          </Stack>
        </Box>
    </VStack>
  );

  return (
    <View style={styles.container}>
      <Box flex={1}>
        <Box flexDirection="row" justifyContent="space-between" mx={5}>
          <Image
            source={require('../../../assets/innerlogo.png')}
            alt="Logo Image"
            style={{
            width: 90,
            height: 90,
            resizeMode: "contain",
            }}
          />
          <Box my={5}>
              <Text fontSize={12}>Order No : {order_detail?.order_no}</Text>
              <Text fontSize={12} textTransform="capitalize">Name : {order_detail?.user?.name}</Text>
          </Box>
        </Box>
        <Box>
          <FlatList data={categorizedProducts} renderItem={renderItem} 
            contentContainerStyle={{ padding: 10 }}
            keyExtractor={item => item} 
          />
        </Box>
        <Box display="grid" px={5} justifyContent="end" w="full">
          <Divider my="2" px={5} _light={{ bg: "gray.800" }} _dark={{ bg: "gray.50" }} />
        </Box>
        <Box p={4} flexDirection="row" justifyContent="space-between">
          <Heading size="sm" px="2.5">
              Total Count
          </Heading>
          <Text>
              {order_detail?.count}
          </Text>
        </Box>
        <Box p={4} flexDirection="row" justifyContent="space-between">
          <Heading size="sm" px="2.5">
              Delivery Fees
          </Heading>
          <Text>
              {order_detail?.paid_delivery_cost ? order_detail?.user?.shippingcity?.cost + ' Ks'  : 'Not Included'} 
          </Text>
        </Box>
        <Box p={4} flexDirection="row" justifyContent="space-between">
          <Heading size="sm" px="2.5">
              Total Amount
          </Heading>
          <Text>
              {order_detail?.overall_price} Ks
          </Text>
        </Box>
      </Box>
      {buttonBottom} 
    </View>
  )
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
export default OrderInfoScreen;
