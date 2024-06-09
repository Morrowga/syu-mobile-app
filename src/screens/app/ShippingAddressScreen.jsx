import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  VStack,
  FormControl,
  Input,
  Select,
  CheckIcon,
  Button,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUserProfile,
  getShippingCities,
  updatePayment,
  updateProfile,
} from "../../api/payment";

const ShippingAddressScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { shipping_cities, isError, be_errors, isLoading } = useSelector(
    (state) => state.payment
  );
  const [errors, setErrors] = useState({});

  const [shippingForm, setShippingForm] = useState({
    name: "",
    shipping_city_id: "",
    delivery_fees: 0,
    shipping_address: "",
    gender: "",
    msisdn: "",
  });
  const genders = ["male", "female", "other"];
  // console.log(shipping_cities);

  const handleChange = (field, value) => {
    setShippingForm({
      ...shippingForm,
      [field]: value,
    });

    if (field == "shipping_city_id") {
      let current_delivery_fee =
        shipping_cities?.find((city) => city.id == value)?.cost ?? 0;

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
    console.log(shippingForm);
    dispatch(updateProfile(shippingForm))
      .unwrap()
      .then((resp) => {
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
      }));
    });
  };

  useEffect(() => {
    dispatch(getShippingCities());
    getUserInfo();
  }, []);

  return (
    <KeyboardAvoidingView flex={1} justifyContent="center" padding={10}>
      <ScrollView>
        <VStack w="full" space={2} flex={1}>
          <FormControl isInvalid={!!errors.name} w="full">
            <FormControl.Label>Name</FormControl.Label>
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

          <FormControl isInvalid={!!errors.shipping_city_id} w="full">
            <FormControl.Label>Shipping City</FormControl.Label>
            <Select
              minWidth="200"
              accessibilityLabel="Choose City"
              placeholder="Choose City"
              selectedValue={shippingForm.shipping_city_id}
              onValueChange={(value) => handleChange("shipping_city_id", value)}
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

          <FormControl w="full">
            <FormControl.Label>Delivery Fees</FormControl.Label>
            <Input
              readOnly
              value={shippingForm.delivery_fees}
              onChangeText={(value) => handleChange("delivery_fees", value)}
            />
            {/* {errors.delivery_fees && (
              <FormControl.ErrorMessage>
                {errors.delivery_fees[0]}
              </FormControl.ErrorMessage>
            )} */}
          </FormControl>

          <FormControl isInvalid={!!errors.shipping_address} w="full">
            <FormControl.Label>Shipping Address</FormControl.Label>
            <Input
              placeholder="Enter shipping address"
              value={shippingForm.shipping_address}
              onChangeText={(value) => handleChange("shipping_address", value)}
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
        </VStack>
      </ScrollView>
      <Button mt={4} onPress={() => submitForm()} isLoading={isLoading}>
        Submit
      </Button>
    </KeyboardAvoidingView>
  );
};

export default ShippingAddressScreen;
