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
import { useEffect } from "react";
import { useNavigation } from '@react-navigation/native';


const OrderInfoScreen = () => {

  const orderStatus = false;
  let buttonBottom;
  let orderName;

  if(orderStatus)
  {
    buttonBottom = <Button w="full" variant="outline" rounded="full">
    Save Gallery
    </Button> 
  } else {
    buttonBottom = 
    <Box w="full">
      <Text fontWeight="bold" p={2}>Order Status - Pending</Text>
      <Button colorScheme="danger" variant="outline" rounded="full">
      Payment Action Needed
      </Button> 
    </Box>
  }

  
  const orderDetails = [
    { id: 1, name: 'Stickers', total_count: 2,total_amt: 4000 },
    { id: 2, name: 'Badges', total_count: 5, total_amt: 3000 },
    { id: 3, name: 'Posters',total_count: 10, total_amt: 2000 }
  ];

  const navigation = useNavigation();

  const route = useRoute();

  useEffect(() => {
    const { params } = route;

    const { order_id, order_name } = params;

    navigation.setOptions({
      title: order_name,
      headerBackTitle: "Back",
    });

    orderName = order_name
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
                <Heading size="sm">
                    {item.name}
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
                  QTY: {item.total_count}
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
                source={require("../../../assets/innerlogo.png")}
                alt="Logo Image"
                style={{
                  width: 90,
                  height: 90,
                  resizeMode: "contain",
                }}
              />
              <Box my={5}>
                  <Text fontSize={12}>Order No : Order#1234</Text>
                  <Text fontSize={12}>Name : Thi Ha Aung</Text>
              </Box>
            </Box>
            <Box>
              <FlatList data={orderDetails} renderItem={renderItem} 
                contentContainerStyle={{ padding: 10 }}
                keyExtractor={item => item.id} 
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
                  10000 Ks
              </Text>
            </Box>
          </Box>
          <HStack m={5} justifyContent="flex-end">
             {buttonBottom} 
          </HStack>
        </View>
      )
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
export default OrderInfoScreen;
