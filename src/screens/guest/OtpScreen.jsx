// Otp.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from "react-native";
import { Button, Box } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { authSuccess } from "../../redux/slices/authSlice";
import OTPTextView from "react-native-otp-textinput";
import { useRef } from "react";

const OtpScreen = () => {

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const handleOtpChange = (index, value) => {
    if(value.length == 5)
    {
      dispatch(authSuccess());
    }
  };


  return (
    <View style={styles.body}>
      <Text style={styles.textStyle}>ENTER OTP CODE</Text>

      <OTPTextView
        handleTextChange={(val) => handleOtpChange(0, val)}
        containerStyle={styles.textInputContainer}
        textInputStyle={styles.roundedTextInput}
        tintColor="#000"
        inputCount={5}
      />
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
    // borderRadius: 10,
    // borderWidth: 3
  },
});
