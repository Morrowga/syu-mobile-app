import { StyleSheet, Text, View, TouchableOpacity, LogBox } from "react-native";
import React, { useEffect } from "react";
import {
  Stack,
  Button,
  Box,
  Badge,
  HStack,
  Heading,
  FlatList,
  Spinner,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import MainStyles from "../../components/styles/MainStyle";
import { clearNotification, deleteNotification, getNotifications, readNotification } from "../../api/notification";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RefreshControl } from "react-native-gesture-handler";
 
const NotificationsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const {notifications, isLoading, isError} = useSelector((state) => state.notification);

  const deleteItem = (id) => {
    dispatch(deleteNotification(id))
    dispatch(getNotifications());
  };

  const goDetail = (orderId, id) => {
    dispatch(readNotification(id));
    
    navigation.navigate('Order Info', { order_id: orderId})
  }

  const onRefresh = () => {
    dispatch(getNotifications());
  };

  const handleRemoveAllItem = () => {
    dispatch(clearNotification()) 
  };

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    console.log(notifications);
  }, []);

  const renderItem = ({ item, index }) => (
    <Box style={styles.touchParent}>
      {item?.read_at == null && 
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
      }
      <Box
        key={index}
        flex={1}
        width="100%"
        rounded="lg"
        overflow="hidden"
        borderColor={item?.read_at == null ? '#000' : 'coolGray.200'}
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
        <Stack p="3" space={3}>
          <Stack style={{...MainStyles.flexRowBetween}} space={2}>
            <Box w="90%">
              <Heading size="xs" style={{...MainStyles.titleFont}}>{item?.data?.title}</Heading>
            </Box>
          </Stack>
          <Stack>
            <Text style={{...MainStyles.normalFont, padding: 1}}>{item?.data?.message}</Text>
          </Stack>
          <Stack style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => goDetail(item?.data?.screen_id, item?.id)}>
              <Text style={{...MainStyles.normalFont, lineHeight: 30, fontSize: 12, color: "#044fc7"}}>
                ကြည့်ရန်
              </Text>
            </TouchableOpacity>
            <Text style={{...MainStyles.normalFont, lineHeight: 30, fontSize: 12, color: "#000", marginLeft: 5, marginRight: 5}}>
              |
            </Text>
            <TouchableOpacity onPress={() => deleteItem(item?.id)}>
              <Text style={{...MainStyles.normalFont, lineHeight: 30, fontSize: 12, color: "red"}}>
                ဖျက်ရန်
              </Text>
            </TouchableOpacity>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        {!isLoading && 
          <FlatList
            flex={1}
            data={notifications}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 10 }}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
            }
          />
        }
        {isLoading &&
          <View style={styles.loadingContainer}>
            <HStack space={2} justifyContent="center">
              <Spinner color="#000" accessibilityLabel="Loading posts" />
            </HStack>
          </View>
        }
        {(!isLoading && notifications?.length == 0) &&
          <View style={{flex: 2, alignItems: 'center'}}>
            <Text style={{alignContent: 'center', opacity: 0.3}}>Empty notifications</Text>
          </View>
        }
        {notifications.length > 0 && 
        <TouchableOpacity>
          <HStack m={5} justifyContent="flex-end">
            <Button
              variant="outline"
              onPress={() => handleRemoveAllItem()}
              rounded="full"
              style={{
                backgroundColor: theme?.app_button_color,
                width: "100%",
                marginTop: 8,
              }}
            >
              <Box style={{ ...MainStyles.flexRowCenter }}>
                    <Box style={{marginTop: 5, marginRight: 4}}>
                      <MaterialCommunityIcons name="broom" style={{color: '#fff'}} size={20} />
                    </Box>
                    <Text style={{ lineHeight: 30, color: "#fff" }}>
                      ရှင်းလင်းမည်
                    </Text>
                  </Box>
            </Button>
          </HStack>
        </TouchableOpacity>
        }
      </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
});
export default NotificationsScreen;
