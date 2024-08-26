import { StyleSheet, View, Alert, TouchableOpacity } from "react-native";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import {
  Heading,
  Box,
  FlatList,
  HStack,
  Text,
  Divider,
  Button,
  Image,
  VStack,
  Stack,
  Spinner,
} from "native-base";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder, getOrderDetail } from "../../api/order";
import { getCategories } from "../../api/feed";
import Icon from "react-native-vector-icons/Ionicons";
import { selectCategorizedProducts } from "../../redux/selectors/orderSelectors";
import MainStyles from "../../components/styles/MainStyle";
import { capitalize, formatDate } from "../../helpers/general";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import ActionConfirmModalBox from "../../components/ActionConfirmModal";
import moment from "moment";

const OrderInfoScreen = () => {
  const viewShotRef = useRef(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { params } = route;
  const theme = useSelector((state) => state.theme);
  const [timeLeft, setTimeLeft] = useState('');

  const { order_id } = params;
  const { order_detail,isLoading } = useSelector((state) => state.order);
  const [textVisible, setTextVisible] = useState(true);
  const { isError, error_message, categories } = useSelector(
    (state) => state.feed
  );
  const categorizedProducts = useSelector(selectCategorizedProducts);
  const [isOpen, setIsOpen] = useState(false);

  const getThemeData = () => {
    const theme = useSelector((state) => state.theme);
  
    return theme;
  };

  const cancelUserOrder = () => {
    dispatch(cancelOrder(order_detail?.id))
    .unwrap()
    .then((resp) => {
      Alert.alert(
        "Success",
        "Order is now canceled",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Orders")
          }
        ],
        { cancelable: false }
      );
    })
    .catch((error) => {
      Alert.alert('Oop! Something went wrong', 'Internal Server happened')
    });
  }
  

  const orderStatus = order_detail?.order_status;
  let buttonBottom;

  const fetchCategories = () => {
    const filter = {
      per_page: 10,
      page: 1,
    };

    dispatch(getCategories(filter));
  };

  const closeModal = () => {
    setIsOpen(false)
  };

  const requestPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission required", "Permission to access media library is required to save images.");
    return false;
    }
    return true;
  };

  const captureView = async () => {
    setTextVisible(false);
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    viewShotRef.current.capture().then(async uri => {
      try {
        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync('Download', asset, false);
        Alert.alert('Image saved', 'Image has been saved to your gallery.');
        setTextVisible(true);
      } catch (error) {
        console.error("Error saving image", error);
      }
    }).catch(error => {
      console.error("Error capturing view", error);
    });
  };

  useFocusEffect(
    useCallback(() => {
      const calculateHoursLeft = () => {
        const now = moment();
        const expirationDate = moment(order_detail?.order_expired_date);
        const diff = expirationDate.diff(now);

        if (diff <= 0) {
          setTimeLeft('Expired');
        } else {
          const duration = moment.duration(diff);
          setTimeLeft(`${Math.floor(duration.asHours())}`);
        }
      };

      calculateHoursLeft();

    }, [order_detail])
  );

  switch (orderStatus) {
    case "confirmed":
      buttonBottom = (
        <>
        <HStack mx={5} justifyContent="flex-end">
          <Button w="full" bg={theme.app_button_color} onPress={captureView} rounded="full">
            <Box style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Box style={{marginTop: 3, marginRight: 4}}>
                  <Icon name="image-outline" style={{color: '#fff'}} size={20} />
                </Box>
                <Text style={{lineHeight: 30, color: '#fff'}}>
                  သိမ်းဆည်းမည်
                </Text>
              </Box>
          </Button>
        </HStack>
        <HStack mx={5} mt={1.5} mb={6} justifyContent="flex-end">
          {order_detail?.payment_type == 'cod'  && timeLeft != 'Expired'
            ?  
            <Button w="full" background="red.500" onPress={() => setIsOpen(true)} rounded="full">
              <Box style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <Box style={{marginTop: 3, marginRight: 4}}>
                    <Icon name="trash-outline" style={{color: '#fff'}} size={20} />
                  </Box>
                  <Text style={{lineHeight: 30, color: '#fff'}}>
                    အော်ဒါပယ်ဖျက်မည် ({' Left ' + timeLeft + ' hours'} )
                  </Text>
                </Box>
            </Button>
            :
            ''
          }
          
        </HStack>
        <ActionConfirmModalBox
          isOpen={isOpen}
          onClose={closeModal}
          onSubmit={cancelUserOrder}
          theme={theme}
          txt={'Cancel'}
        />
        </>
      );
      break;
    case "delivered":
      buttonBottom = (
        <HStack m={5} justifyContent="flex-end">
          <Button w="full" bg={theme.app_button_color} onPress={captureView} rounded="full">
            <Box style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Box style={{marginTop: 3, marginRight: 4}}>
                  <Icon name="image-outline" style={{color: '#fff'}} size={20} />
                </Box>
                <Text style={{lineHeight: 30, color: '#fff'}}>
                  သိမ်းဆည်းမည်
                </Text>
              </Box>
          </Button>
        </HStack>
      );
      break;
    case "cancel":
      buttonBottom = (
        <HStack m={10} justifyContent="flex-end">
          <Box w="full">
            <Text fontWeight="bold" textAlign="center" color="#f4372d" p={2}>
               ယခု အော်ဒါ အား ပယ်ဖျက်ပြီးပါပြီ။ 
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Feeds")}>
              <Text fontWeight="bold" textAlign="center" fontSize={13} color="#044fc7" p={2}>
                အသစ်ထပ် မှာရန် နှိပ်ပါ။
              </Text>
            </TouchableOpacity>
          </Box>
        </HStack>
      );
      break;
    case "pending":
      buttonBottom = (
        <HStack m={5} justifyContent="flex-end">
          <Box w="full">
            <Text
              fontWeight="bold"
              color="#fe9c08"
              p={2}
              style={{lineHeight: 30}}
              textTransform="capitalize"
            >
              လူကြီးမင်း ၏ အော်ဒါ ငွေပေးချေ ချိန်ကုန်ဆုံးရန် {timeLeft} နာရီ သာ ကျန်ပါတော့သည်။
            </Text>
            <Button w="full" background={theme.app_button_color} onPress={() => navigation.navigate("Make Payment", {order_id: order_detail?.id})} rounded="full">
              <Box style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <Box style={{marginTop: 3, marginRight: 4}}>
                    <Icon name="cash-outline" style={{color: '#fff'}} size={20} />
                  </Box>
                  <Text style={{lineHeight: 30, color: '#fff'}}>
                    ငွေပေးချေရန်
                  </Text>
                </Box>
            </Button>
          </Box>
        </HStack>
      );
      break;
    default:
      buttonBottom = (
        <HStack m={5} justifyContent="flex-end">
          <Box w="full">
            <Button
              colorScheme="secondary"
              disabled
              variant="outline"
              rounded="full"
            >
              Unkown Status
            </Button>
          </Box>
        </HStack>
      );
      break;
  }

  const fetchOrderDetail = () => {
    dispatch(getOrderDetail(order_id));
  };

  useEffect(() => {
    fetchOrderDetail();

    fetchCategories();

    navigation.setOptions({
      headerTitle: () => <Heading style={[MainStyles.titleFont]} textTransform='capitalize'>{order_detail?.order_no}</Heading>,
      headerBackTitle: "Back",
    });
  }, []);

  const renderItem = ({ item }) => (
    <VStack>
      <Box
        key={item.id}
        flex={1}
        width="100%"
        overflow="hidden"
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
      >
        <Stack p="3" space={3}>
          <Stack style={{...MainStyles.flexRowBetween}} space={2}>
            <Box>
              <Heading size="sm" textTransform="capitalize" style={MainStyles.titleFont}>
                {item.category}
              </Heading>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Order Category Detail", {
                    category_name: capitalize(item.category),
                    category_id: item.category_id,
                    order_name: order_detail?.order_no,
                    order_id: order_detail?.id,
                  })
                }
              >
                 {textVisible && (
                  <Text style={{...MainStyles.normalFont, lineHeight: 30, fontSize: 12, color: "#044fc7"}}>
                    ကြည့်ရန်
                  </Text>
                )}
              </TouchableOpacity>
            </Box>
            <Box textAlign="left" style={{width: "20%"}} display="flex" justifyContent="start">
              <Text style={[MainStyles.normalFont]}>Qty : {item.total_qty}</Text>
            </Box>
            <Box>
              <Text style={MainStyles.normalFont}>{item.total_amt} Ks</Text>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </VStack>
  );

  return (
    <View style={styles.container}>
        {
          !isLoading && 
          <>
            <ViewShot ref={viewShotRef} style={styles.container} options={{ format: "jpg", quality: 0.9 }}>
              <Box style={{...MainStyles.flexRowBetween}} mx={5}>
                <Box style={{...MainStyles.flexRowStart}} alignItems="center">
                  <Text style={MainStyles.normalFont} fontSize={20} mx={2} textTransform="capitalize">{order_detail?.order_no}</Text>
                </Box>
                <Box style={{alignContent: 'center', alignItems: 'center', width: '50%'}}>
                  <Image
                    source={{uri: getThemeData()?.app_logo_img}}
                    alt="Logo Image"
                    mt={2}
                    style={{
                      width: 90,
                      height: 90,
                      resizeMode: "contain",
                    }}
                  />
                </Box>
              </Box>
              <Box mx={5} style={{...MainStyles.flexRowStart}}>
                <Icon name="calendar-outline" style={{marginTop: 2.5}} />
                <Text style={MainStyles.normalFont} fontSize={14} mx={2}>{formatDate(order_detail?.created_at, true)}</Text>
              </Box>
              <Box flex={1}>
                <Box style={{width: '100%', ...MainStyles.flexRowBetween}} mt={2}>
                  <Box mx={5} w="50%" style={{...MainStyles.flexRowStart}}>
                    <Icon name="person-outline" style={{marginTop: 8}} />
                    <Text style={{...MainStyles.normalFont, lineHeight: 30}} fontSize={14} mx={1} textTransform="capitalize">{order_detail?.user?.name}</Text>
                  </Box>
                  <Box mx={5} style={{...MainStyles.flexRowStart}}>
                      <Icon name="call-outline" style={{marginTop: 8}} />
                      <Text style={{...MainStyles.normalFont, lineHeight: 30}} fontSize={14} mx={1}>{order_detail?.user?.msisdn}</Text>
                  </Box>
                </Box>
                <Box style={{width: '100%', ...MainStyles.flexRowBetween}} mt={2}>
                  <Box mx={5} style={{...MainStyles.flexRowStart}}>
                      <Icon name="id-card-outline" style={{marginTop: 3}} />
                      <Text style={{...MainStyles.normalFont, textTransform: 'uppercase'}} fontSize={14} mx={2}>{order_detail?.payment_type == 'cod' ? 'Cash on Delivery' : 'PrePaid'}</Text>
                  </Box>
                  {order_detail?.payment_type == 'pp' || order_detail?.order_status == 'pending' &&
                    <Box mx={5} mt={1} style={{...MainStyles.flexRowStart}}>
                        <Icon name="card-outline" style={{marginTop: 3}} />
                        <Text style={{...MainStyles.normalFont, textTransform: 'uppercase'}} fontSize={14} mx={2}>{order_detail?.transaction?.payment_method}</Text>
                    </Box>
                  }
                </Box>
                <Box style={{...MainStyles.flexRowStart}} mb={5} mx={5}>
                    <Icon name="home-outline" style={{marginTop: 19}} size={13} />
                    <Text style={{...MainStyles.normalFont, lineHeight: 30}} pt={3} fontSize={14} mx={2}>
                      {order_detail?.user?.shipping_address + ' , ' + order_detail?.user?.shippingcity?.name_mm} 
                      {order_detail?.user?.extra_address != '' ?  ', ' + order_detail?.user?.extra_address : ''}
                    </Text>
                </Box>
                <Box style={{display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                  <Divider width={'90%'} style={{opacity: 0.8}} /> 
                </Box>
                <Box>
                  <FlatList
                    data={categorizedProducts}
                    renderItem={renderItem}
                    contentContainerStyle={{ padding: 10 }}
                    keyExtractor={(item) => item.id}
                  />
                </Box>
                <Box style={{display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                  <Divider width={'90%'} style={{opacity: 0.8}} /> 
                </Box>
                <Box px={5} py={2} style={{...MainStyles.flexRowBetween}}>
                  <Heading size="xs" style={MainStyles.normalFont}>
                    <Text style={{lineHeight: 30, fontSize: 13}}>
                      အရေအတွက်
                    </Text>
                  </Heading>
                  <Text style={MainStyles.normalFont}>{order_detail?.total_qty}</Text>
                </Box>
                <Box px={5} py={1} style={{...MainStyles.flexRowBetween}}>
                  <Heading size="xs" style={MainStyles.normalFont}>
                  <Text style={{lineHeight: 30, fontSize: 13}}>
                    {order_detail?.user?.shippingcity?.name_en == 'Out Of Area or Gate' ? 'ဂိတ်ချခ' : 'အိမ်အရောက်ပို့ခ'}
                  </Text>
                  </Heading>
                  <Text style={MainStyles.normalFont}>{parseInt(order_detail?.user?.shippingcity?.cost)} Ks</Text>
                </Box>
                <Box px={5} py={1} style={{...MainStyles.flexRowBetween}}>
                  <Heading size="xs" style={MainStyles.normalFont}>
                  <Text style={{lineHeight: 30, fontSize: 13}}>
                    ကျသင့်ငွေ
                  </Text>
                  </Heading>
                  <Text style={MainStyles.normalFont}>{parseInt(order_detail?.total_price)} Ks</Text>
                </Box>
                {(parseInt(order_detail?.save_with_points) != 0) && 
                  <Box px={5} py={1} style={{...MainStyles.flexRowBetween}}>
                    <Heading size="xs" style={MainStyles.normalFont}>
                    <Text style={{lineHeight: 30, fontSize: 13}}>
                      Point သုံးစွဲမှု
                    </Text>
                    </Heading>
                    <Text style={MainStyles.normalFont}>-{parseInt(order_detail?.save_with_points)}</Text>
                  </Box>
                }
                <Box style={{display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginVertical: 10}}>
                  <Divider width={'90%'} style={{opacity: 0.8}} /> 
                </Box>
                <Box px={5} py={1} style={{...MainStyles.flexRowBetween}}>
                  <Heading size="xs" style={MainStyles.titleFont}>
                    <Text style={{lineHeight: 35, fontSize: 17}}>
                      စုစုပေါင်းကျသင့်ငွေ
                    </Text>
                  </Heading>
                  <Text style={{fontWeight: 'bold', fontSize: 17, lineHeight: 30}}>{parseInt(order_detail?.total_price) + parseInt(order_detail?.user?.shippingcity?.cost)} Ks</Text>
                </Box>
              </Box>
            </ViewShot>
            {buttonBottom}
          </>
        }
        {
          isLoading && 
          <View style={styles.loadingContainer}>
          <HStack space={2} justifyContent="center">
            <Spinner color="#000" accessibilityLabel="Loading Detail" />
          </HStack>
        </View>
        }
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5
  },
});
export default OrderInfoScreen;
