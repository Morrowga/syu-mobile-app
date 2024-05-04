import { StyleSheet, View, TouchableOpacity } from "react-native";
import { AspectRatio, Image, Box,FlatList, Input,Select,CheckIcon} from "native-base";

const WishlistScreen = () => {
    const categories = [
        { id: 1, name: 'Stickers' },
        { id: 2, name: 'Badges' },
        { id: 3, name: 'Posters' }
    ];

  const data = [
    { id: 1, url: "https://i.pinimg.com/564x/96/b8/a3/96b8a3fb97906b5e2ff29fff3e205c26.jpg" },
    { id: 2, url: "https://i.pinimg.com/564x/b1/c7/1f/b1c71f494c11bf67bd333b8943c1340d.jpg" },
    { id: 3, url: "https://i.pinimg.com/564x/a1/e8/08/a1e808211ef66a56fc430b58805e9e90.jpg" },
    { id: 4, url: "https://i.pinimg.com/564x/49/5b/ad/495bade2bf589665a804c26e21ec993a.jpg" },
    { id: 5, url: "https://i.pinimg.com/564x/0f/e9/93/0fe993d90864db5b8bd14518eceed654.jpg" },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => console.log('pressed...')}>
        <Box 
              key={item}
              maxW="180"
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
                <AspectRatio w="100%" ratio={16 / 16}>
                <Image
                    source={{ uri: item.url }}
                    alt="image"
                    resizeMode="cover"
                />
                </AspectRatio>
            </Box>
        </Box>
  </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        <Box flexDirection="row" justifyContent="space-between" mx={5} mt={5}>
            <Box width="57%">
                <Input
                variant="rounded"
                size="xl"
                mt={1}
                backgroundColor="#fff"
                borderColor="#000"
                focusOutlineColor="#000"
                placeholder="Search"
                w="100%"
                />
            </Box>
            <Box width="40%">
                <Select
                variant="rounded"
                size="xl"
                backgroundColor="#fff"
                borderColor="#000"
                focusOutlineColor="#000"
                accessibilityLabel="Sort"
                placeholder="Sort"
                _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />
                }}
                mt={1} 
                onValueChange={itemValue => console.log(itemValue)}
                >
                {categories.map((category) => (
                    <Select.Item label={category.name} value={category.id} key={category.id} />
                ))}
                </Select>
            </Box>
        </Box>

     
      <FlatList mt={4} data={data} renderItem={renderItem} 
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ padding: 10 }}
        keyExtractor={item => item.id} 
      />
    </View>
  )
};
const styles = StyleSheet.create({
});
export default WishlistScreen;
