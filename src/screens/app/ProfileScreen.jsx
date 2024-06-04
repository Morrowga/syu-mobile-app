import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  LogBox,
} from "react-native";
import {
  Stack,
  Box,
  Heading,
  Input,
  Select,
  CheckIcon,
  FormControl,
  Button,
} from "native-base";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUserProfile,
  getShippingCities,
  updatePayment,
  updateProfile,
} from "../../api/payment";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { shipping_cities, isError, be_errors, isLoading } = useSelector(
    (state) => state.payment
  );
  const [errors, setErrors] = useState({});
  const genders = ["male", "female", "other"];

  const [shippingForm, setShippingForm] = useState({
    name: "",
    email: "",
    msisdn: "",
    shipping_city_id: "",
    shipping_address: "",
    gender: "",
  });

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

  // useEffect(() => {
  //   LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  // }, []);

  const submitForm = () => {
    dispatch(updateProfile(shippingForm))
      .unwrap()
      .then((resp) => {
        Alert.alert("Success", "Profile is updated!");
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
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box m={5} textAlign="center" height="100%" rounded="xl">
          <Box>
            <Stack space={2} w="90%" maxW="350px" mx="auto">
              <FormControl isInvalid={!!errors.name} w="full">
                <FormControl.Label>User Name</FormControl.Label>
                <Input
                  placeholder="Enter Name"
                  value={shippingForm.name}
                  onChangeText={(value) => handleChange("name", value)}
                />
                {errors.name && (
                  <FormControl.ErrorMessage>
                    {errors.name[0]}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.email} w="full">
                <FormControl.Label>Email Address</FormControl.Label>
                <Input
                  placeholder="Enter Email"
                  value={shippingForm.email}
                  onChangeText={(value) => handleChange("email", value)}
                />
                {errors.email && (
                  <FormControl.ErrorMessage>
                    {errors.email[0]}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.msisdn} w="full">
                <FormControl.Label>Phone</FormControl.Label>
                <Input
                  placeholder="Enter Phone"
                  value={shippingForm.msisdn}
                  onChangeText={(value) => handleChange("msisdn", value)}
                />
                {errors.msisdn && (
                  <FormControl.ErrorMessage>
                    {errors.msisdn[0]}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.shipping_city_id} w="full">
                <FormControl.Label>Shipping City</FormControl.Label>
                <Select
                  minWidth="200"
                  accessibilityLabel="Choose City"
                  placeholder="Choose City"
                  selectedValue={shippingForm.shipping_city_id}
                  onValueChange={(value) =>
                    handleChange("shipping_city_id", value)
                  }
                  _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size={5} />,
                  }}
                  mt="1"
                  editable={false}
                  readOnly
                >
                  {shipping_cities.map((city) => (
                    <Select.Item
                      label={city.name_en}
                      value={city.id}
                      key={city.id}
                    />
                  ))}
                </Select>
                {errors.shipping_city_id && (
                  <FormControl.ErrorMessage>
                    {errors.shipping_city_id[0]}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.shipping_address} w="full">
                <FormControl.Label>Shipping Address</FormControl.Label>
                <Input
                  placeholder="Enter shipping address"
                  value={shippingForm.shipping_address}
                  onChangeText={(value) =>
                    handleChange("shipping_address", value)
                  }
                />
                {errors.shipping_address && (
                  <FormControl.ErrorMessage>
                    {errors.shipping_address[0]}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.gender} w="full">
                <FormControl.Label>Gender</FormControl.Label>
                <Select
                  minWidth="200"
                  accessibilityLabel="Choose Gender"
                  placeholder="Choose Gender"
                  selectedValue={shippingForm.gender}
                  onValueChange={(value) => handleChange("gender", value)}
                  _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size={5} />,
                  }}
                  mt="1"
                  editable={false}
                  readOnly
                >
                  {genders.map((gender) => (
                    <Select.Item label={gender} value={gender} key={gender} />
                  ))}
                </Select>
                {errors.gender && (
                  <FormControl.ErrorMessage>
                    {errors.gender[0]}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
              <Button
                isLoading={isLoading}
                onPress={() => submitForm()}
                variant="outline"
                style={{ marginTop: 10 }}
              >
                Submit
              </Button>
            </Stack>
          </Box>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({});
export default ProfileScreen;
