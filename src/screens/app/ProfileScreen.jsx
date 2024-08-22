import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  LogBox,
  Platform,
  Dimensions,
} from "react-native";
import {
  Stack,
  Box,
  Input,
  Select,
  CheckIcon,
  FormControl,
  Button,
  Text,
  Divider,
} from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUserProfile,
  getShippingCities,
  updateProfile,
} from "../../api/payment";
import MainStyles from "../../components/styles/MainStyle";
import { capitalize } from "../../helpers/general";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { shipping_cities, isError, be_errors, isLoading } = useSelector(
    (state) => state.payment
  );
  const [errors, setErrors] = useState({});
  const genders = ["male", "female", "other"];
  const theme = useSelector((state) => state.theme);

  const [shippingForm, setShippingForm] = useState({
    name: "",
    email: "",
    msisdn: "",
    shipping_city_id: "",
    shipping_address: "",
    gender: "",
  });

  const { height: screenHeight } = Dimensions.get('window');

  const handleChange = (field, value) => {
    setShippingForm({
      ...shippingForm,
      [field]: value,
    });

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
        Alert.alert("Success", "Profile is updated!");
      })
      .catch((error) => {
        if (Object.keys(error)?.length !== 0) {
          setErrors(error);
        }
      });
  };

  const getUserInfo = () => {
    dispatch(getCurrentUserProfile()).then((resp) => {
      let current_user = resp.payload;

      setShippingForm((prevState) => ({
        msisdn: current_user?.msisdn,
        name: current_user?.name,
        shipping_city_id: current_user?.shippingcity?.id,
        shipping_address: current_user?.shipping_address,
        gender: current_user?.gender,
      }));
    });
  };

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    dispatch(getShippingCities());
    getUserInfo();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box m={5} textAlign="center" height={screenHeight * 0.75} backgroundColor="#fff" rounded="xl">
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
                minWidth="200"
                accessibilityLabel="Choose Gender"
                placeholder="Choose Gender"
                variant="outlined"
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
                _input={MainStyles.normalFont}
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
                    style={[MainStyles.normalFont, { borderRadius: 30 }]}
                    label={city.name_en}
                    value={city.id}
                    key={city.id}
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
            </FormControl>

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
                marginTop: 30,
                ...MainStyles.centerAll
              }}
            >
              <Divider width={"80%"} style={{ opacity: 0.3 }} />
            </Box>
            <Box marginY={5}>
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
                  <Box style={{marginTop: 5, marginRight: 4}}>
                    <Icon name="cog-outline" style={{color: '#fff'}} size={20} />
                  </Box>
                  <Text style={{ lineHeight: 30, color: "#fff" }}>
                    အချက်အလက်သိမ်းမည်။
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

const styles = StyleSheet.create({});

export default ProfileScreen;
