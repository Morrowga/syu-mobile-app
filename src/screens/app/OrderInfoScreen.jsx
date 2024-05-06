import { StyleSheet, View,TouchableOpacity } from "react-native";
import { useRoute } from '@react-navigation/native';
import { Heading, Box,FlatList,Stack, Text, Badge,Divider,Button, VStack} from "native-base";
import { useNavigation } from '@react-navigation/native';
import { useEffect } from "react";

const OrderInfoScreen = () => {

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
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Order Info', { order_id: 1, order_name: item.name})}>
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
                <Heading size="sm" mt={2.5}>
                    {item.name} x {item.total_count}
                </Heading>
                <Text mt={1} color="#20acc1">
                   View Details
                </Text>
              </Box>
              <Box>
                <Text>5000 MMK</Text>
              </Box>
            </Stack>
          </Stack>
        </Box>
        </VStack>
      </TouchableOpacity>
      );

      return (
        <View style={styles.container}>
          <FlatList data={orderDetails} renderItem={renderItem} 
             contentContainerStyle={{ padding: 10 }}
             keyExtractor={item => item.id} 
          />
          <Box w={140}>
            <Divider my="2" px={5} _light={{
                bg: "gray.800"
              }} _dark={{
                bg: "gray.50"
              }} />
          </Box>
        </View>
      )
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
},
});
export default OrderInfoScreen;
