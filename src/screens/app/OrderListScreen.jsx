import { StyleSheet, View,TouchableOpacity,RefreshControl } from "react-native";
import { 
  AspectRatio,
  Heading, 
  Box,
  FlatList,
  Stack, 
  Text, 
  Badge, 
  VStack,
  Image,
  Divider,
} from "native-base";
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../api/order";
import { clearOrderData } from "../../redux/slices/orderSlice";
import moment from 'moment';

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

  const limitImages = (products) => {
    return products.slice(0, 2)
  }

  const formatTimeDifference = (expirationDate) => {
    const expiration = moment(expirationDate);
    const current = moment();
    const duration = moment.duration(expiration.diff(current));
    
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();

    return `${days} days ${hours} hours ${minutes} minutes`;
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
    <TouchableOpacity onPress={() => navigation.navigate('Order Info', { order_id: item.id})}>
    <VStack>
        <Box
          key={item}
          flex={1}
          mt={2}
          width="100%"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.350"
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
                  {item.overall_price} MMK
              </Text>
              <Text mt={3} opacity={0.3} textAlign="right">
                  {formatDate(item.created_at)}
              </Text>
            </Box>
          </Stack>
          <Box display="grid" justifyContent="end" w="full">
            <Divider
              my="2"
              px={5}
              _light={{ bg: "gray.300" }}
              _dark={{ bg: "gray.50" }}
            />
          </Box>
          <View
            style={{
              position: 'relative',
            }}
          >
            <View>
              {limitImages(item.products).map((product, index) => (
                <AspectRatio key={index} ratio={16 / 3}>
                  <Image
                    source={{ uri: product.image_url }}
                    alt={product.name}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </AspectRatio>
              ))}
            </View>
          </View>
          <Box flexDirection="row" justifyContent="space-between">
              <Text fontWeight={500}>
                Order expire in <Text color="red.300">{formatTimeDifference(item.order_expired_date)}</Text>
              </Text>
          </Box>
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
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
      />
    </View>
  )
};
const styles = StyleSheet.create({
  
});
export default OrderListScreen;
