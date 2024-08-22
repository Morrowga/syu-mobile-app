import { StyleSheet, View,TouchableOpacity,RefreshControl } from "react-native";
import { 
  Heading, 
  Box,
  FlatList,
  Stack, 
  Text, 
  Badge, 
  VStack,
  Skeleton,
  HStack,
  Spinner
} from "native-base";
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { getOrders, checkOrders } from "../../api/order";
import { clearOrderData } from "../../redux/slices/orderSlice";
import { formatDate } from "../../helpers/general";
import MainStyles from "../../components/styles/MainStyle";

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
      case 'confirmed':
        return 'success'; 
      case 'expired':
        return 'danger'; 
      case 'cancel':
        return 'danger'; 
      case 'delivered':
        return 'success'; 
      default:
        return 'primary';
    }
  };

  const onEndReached = () => {
    if (!isLoading && next_page > 1) {
      fetchOrder();
    }
  };

  const fetchOrder = (initial_page) =>
  {
    dispatch(getOrders(initial_page ?? next_page))
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(clearOrderData())
      fetchOrder(1)
      dispatch(checkOrders())
    });
    return () => unsubscribe();
  },[]); 

  const renderItem = ({ item }) => (
    <TouchableOpacity key={item.id} onPress={() => navigation.navigate('Order Info', { order_id: item.id})}>
    <VStack>
        <Box
          key={item.id}
          flex={1}
          mt={4}
          width="100%"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.300"
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
          <Skeleton isLoaded={item !== undefined} startColor="#f3f3f3" endColor="#d9d9d9">
            <Stack style={{...MainStyles.flexRowBetween}} space={2}>
                <Box>
                    <Heading size="sm">
                      <Text style={MainStyles.normalFont}>
                        {item.order_no}
                      </Text>
                    </Heading>
                    <Box style={{flexDirection: 'row', justifyContent: 'start'}}>
                      <Badge colorScheme={'gray'} fontSize={10} alignSelf="left" mt={3} rounded="full" variant="solid">
                          <Text color="#fff" textTransform="capitalize" fontSize={12} style={MainStyles.normalFont}>{item.payment_type == 'pp' ? 'Pre Paid' : 'Cash On Delivery'}</Text> 
                      </Badge>
                      <Badge colorScheme={getColorScheme(item.order_status)} fontSize={10} alignSelf="left" mt={3} mx={1} rounded="full" variant="solid">
                          <Text color="#fff" textTransform="capitalize" fontSize={12} style={MainStyles.normalFont}>{item.order_status}</Text> 
                      </Badge>
                    </Box>
                    <Text mt={3} opacity={0.3} textAlign="right" style={MainStyles.normalFont}>
                        {formatDate(item.created_at)}
                    </Text>
                </Box>
              <Box>
                <Text mt={1} textAlign="right" style={MainStyles.normalFont}>
                    {parseInt(item.total_price)} Ks
                </Text>
              </Box>
            </Stack>
          </Skeleton>
        </Stack>
      </Box>
      </VStack>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        {!isLoading && orders?.length > 0 && (
          <FlatList
            data={orders}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 10 }}
            keyExtractor={(item) => item.id}
            refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.1}
          />
        )}
        {isLoading && 
          <View style={styles.loadingContainer}>
            <HStack space={2} justifyContent="center">
              <Spinner color="#000" accessibilityLabel="Loading posts" />
            </HStack>
          </View>
        }
        {!isLoading && orders?.length === 0 && (
          <View style={styles.noOrdersContainer}>
            <Text style={styles.noOrdersText}>No orders in your order list</Text>
          </View>
        )}
      </View>
    </View>
  )
};
const styles = {
  container: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noOrdersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noOrdersText: {
    textAlign: 'center',
    opacity: 0.3,
  },
};
export default OrderListScreen;
