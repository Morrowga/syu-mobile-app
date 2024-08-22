import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  FormControl,
  Input,
  Select,
  CheckIcon,
  Button,
  Stack,
  Box,
  Text,
  Divider,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import {
  getCurrentUserProfile,
  getShippingCities,
  updateProfile,
} from "../../api/payment";
import { addUserPoints } from "../../redux/slices/authSlice";
import { Dimensions, LogBox, Platform, StyleSheet } from "react-native";
import MainStyles from "../../components/styles/MainStyle";
import { capitalize } from "../../helpers/general";
import { setOutOfArea } from "../../redux/slices/orderSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ShippingAddressScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { shipping_cities, isError, be_errors, isLoading } = useSelector(
    (state) => state.payment
  );
  const theme = useSelector((state) => state.theme);
  const [errors, setErrors] = useState({});
  const [currentCity, setCurrentCity] = useState(null);
  const [shippingForm, setShippingForm] = useState({
    name: "",
    shipping_city_id: "",
    delivery_fees: 0,
    shipping_address: "",
    extra_address: "",
    gender: "",
    msisdn: "",
  });
 
  const { height: screenHeight } = Dimensions.get('window');

  const genders = ["male", "female", "other"];

  const handleChange = (field, value) => {
    setShippingForm({
      ...shippingForm,
      [field]: value,
    });

    if (field == "shipping_city_id") {
      let current_delivery_fee =
        shipping_cities?.find((city) => city.id == value)?.cost ?? 0;

        setCurrentCity(shipping_cities?.find((city) => city.id == value) ?? '')
      
        setShippingForm((prevState) => ({
          ...prevState,
          delivery_fees: current_delivery_fee,
        }));
    }
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  const submitForm = () => {
    dispatch(updateProfile(shippingForm))
      .unwrap()
      .then((resp) => {
        // const outOfAreaCost = currentCity?.name_en !== "Out Of Area or Gate" ? currentCity.cost : 0;
        dispatch((setOutOfArea(currentCity)));

        navigation.navigate("Checkout");
      })
      .catch((error) => {
        if (Object.keys(error)?.length != 0) {
          setErrors(error);
        }
      });
  };
  const getUserInfo = () => {
    dispatch(getCurrentUserProfile()).then((resp) => {
      let current_user = resp.payload;

      setShippingForm((prevState) => ({
        msisdn: current_user?.msisdn,
        delivery_fees: current_user?.shippingcity?.cost,
        name: current_user?.name,
        shipping_city_id: current_user?.shippingcity?.id,
        shipping_address: current_user?.shipping_address,
        gender: current_user?.gender,
        extra_address: current_user?.extra_address
      }));

      setCurrentCity(current_user?.shippingcity);

      if(current_user?.points){
        dispatch(addUserPoints(current_user?.points));
      }
    });
  };

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    dispatch(getShippingCities());
    getUserInfo();
  }, []);

  return (
    <KeyboardAvoidingView 
    flex={1} 
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 110 : 0}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box m={5} textAlign="center" height={'auto'} backgroundColor="#fff" rounded="xl">
          <Stack space={2} w="90%" maxW="350px" mx="auto">
            <FormControl isInvalid={!!errors.name} w="full" marginY={1}>
              <FormControl.Label>
                <MaterialCommunityIcons
                  name="rename-box"
                  color="#000"
                  style={{ marginRight: 5,opacity: 0.5 }}
                  size={20}
                />
                <Text
                  style={[
                    MainStyles.titleFont,
                    { fontSize: 15, lineHeight: 35 },
                  ]}
                >
                  အမည် <Text style={{ color: "red.500" }}>*</Text>
                </Text>
              </FormControl.Label>
              <Input
                size="xl"
                placeholder="Username"
                variant="outlined"
                value={shippingForm.name}
                onChangeText={(value) => handleChange("name", value)}
                fontSize={16}
                _input={[MainStyles.normalFont]}
                _focus={{
                  borderColor: "#000",
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  ...MainStyles.normalFont,
                }}
              />
              {errors.name && (
                <FormControl.ErrorMessage>
                  <Text style={MainStyles.normalFont}>{errors.name[0]}</Text>
                </FormControl.ErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.msisdn} w="full" marginY={1}>
              <FormControl.Label>
                <Icon
                  name="phone-portrait-outline"
                  color="#000"
                  style={{ marginRight: 5,opacity: 0.5 }}
                  size={20}
                />
                <Text
                  style={[
                    MainStyles.titleFont,
                    { fontSize: 15, lineHeight: 35 },
                  ]}
                >
                  ဖုန်းနံပါတ် <Text style={{ color: "red.500" }}>*</Text>
                </Text>
              </FormControl.Label>
              <Input
                size="xl"
                fontSize={16}
                variant="outlined"
                _input={MainStyles.normalFont}
                _focus={{
                  borderColor: "#000",
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  ...MainStyles.normalFont,
                }}
                placeholder="Enter Phone"
                value={shippingForm.msisdn}
                onChangeText={(value) => handleChange("msisdn", value)}
              />
              {errors.msisdn && (
                <FormControl.ErrorMessage>
                  <Text style={MainStyles.normalFont}>{errors.msisdn[0]}</Text>
                </FormControl.ErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.gender} w="full" marginY={1}>
              <FormControl.Label>
                <Icon
                  name="people-circle-outline"
                  color="#000"
                  style={{ marginRight: 5,opacity: 0.5 }}
                  size={20}
                />
                <Text
                  style={[
                    MainStyles.titleFont,
                    { fontSize: 15, lineHeight: 35 },
                  ]}
                >
                  ကျား/မ <Text style={{ color: "red.500" }}>*</Text>
                </Text>
              </FormControl.Label>
              <Select
                fontSize={16}
                size="xl"
                _input={[MainStyles.normalFont]}
                _focus={MainStyles.normalFont}
                variant="outlined"
                minWidth="200"
                accessibilityLabel="Choose Gender"
                placeholder="Choose Gender"
                selectedValue={shippingForm.gender}
                onValueChange={(value) => handleChange("gender", value)}
                _selectedItem={{
                  bg: "transparent",
                  endIcon: <CheckIcon style={{ color: "#000" }} size="5" />,
                }}
                mt="1"
                editable={false}
                readOnly
              >
                {genders.map((gender) => (
                  <Select.Item
                    _text={{ textTransform: "capitalize" }}
                    style={[MainStyles.normalFont, { borderRadius: 30 }]}
                    label={capitalize(gender)}
                    value={gender}
                    key={gender}
                  />
                ))}
              </Select>
              {errors.gender && (
                <FormControl.ErrorMessage>
                  <Text style={MainStyles.normalFont}>{errors.gender[0]}</Text>
                </FormControl.ErrorMessage>
              )}
            </FormControl>

            <FormControl
              isInvalid={!!errors.shipping_city_id}
              w="full"
              marginY={1}
            >
              <FormControl.Label>
                <Icon
                  name="location-outline"
                  color="#000"
                  style={{ marginRight: 5, opacity: 0.5 }}
                  size={20}
                />
                <Text
                  style={[
                    MainStyles.titleFont,
                    { fontSize: 15, lineHeight: 35 },
                  ]}
                >
                  ပစ္စည်း လက်ခံ မည့် မြို့{" "}
                  <Text style={{ color: "red.500" }}>*</Text>
                </Text>
              </FormControl.Label>
              <Select
                size="xl"
                fontSize={16}
                minWidth="200"
                _input={{...MainStyles.normalFont}}
                _focus={MainStyles.normalFont}
                variant="outlined"
                accessibilityLabel="Choose City"
                placeholder="Choose City"
                selectedValue={shippingForm.shipping_city_id}
                onValueChange={(value) =>
                  handleChange("shipping_city_id", value)
                }
                _selectedItem={{
                  bg: "transparent",
                  endIcon: <CheckIcon style={{ color: "#000" }} size="5" />,
                }}
                mt="1"
                editable={false}
                readOnly
              >
              {shipping_cities.map((city) => (
                <Select.Item
                  label={city.name_mm}
                  value={city.id}
                  key={city.id}
                  borderRadius={30}
                  _text={{
                    style: { ...MainStyles.normalFont, lineHeight: 30 }
                  }}
                />
              ))}
              </Select>
              {errors.shipping_city_id && (
                <FormControl.ErrorMessage>
                  <Text style={MainStyles.normalFont}>
                    {errors.shipping_city_id[0]}
                  </Text>
                </FormControl.ErrorMessage>
              )}
              <FormControl.Label>
                <Text
                  style={[
                    MainStyles.normalFont,
                    { fontSize: 13, lineHeight: 30, color: '#FF0000', paddingLeft: 5 },
                  ]}
                >
                  { currentCity?.name_en == 'Out Of Area or Gate' ? 'ဂိတ်ချခ - ' + shippingForm.delivery_fees : 'အိမ်အရောက်ပို့ခ - ' + shippingForm.delivery_fees} Ks
                </Text>
              </FormControl.Label>
            </FormControl>
            <Box
              style={{
                marginTop: 5,
                ...MainStyles.centerAll
              }}
            >
              <Divider width={"80%"} style={{ opacity: 0.3 }} />
            </Box>
            {currentCity?.name_en == 'Out Of Area or Gate' && 
              <FormControl
                isInvalid={!!errors.extra_address}
                w="full"
                marginY={1}
              >
                <FormControl.Label>
                  <Text
                    style={[
                      MainStyles.normalFont,
                      { fontSize: 12, lineHeight: 25, color: 'red.500' },
                    ]}
                  >
                    ဂိတ်ချ/စာဝေနယ်ပြင်ပ လိပ်စာအသေးစိတ်ရေးပေးရန်{" "}
                  </Text>
                </FormControl.Label>
                <FormControl.Label>
                  <Text
                    style={[
                      MainStyles.normalFont,
                      { fontSize: 12, lineHeight: 25, color: 'red.500' },
                    ]}
                  >
                    ဂိတ်ချ မည်ဆိုပါက ဂိတ်နာမည်ရေးပေးရန်{" "}
                  </Text>
                </FormControl.Label>
                <Input
                  size="xl"
                  fontSize={16}
                  _input={MainStyles.normalFont}
                  _focus={{
                    borderColor: "#000",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    ...MainStyles.normalFont,
                  }}
                  h={50}
                  borderRadius={10}
                  placeholder="Enter Extra Address"
                  value={shippingForm.extra_address}
                  onChangeText={(value) =>
                    handleChange("extra_address", value)
                  }
                />
                {errors.extra_address && (
                  <FormControl.ErrorMessage>
                  <Text style={{...MainStyles.normalFont, lineHeight: 30}}>
                      {errors.extra_address[0]}
                    </Text>
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
            }
            <FormControl
              isInvalid={!!errors.shipping_address}
              w="full"
              marginY={1}
            >
              <FormControl.Label>
                <Icon
                  name="location-outline"
                  color="#000"
                  style={{ marginRight: 5,opacity: 0.5 }}
                  size={20}
                />
                <Text
                  style={[
                    MainStyles.titleFont,
                    { fontSize: 15, lineHeight: 35 },
                  ]}
                >
                  ပစ္စည်း လက်ခံ မည့် လိပ်စာ{" "}
                  <Text style={{ color: "red.500" }}>*</Text>
                </Text>
              </FormControl.Label>
              <Input
                size="xl"
                variant="outlined"
                fontSize={16}
                _input={MainStyles.normalFont}
                _focus={{
                  borderColor: "#000",
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  ...MainStyles.normalFont,
                }}
                // borderRadius={10}
                placeholder="Enter shipping address"
                value={shippingForm.shipping_address}
                onChangeText={(value) =>
                  handleChange("shipping_address", value)
                }
              />
              {errors.shipping_address && (
                <FormControl.ErrorMessage>
                  <Text style={MainStyles.normalFont}>
                    {errors.shipping_address[0]}
                  </Text>
                </FormControl.ErrorMessage>
              )}
            </FormControl>
            <Box
              style={{
                marginTop: 10,
                ...MainStyles.centerAll
              }}
            >
              <Divider width={"80%"} style={{ opacity: 0.3 }} />
            </Box>
            <Box marginBottom={5}>
              <Button
                isLoading={isLoading}
                rounded="full"
                onPress={() => submitForm()}
                style={{
                  backgroundColor: theme?.app_button_color,
                  width: "100%",
                  marginTop: 8,
                }}
              >
                <Box style={{ ...MainStyles.flexRowCenter }}>
                  <Box style={{marginTop: 3.5, marginRight: 4}}>
                    <Icon name="cog-outline" style={{color: '#fff'}} size={20} />
                  </Box>
                  <Text style={{ lineHeight: 30, color: "#fff", ...MainStyles.normalFont }}>
                    Information အတည်ပြုမည်
                  </Text>
                </Box>
              </Button>
            </Box>
          </Stack>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
})

export default ShippingAddressScreen;
