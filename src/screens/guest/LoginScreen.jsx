// Login.jsx
import { View, Text, StyleSheet } from "react-native";
import { Button, Box, Input, Stack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const Login = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("");

  const sendOtp = () => {
    navigation.navigate("Otp");
  };

  return (
    <View style={styles.body}>
      <Text style={styles.textStyle}>Login</Text>
      <Stack space={4} w="75%" maxW="300px" mx="auto">
        <Input
          variant="rounded"
          value={phoneNumber}
          onChangeText={(e) => setPhoneNumber(e)}
          keyboardType="phone-pad"
          mt={4}
          textAlign="center"
        />
      </Stack>

      <Box alignItems="center" style={styles.boxStyle}>
        <Button onPress={sendOtp}>SEND OTP</Button>
      </Box>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    // backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    // color: "#fff",
    paddingBottom: 10,
  },
  boxStyle: {
    marginTop: 20,
  },
});
