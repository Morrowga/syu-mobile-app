import { StyleSheet, Text, View,TouchableOpacity } from "react-native";
import { AspectRatio, Image, Stack, Box,Heading,FlatList } from "native-base";
import { useNavigation } from '@react-navigation/native';


const FeedsScreen = () => {
  
  const navigation = useNavigation();

  const data = [
    { id: 1, name: "Stickers", url: 'https://i.pinimg.com/564x/83/4f/0f/834f0f52baf0e41b7d00ca0a3f576c82.jpg' },
    { id: 2, name: "Badges", url: 'https://i.pinimg.com/564x/74/03/4a/74034a50354130d58c51f668dab33dda.jpg' },
    { id: 4, name: "Posters", url: 'https://i.pinimg.com/564x/b8/d7/56/b8d7563fcd90b660f05358844380171b.jpg' },
  ];
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Product List', { category_id: 1, category_name: item.name})}>
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
      <Box>
        <AspectRatio w="100%" ratio={16 / 5}>
          <Image
            source={{ uri: item.url }}
            alt="image"
          />
        </AspectRatio>
      </Box>
      <Stack p="4" space={3}>
        <Stack flexDirection="row" justifyContent="space-between" space={2}>
          <Heading size="md">
            {item.name}
          </Heading>
          <Text fontSize="xs" _light={{ color: "violet.500" }} _dark={{ color: "violet.400" }} fontWeight="500">
            1000+ Design
          </Text>
        </Stack>
      </Stack>
    </Box>
  </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList data={data} renderItem={renderItem} 
        contentContainerStyle={{ padding: 10 }}
        keyExtractor={item => item.id} 
      />
    </View>
  )
};
const styles = StyleSheet.create({
});

export default FeedsScreen;