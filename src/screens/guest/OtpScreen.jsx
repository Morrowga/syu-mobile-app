// Otp.jsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Box } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { authSuccess } from "../../redux/slices/authSlice";
import OTPTextView from "react-native-otp-textinput";
import { resendOtp, verifyOtp } from "../../api/auth";

const OtpScreen = () => {
  const [disabled, setDisabled] = useState(true);
  const [countdown, setCountdown] = useState(60);
  const { msisdn, isError, error_message } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleOtpChange = (index, value) => {
    if (value.length == 4) {
      dispatch(verifyOtp({ msisdn: msisdn, otp: value }));
    }
  };

  const startCountdown = () => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(interval);
          setDisabled(false);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  const handleResendClick = () => {
    dispatch(resendOtp({ msisdn: msisdn })).then(() => {
      setDisabled(true);
      setCountdown(60);
      startCountdown();
    });
  };

  useEffect(() => {
    startCountdown();
  }, []);

  return (
    <View style={styles.body}>
      <Text style={styles.textStyle}>ENTER OTP CODE</Text>

      <OTPTextView
        handleTextChange={(val) => handleOtpChange(0, val)}
        containerStyle={styles.textInputContainer}
        textInputStyle={styles.roundedTextInput}
        tintColor="#000"
        inputCount={4}
      />
      {isError ? <Text style={styles.error_message}>{error_message}</Text> : ""}

      <Box alignSelf="flex-end" p={10}>
        <TouchableOpacity>
          <Button
            w="200"
            rounded="full"
            variant="outline"
            onPress={handleResendClick}
            isDisabled={disabled}
          >
            {countdown > 0 ? "Resend in " + countdown + " seconds" : "Resend"}
          </Button>
        </TouchableOpacity>
      </Box>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    top: 100,
  },
  textStyle: {
    paddingBottom: 10,
  },
  textInputContainer: {
    marginBottom: 20,
  },
  error_message: {
    color: "red",
  },
});
