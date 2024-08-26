// Login.jsx
import React from "react";
import { View, StyleSheet, ImageBackground, Keyboard } from "react-native";
import { Button, Box, FormControl, Input, Text, StatusBar } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../api/auth";
import MainStyles from "../../components/styles/MainStyle";
import Icon from "react-native-vector-icons/Ionicons";

const Login = () => {
  const navigation = useNavigation();
  const [msisdn, setMsisdn] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState("");
  const dispatch = useDispatch();
  const { isError, error_message } = useSelector((state) => state.auth);

  const handleInputChange = (value) => {
    setMsisdn(value);
    if (validationError) {
      setValidationError("");
    }
  };

  const goNextRoute = () => {
    return navigation.navigate("OTP");
  };

  const validatePhoneNumber = (phone) => {
    const myanmarPhoneRegex = /^09\d{9}$/; 
    return myanmarPhoneRegex.test(phone);
  };

  const sendOtp = async () => {
    setSubmitted(true);
    Keyboard.dismiss();
    if (msisdn === "") {
      setValidationError("ဖုန်းနံပါတ်ဖြည့်ရင်လိုအပ်ပါသည်။");
      return;
    }
    if (!validatePhoneNumber(msisdn)) {
      setValidationError("နံပါတ် 09 နဲ့ စ၍ ၁၁ လုံး ရှိရပါမည်။");
      return;
    }

    dispatch(login({ msisdn: msisdn }))
      .unwrap()
      .then((resp) => {
        goNextRoute();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
      <ImageBackground
        source={require("../../../assets/bgsample.png")}
        style={styles.background}
      >
        <View style={styles.container}>
          <Box
            width="90%"
            bg="transparent"
            p={10}
            rounded="xl"
            flexDirection="column"
          >
            <FormControl
              maxW="300"
              isRequired
              isInvalid={submitted && (msisdn === "" || validationError !== "")}
            >
              {submitted && validationError && (
                <FormControl.ErrorMessage mt={2} width='100%'>
                  <Box>
                    <Text style={styles.errorText} color={'#fff'}>{validationError}</Text>
                  </Box>
                </FormControl.ErrorMessage>
              )}
              <Input
                color="#fff"
                size="xl"
                my={2}
                borderWidth={1}
                p={3}
                InputLeftElement={<Icon name="phone-portrait-outline" size={20} marginLeft={10} color="#16998c" />}
                keyboardType="number-pad"
                placeholder="09 xxx xxx xxx"
                rounded="full"
                _input={MainStyles.normalFont}
                _focus={{
                  borderColor: "#fff",
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                }}
                onChangeText={(value) => handleInputChange(value)}
                borderColor={
                  submitted && (msisdn === "" || validationError)
                    ? "red.500"
                    : "white"
                }
              />
            </FormControl>

            {/* {isError && (
              <Text style={styles.error_message}>{error_message}</Text>
            )} */}
            <Button
              width="full"
              variant="outline"
              rounded="full"
              color="#fff"
              onPress={sendOtp}
              style={{ marginTop: 10, width: '100%' }}
            > 
              <Box style={{ ...MainStyles.flexRowCenter }}>
                    <Box style={{marginTop: 5, marginRight: 4}}>
                      <Icon name="sync-outline" style={{color: '#fff'}} size={20} />
                    </Box>
                    <Text style={{ lineHeight: 30, color: "#fff" }}>
                      အကောင့်၀င်မည်
                    </Text>
                  </Box>
            </Button>
          </Box>
        </View>
      </ImageBackground>
    </>
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
  error_message: {
    color: "red",
    textAlign: "center",
  },
  errorText: {
    fontSize: 14, 
    color: 'red',
  },
});
