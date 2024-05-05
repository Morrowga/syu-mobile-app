import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
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
import { useState } from "react";

const ProfileScreen = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    gender: "",
  });

  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = () => {
    // Basic validation
    if (
      formData.username === "" ||
      formData.email === "" ||
      formData.phone === "" ||
      formData.city === "" ||
      formData.address === "" ||
      formData.gender === ""
    ) {
      Alert.alert("Validation Error", "Please fill in all fields.");
    } else {
      // Validation passed, you can submit the form data here
      console.log("Form data:", formData);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box m={5} textAlign="center" height="100%" rounded="xl">
          <Heading>Profile Details</Heading>
          <Box mt={10}>
            <Stack space={2} w="85%" maxW="300px" mx="auto">
              <FormControl
                maxW="300"
                isRequired
                isInvalid={formData.username === ""}
              >
                <FormControl.Label>Username</FormControl.Label>
                <Input
                  size="lg"
                  placeholder="Username"
                  rounded="full"
                  onChangeText={(text) => handleInputChange("username", text)}
                />
              </FormControl>
              <FormControl
                maxW="300"
                isRequired
                isInvalid={formData.email === ""}
              >
                <FormControl.Label>Email Address</FormControl.Label>
                <Input
                  size="lg"
                  placeholder="Email"
                  rounded="full"
                  onChangeText={(text) => handleInputChange("email", text)}
                />
              </FormControl>
              <FormControl
                maxW="300"
                isRequired
                isInvalid={formData.phone === ""}
              >
                <FormControl.Label>Phone</FormControl.Label>
                <Input
                  size="lg"
                  placeholder="Phone"
                  rounded="full"
                  onChangeText={(text) => handleInputChange("phone", text)}
                />
              </FormControl>
              <FormControl
                maxW="300"
                isRequired
                isInvalid={formData.city === ""}
              >
                <FormControl.Label>City</FormControl.Label>
                <Input
                  size="lg"
                  placeholder="City"
                  rounded="full"
                  onChangeText={(text) => handleInputChange("city", text)}
                />
              </FormControl>
              <FormControl
                maxW="300"
                isRequired
                isInvalid={formData.address === ""}
              >
                <FormControl.Label>Shipping Address</FormControl.Label>
                <Input
                  size="lg"
                  placeholder="Shipping Address"
                  rounded="full"
                  onChangeText={(text) => handleInputChange("address", text)}
                />
              </FormControl>
              <FormControl
                maxW="300"
                isRequired
                isInvalid={formData.gender === ""}
              >
                <FormControl.Label>Gender</FormControl.Label>
                <Select
                  minWidth="200"
                  accessibilityLabel="Gender"
                  size="lg"
                  placeholder="Gender"
                  _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size={5} />,
                  }}
                  mt="1"
                  editable={false}
                  readOnly
                  rounded="full"
                  onValueChange={(itemValue) =>
                    handleInputChange("gender", itemValue)
                  }
                >
                  <Select.Item label="Male" value="male" />
                  <Select.Item label="Female" value="female" />
                  <Select.Item label="Others" value="others" />
                </Select>
              </FormControl>

              <Button
                onPress={handleSubmit}
                variant="outline"
                rounded="full"
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
