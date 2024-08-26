// Otp.jsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { Button, Box } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { resendOtp, verifyOtp } from "../../api/auth";
import OTPTextView from "react-native-otp-textinput";
import { useNavigation } from "@react-navigation/native";
import MainStyles from "../../components/styles/MainStyle";

const OtpScreen = () => {
  const [disabled, setDisabled] = useState(true);
  const [countdown, setCountdown] = useState(60);
  const { msisdn, isError, error_message } = useSelector((state) => state.auth);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const handleOtpChange = (index, value) => {
    if (value.length === 4) {
      Keyboard.dismiss();
      dispatch(verifyOtp({ msisdn: msisdn, otp: value }));
    }
  };

  const startCountdown = () => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
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
    return () => clearInterval(startCountdown);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.otpContainer}>
        <Text style={{...styles.textStyle, ...MainStyles.normalFont}}>SMS မှ OTP ကုဒ် ရိုက်ထည့်ပါ။</Text>

        <OTPTextView
          handleTextChange={(val) => handleOtpChange(0, val)}
          containerStyle={styles.textInputContainer}
          textInputStyle={styles.roundedTextInput}
          tintColor="#000"
          inputCount={4}
        />
        {isError ? <Text style={styles.error_message}>လူကြီးမင်း ထည့်သွင်းထားသည့် ကုဒ်မမှန်ကန်ပါ။ ပြန်လည်စစ်ဆေး၍ ရိုက်ထည့်ပါ။</Text> : ""}

        <Box alignSelf="flex-end" p={2} marginTop={5}>
          <TouchableOpacity>
            <Button
              w="250"
              rounded="full"
              variant="outline"
              onPress={handleResendClick}
              isDisabled={disabled}
            >
              <Text style={{...MainStyles.normalFont, color: '#000'}}>
                {countdown > 0 ? `ကုဒ်ထပ်မံရယူရန် ${countdown} စက္ကန့် ` : "ကုဒ်ပြန်တောင်းမည်။"}
              </Text>
            </Button>
          </TouchableOpacity>
        </Box>
      </View>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: '30%',
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  otpContainer: {
    alignItems: "center",
    width: "100%",
  },
  textStyle: {
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  textInputContainer: {
    marginBottom: 20,
    width: "100%",
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 18,
    textAlign: 'center',
    color: "#000",
  },
  error_message: {
    color: "red.500",
    marginTop: 10,
  },
});
