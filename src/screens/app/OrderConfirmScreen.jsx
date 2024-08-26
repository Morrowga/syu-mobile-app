import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  AspectRatio,
  Box,
  Button,
  Heading,
  Image,
  Input,
  FormControl,
  Stack,
  Switch,
  Text,
  View,
  HStack,
} from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllCartData } from "../../redux/slices/cartSlice";
import { selectTotalPrice } from "../../redux/selectors/cartSelectors";
import { getPaymentMethods, updatePayment } from "../../api/payment";
import MainStyles from "../../components/styles/MainStyle";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const OrderConfirmScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const theme = useSelector((state) => state.theme);
  const totalPrice = useSelector(selectTotalPrice);
  const { outOfArea } = useSelector((state) => state.order);
  const { paymentMethods, isLoading, isError, error_message } = useSelector(
    (state) => state.payment
  );

  const route = useRoute();
  const { params } = route;
  const { order_id } = params;

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [deliveryStatus, setDeliveryStatus] = useState(false);
  const [errors, setErrors] = useState({});
  const [paymentDetail, setPaymentDetail] = useState({
    name: "",
    account_no: "",
    is_active: false,
  });

  const [paymentForm, setPaymentForm] = useState({
    account_name: "",
    transaction_id: "",
  });

  useEffect(() => {
    dispatch(getPaymentMethods());
  }, [dispatch]);

  const handleChange = (field, value) => {
    setPaymentForm({
      ...paymentForm,
      [field]: value,
    });
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  const confirmUpload = () => {
    const formData = new FormData();
    formData.append("payment_method", paymentDetail.name);
    formData.append("account_name", paymentForm.account_name);
    formData.append("transaction_id", paymentForm.transaction_id);
    formData.append("paid_delivery_cost", deliveryStatus ? 1 : 0);
    formData.append("_method", "PATCH");

    dispatch(updatePayment({ order_id: order_id, formData: formData }))
      .unwrap()
      .then((resp) => {
        dispatch(deleteAllCartData());
        navigation.navigate("Success Screen", { order_id: order_id });
      })
      .catch((error) => {
        if (Object.keys(error)?.length !== 0) {
          setErrors(error);
        }
      });
  };

  const skipUpload = () => {
    dispatch(deleteAllCartData());
    navigation.navigate("Success Screen", { order_id: order_id });
  };

  const getSelectedPayment = (paymentMethod) => {
    setSelectedPayment(paymentMethod.id);
    setPaymentDetail({
      name: paymentMethod.name,
      account_no: paymentMethod.account_no,
      is_active: paymentMethod.is_active,
    });
  };

  const changeStatus = (value) => {
    setDeliveryStatus(value);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Box>
            <Box>
              <Heading size="sm" style={styles.heading}>
                <Text style={MainStyles.titleFont}>ငွေချေစနစ်ရွေးချယ်ပါ</Text>
              </Heading>
            </Box>
            <View style={styles.paymentMethodsContainer}>
              {paymentMethods.map((paymentMethod) => (
                <TouchableOpacity
                  key={paymentMethod.id}
                  style={[
                    styles.paymentMethodButton,
                    selectedPayment === paymentMethod.id && styles.selectedPaymentMethod,
                  ]}
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
                  size="xl"
                  fontSize={16}
                  variant="rounded"
                  _input={MainStyles.normalFont}
                  readOnly
                  value={paymentDetail.name}
                />
                <Input
                  size="xl"
                  fontSize={16}
                  variant="rounded"
                  _input={MainStyles.normalFont}
                  readOnly
                  value={paymentDetail.account_no}
                />
              </View>
            ) : null}
            <Stack>
              <FormControl isInvalid={false} w="full" marginTop={0}>
                <FormControl.Label>
                  <Text style={styles.label}>
                    Account Name <Text style={styles.required}>*</Text>
                  </Text>
                </FormControl.Label>
                <Input
                  size="xl"
                  placeholder="Account Name"
                  variant="rounded"
                  fontSize={16}
                  style={styles.input}
                  value={paymentForm.account_name}
                  onChangeText={(value) => handleChange("account_name", value)}
                />
              </FormControl>
              <FormControl isInvalid={false} w="full" marginY={3}>
                <FormControl.Label>
                  <Text style={styles.label}>
                    Transaction No / Id <Text style={styles.required}>*</Text>
                  </Text>
                </FormControl.Label>
                <Input
                  size="xl"
                  placeholder="Transaction No / Id"
                  variant="rounded"
                  fontSize={16}
                  keyboardType="numeric"
                  style={styles.input}
                  value={paymentForm.transaction_id}
                  onChangeText={(value) => handleChange("transaction_id", value)}
                />
              </FormControl>
            </Stack>
            {outOfArea !== 0 && (
              <Box mb={5}>
                <HStack alignItems="center" space={4}>
                  <Text style={{ ...MainStyles.titleFont, lineHeight: 30 }}>
                    ပို့ခအပါပေးချေမည်လား
                  </Text>
                  <Switch size="md" onValueChange={changeStatus} />
                </HStack>
              </Box>
            )}
          </Box>
        </View>
          <HStack justifyContent="flex-end">
            <Box style={styles.buttonContainer}>
              <Button
                w="100%"
                rounded="full"
                onPress={confirmUpload}
                backgroundColor={paymentDetail?.name ? theme.app_button_color : "gray.600"}
                disabled={!paymentDetail?.name}
                isLoading={isLoading}
              >
                <Text style={styles.buttonText}>အတည်ပြုမည်</Text>
              </Button>
              <Button w="100%" background="red.400" rounded="full" onPress={skipUpload}>
                <Text style={styles.buttonText}>နောက်မှလုပ်ဆောင်မည်</Text>
              </Button>
            </Box>
          </HStack>
        </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    marginVertical: 10,
    lineHeight: 30,
  },
  paymentMethodsContainer: {
    flexDirection: "row",
    gap: 5,
    flexWrap: "wrap",
  },
  paymentMethodButton: {
    borderWidth: 7,
    borderRadius: 50,
  },
  selectedPaymentMethod: {
    borderColor: "green",
  },
  paymentSection: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    gap: 10,
  },
  icon: {
    marginRight: 5,
    opacity: 0.5,
  },
  label: {
    fontSize: 15,
    lineHeight: 35,
  },
  required: {
    color: "red",
  },
  focusedInput: {
    borderColor: "#000",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  buttonContainer: {
    width: "100%",
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonText: {
    lineHeight: 30,
    color: "#fff",
  },
});

export default OrderConfirmScreen;
