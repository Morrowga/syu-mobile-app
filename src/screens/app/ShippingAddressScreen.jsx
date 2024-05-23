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
import { getCurrentUserProfile, getShippingCities } from "../../api/payment";

const ShippingAddressScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { shipping_cities } = useSelector((state) => state.payment);

  const [shippingForm, setShippingForm] = useState({
    name: "",
    shipping_city_id: "",
    delivery_fees: 0,
    shipping_address: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});
  const genders = ["Male", "Female", "Other"];

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

  const submitForm = async () => {
    setErrors({
      name: ["Name field is required!"],
      shipping_city_id: ["City field is required!"],
      delivery_fees: ["Delivery fees field is required!"],
      shipping_address: ["Shipping address field is required!"],
      gender: ["Gender field is required!"],
    });

    // navigation.navigate("Checkout");
    //   if (error.response && error.response.data) {
    //     setErrors(error.response.data.errors);
    //   }
  };
  const getUserInfo = () => {
    dispatch(getCurrentUserProfile()).then((resp) => {
      let current_user = resp.payload;
      let current_delivery_fee = 0;
      if (current_user?.shipping_city_id) {
        current_delivery_fee = shipping_cities.find(
          (city) => city.id == current_user.shipping_city_id
        )?.cost;
      }
      setShippingForm((prevState) => ({
        delivery_fees: current_delivery_fee,
        name: current_user?.name,
        shipping_city_id: current_user?.shipping_city_id,
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
              {shipping_cities?.map((city) => (
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
              value={shippingForm.delivery_fees.toString()}
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
      <Button mt={4} onPress={submitForm}>
        Submit
      </Button>
    </KeyboardAvoidingView>
  );
};

export default ShippingAddressScreen;
