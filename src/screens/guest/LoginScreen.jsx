// Login.jsx
import { View, StyleSheet, ImageBackground } from "react-native";
import { Button, Box, Stack, FormControl, Input } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../api/auth";

const Login = () => {
  const navigation = useNavigation();
  const [msisdn, setMsisdn] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (value) => {
    setMsisdn(value);
  };

  const goNextRoute = async () => {
    return navigation.navigate('OTP')
  };

  const sendOtp = async (msisdn) => {
      await dispatch(login({ msisdn: msisdn })).then((resp) => {
        console.log(resp)
        navigation.navigate('OTP');
      });
  };
  return (
    <ImageBackground
      source={require("../../../assets/bgsample.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Box
          width="80%"
          bg="rgba(0, 0, 0, 0.8)"
          p={10}
          rounded="xl"
          flexDirection="column"
        >
          <FormControl maxW="300" isRequired isInvalid={msisdn === ""}>
            <Input
              color="#fff"
              size="xl"
              my={2}
              borderWidth={2}
              p={3}
              keyboardType="number-pad"
              placeholder="09..."
              rounded="full"
              onChangeText={(value) => handleInputChange(value)}
            />
          </FormControl>

          <Button
            width="full"
            variant="outline"
            rounded="full"
            color="#fff"
            onPress={sendOtp}
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
    resizeMode: "cover",
    justifyContent: "center",
  },
});
