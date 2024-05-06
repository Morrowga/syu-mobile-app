import { StyleSheet, Text, View, TouchableOpacity, LogBox } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import {
  Stack,
  Button,
  Box,
  Badge,
  ScrollView,
  HStack,
  Heading,
  FlatList,
} from "native-base";
import { useNavigation } from "@react-navigation/native";

const NotificationsScreen = () => {
  const navigation = useNavigation();

  const [data, setData] = useState([
    {
      id: 1,
      title: "Hello Title",
      msg: "Hello wolrd",
    },
    {
      id: 2,
      title: "World Title",
      msg: "Hello wolrd",
    },
    {
      id: 3,
      title: "This is notifications",
      msg: "Hello The following code presents the basic usage scenario of this library.",
    },
  ]);

  const handleRemoveItem = (indexToRemove) => {
    setData((prevData) =>
      prevData.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleRemoveAllItem = () => {
    setData([]);
  };

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity style={styles.touchParent}>
      <Badge
        colorScheme="danger"
        rounded="full"
        w={5}
        h={5}
        mb={-11}
        ml={-1}
        alignSelf="start"
        zIndex={11}
        variant="solid"
        _text={{
          fontSize: 12,
        }}
      ></Badge>
      <Box
        key={index}
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
        <Stack p="4" space={3}>
          <Stack flexDirection="row" justifyContent="space-between" space={2}>
            <Box w="90%">
              <Heading size="xs">{item.title}</Heading>
            </Box>
            <Box w="10%">
              <TouchableOpacity onPress={() => handleRemoveItem(index)}>
                <Badge
                  colorScheme="dark"
                  alignSelf="flex-end"
                  w={7}
                  h={7}
                  mt={-2}
                  mr={-2}
                  rounded="full"
                  zIndex={11}
                  variant="solid"
                  _text={{
                    fontSize: 12,
                  }}
                >
                  <Icon
                    name="close-outline"
                    size={10}
                    color="black"
                    onPress={() => handleRemoveItem(index)}
                  />
                </Badge>
              </TouchableOpacity>
            </Box>
          </Stack>
          <Stack>
            <Text>{item.msg}</Text>
          </Stack>
        </Stack>
      </Box>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <FlatList
          data={data}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 10 }}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
      <TouchableOpacity>
        <HStack m={5} justifyContent="flex-end">
          <Button
            w="full"
            colorScheme="danger"
            variant="outline"
            onPress={() => handleRemoveAllItem()}
            rounded="full"
          >
            Clear all
          </Button>
        </HStack>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 3,
  },
  touchParent: {
    marginTop: 5,
  },
});
export default NotificationsScreen;
