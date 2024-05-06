import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { 
  AspectRatio, 
  Image, 
  Stack, 
  Box, 
  Heading, 
  FlatList 
} from "native-base";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {

  const navigation = useNavigation();

  const data = [
    {
      id: 1,
      name: "Feeds",
      url: "https://i.pinimg.com/564x/62/25/11/6225112c610b1d75a888ed2ed9997a39.jpg",
      route: 'Feeds'
    },
    {
      id: 2,
      name: "Customization",
      url: "https://i.pinimg.com/736x/3e/b2/a1/3eb2a13096448488940afec4a2191e35.jpg",
      route: 'Customization'
    },
  ];
  const renderItem = ({ item }) => (
    <Box>
    <TouchableOpacity
        onPress={() =>
        navigation.navigate(item.route)
      }
    >
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
          backgroundColor: "gray.700",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
      >
        <Box>
          <AspectRatio w="100%" ratio={16 / 5}>
            <Image source={{ uri: item.url }} alt="image" />
          </AspectRatio>
        </Box>
        <Stack p="4" space={3}>
          <Stack flexDirection="row" justifyContent="space-between" space={2}>
            <Heading size="sm">{item.name}</Heading>
          </Stack>
        </Stack>
      </Box>
    </TouchableOpacity>
    </Box>
   
  );

  return (
    <View style={styles.container}>
      <Box alignItems="center">
          <Image
            source={require("../../../assets/innerlogo.png")}
            alt="Logo Image"
            style={{
              width: 280,
              height: 280,
              resizeMode: "contain",
            }}
          />
      </Box>
      <Box textAlign="center" alignItems="left" mx={5}>
        <Heading>Welcome To Universe...</Heading>
      </Box>
      <FlatList
        my={1}
        data={data}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 10 }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({});

export default HomeScreen;
