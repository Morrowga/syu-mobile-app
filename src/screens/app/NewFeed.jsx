import { StyleSheet, Text, View } from "react-native";
import { AspectRatio, Image, Stack, Box,Heading,VStack, HStack,FlatList } from "native-base";


const NewFeedScreen = () => {
  const data = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 4, name: "Item 4" },
    // Add more items as needed
  ];
  const renderItem = ({ item }) => (
    <Box key={item} maxW="180" height={250} mt={3} rounded="lg" overflow="hidden"  borderColor="coolGray.200" borderWidth="1" _dark={{
      borderColor: "coolGray.600",
      backgroundColor: "gray.700"
      }} _web={{
        shadow: 2,
        borderWidth: 0
      }} _light={{
        backgroundColor: "gray.50"
      }}>
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image source={{
            uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
          }} alt="image" />
          </AspectRatio>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              Badges
            </Heading>
            <Text fontSize="xs" _light={{
            color: "violet.500"
          }} _dark={{
            color: "violet.400"
          }} fontWeight="500" ml="-0.5" mt="-1">
              1000+ Design
            </Text>
          </Stack>
        </Stack>
    </Box>
    );

  return (
    <View style={styles.container}>
      <FlatList data={data} renderItem={renderItem} 
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ padding: 10 }}
        keyExtractor={item => item.id} 
      />
    </View>
  )
};
const styles = StyleSheet.create({
  container: 
  {
    top: 50
  }
});
export default NewFeedScreen;