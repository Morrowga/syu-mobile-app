import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AspectRatio, Image, Stack, Box, Heading, FlatList } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import SuccessBox from "../../components/SuccessBox";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getThemeData } from "../../api/theme";
const { width: viewportWidth } = Dimensions.get("window");
const HomeScreen = () => {
  const route = useRoute();
  const { order_id, isOpen } = route.params || {};
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { authData } = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme);
  const data = [
    {
      id: 1,
      name: "Feeds",
      url: "https://i.pinimg.com/564x/62/25/11/6225112c610b1d75a888ed2ed9997a39.jpg",
      route: "Feeds",
    },
    {
      id: 2,
      name: "Customization",
      url: "https://i.pinimg.com/736x/3e/b2/a1/3eb2a13096448488940afec4a2191e35.jpg",
      route: "Customization",
    },
  ];

  const carousels = [
    {
      title: "Item 1",
      url: "https://i.pinimg.com/564x/b1/c7/1f/b1c71f494c11bf67bd333b8943c1340d.jpg",
    },
    {
      title: "Item 2",
      url: "https://i.pinimg.com/564x/b1/c7/1f/b1c71f494c11bf67bd333b8943c1340d.jpg",
    },
    {
      title: "Item 3",
      url: "https://i.pinimg.com/564x/b1/c7/1f/b1c71f494c11bf67bd333b8943c1340d.jpg",
    },
    {
      title: "Item 4",
      url: "https://i.pinimg.com/564x/b1/c7/1f/b1c71f494c11bf67bd333b8943c1340d.jpg",
    },
    {
      title: "Item 5",
      url: "https://i.pinimg.com/564x/b1/c7/1f/b1c71f494c11bf67bd333b8943c1340d.jpg",
    },
  ];

  useEffect(() => {
    dispatch(getThemeData());
  }, []);

  const renderItem = ({ item }) => (
    <Box style={{ paddingVertical: 5 }}>
      <TouchableOpacity onPress={() => navigation.navigate(item.route)}>
        <Box
          key={item}
          flex={1}
          width="100%"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          style={{ backgroundColor: theme.app_bg_color }}
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
              <Heading size="sm" style={{ color: theme.app_text_color }}>
                {item.name}
              </Heading>
            </Stack>
          </Stack>
        </Box>
      </TouchableOpacity>
    </Box>
  );

  const carouselItem = ({ item }) => {
    return (
      <View style={[styles.slide, { backgroundColor: theme.app_bg_color }]}>
        <AspectRatio w="100%" ratio={16 / 5}>
          <Image source={{ uri: item.url }} alt="image" />
        </AspectRatio>
      </View>
    );
  };

  return (
    <View style={[styles.container]}>
      <Box alignItems="center" paddingY={5}>
        <FlatList
          data={carousels}
          renderItem={carouselItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          pagingEnabled
          decelerationRate="fast"
        />
      </Box>
      <Box textAlign="center" alignItems="left" mx={5}>
        <Heading style={{ color: theme.app_text_color }}>
          Welcome To Universe...
        </Heading>
      </Box>
      <FlatList
        my={1}
        data={data}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 10 }}
        keyExtractor={(item) => item.id}
      />
      {order_id && isOpen ? <SuccessBox isOpen={isOpen} /> : ""}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width: viewportWidth - 60,
    backgroundColor: "floralwhite",
    borderRadius: 5,
    marginHorizontal: 10,
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 280,
    height: 280,
    resizeMode: "contain",
    // borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
});

export default HomeScreen;
