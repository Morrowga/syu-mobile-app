// Login.jsx
import { View, StyleSheet,ImageBackground } from "react-native";
import { Button, Box, Stack, FormControl, Input } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const Login = () => {

  const [formData, setFormData] = useState({
    msisdn: "",
  });

  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("");

  const sendOtp = () => {
    navigation.navigate("Otp");
  };

  return (
    <ImageBackground 
      source={require("../../../assets/bgsample.png")}
      style={styles.background}
    >
    <View style={styles.container}>
      <Box width="80%" bg="rgba(0, 0, 0, 0.8)" p={10} rounded="xl" flexDirection="column">
        <FormControl
          maxW="300"
          isRequired
          isInvalid={formData.msisdn === ""}
        >
          {/* <FormControl.Label>Enter Mobile Number</FormControl.Label> */}
          <Input
            color="#fff"
            size="xl"
            my={2}
            borderWidth={2}
            p={3}
            placeholder="Enter your phone..."
            rounded="full"
            onChangeText={(text) => handleInputChange("username", text)}
          />
        </FormControl>

        <Button
          width="full"
          variant="outline"
          rounded="full"
          color="#fff"
          onPress={() => sendOtp}
          style={{ marginTop: 10 }}
        >
          Submit
        </Button>
      </Box>
    </View>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  }
});
