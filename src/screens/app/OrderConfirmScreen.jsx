import {
  AspectRatio,
  Box,
  Button,
  Column,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Row,
  Switch,
  Text,
  View,
} from "native-base";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllCartData } from "../../redux/slices/cartSlice";
import { selectTotalPrice } from "../../redux/selectors/cartSelectors";
import { getPaymentMethods, updatePayment } from "../../api/payment";

const OrderConfirmScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const totalPrice = useSelector(selectTotalPrice);
  const { paymentMethods, isLoading } = useSelector((state) => state.payment);

  const route = useRoute();
  const { params } = route;
  const { order_id } = params;

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [deliveryStatus, setDeliveryStatus] = useState(false);
  const [paymentDetail, setPaymentDetail] = useState({
    name: "",
    account_no: "",
    is_active: false,
  });

  const handleChoosePhoto = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 2],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleClearPhoto = () => {
    setImageUri(null);
    // handleChoosePhoto();
  };
  const getImageBlob = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const confirmUpload = async () => {
    const blob = await getImageBlob(imageUri);
    const formData = new FormData();
    formData.append("payment_method", paymentDetail.name);
    formData.append("paid_delivery_cost", deliveryStatus);
    formData.append("image", blob);

    dispatch(updatePayment({ order_id: order_id, formData: formData })).then(
      (resp) => {
        navigation.navigate("Home", { order_id: order_id, isOpen: true });
      }
    );
  };

  const skipUpload = () => {
    dispatch(deleteAllCartData());
    navigation.navigate("Home", { order_id: 1, isOpen: false });
  };

  const getSelectedPayment = (paymentMethod) => {
    setSelectedPayment(paymentMethod.account_no);
    setPaymentDetail({
      name: paymentMethod.name,
      account_no: paymentMethod.account_no,
      is_active: paymentMethod.is_active,
    });
  };
  const changeStatus = (value) => {
    setDeliveryStatus(value);
  };
  useEffect(() => {
    dispatch(getPaymentMethods());
  }, [dispatch]);
  return (
    <View style={styles.container}>
      {/* <Box mb={5}>
        <InputGroup justifyContent="center">
          <Input
            readOnly
            h={10}
            value={String(totalPrice)}
            minW={70}
            placeholder="nativebase"
          />
          <InputRightAddon children={"KS"} />
        </InputGroup>
      </Box> */}
      <Box>
        <View flexDirection="row" style={{ gap: 5 }} flexWrap="wrap">
          {paymentMethods.map((paymentMethod) => (
            <TouchableOpacity
              key={paymentMethod.account_no}
              style={
                selectedPayment == paymentMethod.account_no ? styles.border : ""
              }
              onPress={() => getSelectedPayment(paymentMethod)}
            >
              <AspectRatio w={20} height={20} ratio={1 / 1}>
                <Image
                  source={{ uri: paymentMethod.image_url }}
                  alt="payment"
                  resizeMode="contain"
                />
              </AspectRatio>
            </TouchableOpacity>
          ))}
        </View>
        {selectedPayment ? (
          <View style={styles.paymentSection}>
            <Input
              readOnly
              value={paymentDetail.name}
              placeholder="nativebase"
            />
            <Input
              readOnly
              value={paymentDetail.account_no}
              placeholder="nativebase"
            />
            {/* <Heading>{paymentDetail.name}</Heading>
            <Heading>{paymentDetail.account_no}</Heading> */}
          </View>
        ) : (
          ""
        )}
      </Box>
      <Box mb={5}>
        <HStack alignItems="center" space={4}>
          <Text>Delivery</Text>
          <Switch size="md" onValueChange={(value) => changeStatus(value)} />
        </HStack>
      </Box>
      <Box style={styles.imageUpload}>
        {imageUri ? (
          <TouchableWithoutFeedback onPress={handleClearPhoto}>
            <Image
              source={{ uri: imageUri }}
              style={styles.imagePreview}
              alt="preview"
            />
          </TouchableWithoutFeedback>
        ) : (
          <TouchableOpacity onPress={handleChoosePhoto}>
            <Icon
              name="cloud-upload"
              size={100}
              style={{ textAlign: "center" }}
            />
            <Heading>Click Here To Upload</Heading>
          </TouchableOpacity>
        )}
      </Box>
      <Box style={styles.buttonContainer}>
        <Button
          w="50%"
          rounded="full"
          onPress={confirmUpload}
          backgroundColor={imageUri ? "primary.600" : "gray.600"}
          disabled={imageUri ? false : true}
        >
          Upload
        </Button>
        <Button back w="50%" rounded="full" onPress={skipUpload}>
          Skip
        </Button>
      </Box>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
  },
  imageUpload: {
    flex: 1,
    // borderWidth: 2,
    // borderRadius: 10,
    borderStyle: "dashed",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  border: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#0000ff",
  },
  paymentSection: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    gap: 10,
  },
});

export default OrderConfirmScreen;
