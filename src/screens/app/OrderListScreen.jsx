import { StyleSheet, View,TouchableOpacity } from "react-native";
import { Heading, Box,FlatList,Stack, Text, Badge, VStack} from "native-base";

const OrderListScreen = () => {
  const orders = [
    { id: 1, name: 'Order#1234', order_status_color: 'info', order_status: 'Confirmed' },
    { id: 2, name: 'Order#5678', order_status_color: 'danger', order_status: 'Add Payment' },
    { id: 3, name: 'Order#9101', order_status_color: 'success', order_status: 'Delivered' }
  ];

  const renderItem = ({ item }) => (
<TouchableOpacity onPress={() => console.log('pressed...')}>
<VStack>
    <Badge colorScheme="danger" alignSelf="flex-end" rounded="full" variant="solid" mb={-3} mt={2} mr={2} zIndex={1} >
      2
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
              {item.name}
            </Heading>
            <Badge colorScheme={item.order_status_color} fontSize={10} alignSelf="left" mt={3} rounded="full" variant="solid">
              {item.order_status}
            </Badge>
          </Box>
          <Box>
            <Text mt={1} textAlign="right">
                5000 MMK
            </Text>
            <Text mt={3} opacity={0.3} textAlign="right">
                May, 4 06:00 AM, 2024
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
      />
    </View>
  )
};
const styles = StyleSheet.create({
});
export default OrderListScreen;
