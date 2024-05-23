import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from "react-native";
import {
  AspectRatio,
  Image,
  Stack,
  Box,
  Heading,
  FlatList,
  ScrollView,
} from "native-base";
import { useRef, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import SuccessBox from "../../components/SuccessBox";
import { useDispatch, useSelector } from "react-redux";
import { getThemeData } from "../../api/theme";
import { checkOrders } from "../../api/order";
const { width: viewportWidth } = Dimensions.get("window");

const HomeScreen = ({ navigate }) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
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
      url: "https://i.pinimg.com/originals/e7/d1/fb/e7d1fba4afc3977229252f507b50cf4a.gif",
      route: "Feeds",
    },
    {
      id: 2,
      name: "Customization",
      url: "https://i.pinimg.com/originals/62/82/0a/62820a3251082ac356b5fd45c8cc324f.gif",
      route: "Customization",
    },
  ];

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(getThemeData());
      dispatch(checkOrders())
    });

    return () => unsubscribe();
  }, [navigation]);

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
        <AspectRatio w="100%" ratio={16 / 8}>
          <Image source={{ uri: item.image }} borderRadius={10} alt="image" />
        </AspectRatio>
      </View>
    );
  };

  return (
    <View style={[styles.container]}>
      <Box alignItems="center" paddingY={5}>
        <FlatList
          ref={flatListRef}
          data={theme.banners}
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
          Welcome from the universe...
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
    width: viewportWidth - 20,
    borderRadius: 15,
    borderColor: "#898b8c",
    marginHorizontal: 10,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: 10,
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
