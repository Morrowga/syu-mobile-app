import { StyleSheet, View,TouchableOpacity,RefreshControl } from "react-native";
import { 
  Heading, 
  Box,
  FlatList,
  Stack, 
  Text, 
  Badge, 
  VStack
} from "native-base";
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../api/order";
import { clearOrderData } from "../../redux/slices/orderSlice";

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { orders,next_page, isLoading } = useSelector((state) => state.order);

  const onRefresh = () => {
    dispatch(clearOrderData())

    fetchOrder(1)
  };

  const getColorScheme = (orderStatus) => {
    switch (orderStatus) {
      case 'pending':
        return 'warning'; 
      case 'completed':
        return 'success'; 
      case 'cancelled':
        return 'danger'; 
      default:
        return 'primary';
    }
  };

  const fetchOrder = (initial_page) =>
  {
    dispatch(getOrders(initial_page ?? next_page))
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', year: 'numeric', hour12: true };
    return date.toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(clearOrderData())
      fetchOrder(1)
    });
    return () => unsubscribe();
  },[]); 

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Order Info', { order: item})}>
    <VStack>
        <Badge colorScheme="danger" alignSelf="flex-end" rounded="full" variant="solid" mb={-3} mt={2} mr={2} zIndex={1} >
          {item.count}
        </Badge>
        <Box
          key={item}
          flex={1}
          width="100%"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700"
          }}
          _web={{
            shadow: 2,
            borderWidth: 0
          }}
          _light={{
            backgroundColor: "gray.50"
          }}
        >
        <Stack p="4" space={3}>
          <Stack flexDirection="row" justifyContent="space-between" space={2}>
            <Box>
              <Heading size="md">
                {item.order_no}
              </Heading>
              <Badge colorScheme={getColorScheme(item.order_status)} fontSize={10} alignSelf="left" mt={3} rounded="full" variant="solid">
                  <Text color="#fff" textTransform="capitalize" fontSize={12}>{item.order_status}</Text> 
              </Badge>
            </Box>
            <Box>
              <Text mt={1} textAlign="right">
                  {item.overall_price}
              </Text>
              <Text mt={3} opacity={0.3} textAlign="right">
                  {formatDate(item.created_at)}
              </Text>
            </Box>
          </Stack>
        </Stack>
      </Box>
      </VStack>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList data={orders} renderItem={renderItem} 
         contentContainerStyle={{ padding: 10 }}
         keyExtractor={item => item.id} 
         refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  )
};
const styles = StyleSheet.create({
});
export default OrderListScreen;
