// Otp.jsx
import { View, Text, StyleSheet } from "react-native";
import { Button, Box } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { authSuccess } from "../../redux/slices/authSlice";
import OTPTextView from "react-native-otp-textinput";
import { useRef } from "react";

const OtpScreen = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let otpInput = useRef(null);
  return (
    <View style={styles.body}>
      <Text style={styles.textStyle}>ENTER OTP CODE</Text>

      <OTPTextView
        containerStyle={styles.textInputContainer}
        textInputStyle={styles.roundedTextInput}
        inputCount={5}
      />
      <Box alignItems="center" style={styles.boxStyle}>
        <Button onPress={() => dispatch(authSuccess())}>Reach Otp</Button>
      </Box>
    </View>
  );
};

export default OtpScreen;

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
  textInputContainer: {
    marginBottom: 20,
  },

  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 4,
  },
});
