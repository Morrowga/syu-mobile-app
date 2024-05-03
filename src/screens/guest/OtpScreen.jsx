// Otp.jsx
import { View, Text,StyleSheet } from 'react-native';
import { Button, Box } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { authSuccess } from '../../redux/slices/authSlice';

const OtpScreen = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <View style={styles.body}>
        <Text style={styles.textStyle}>Login</Text>
        <Box alignItems="center" style={styles.boxStyle}>
          <Button onPress={() => dispatch(authSuccess())}>Reach Otp</Button>
        </Box>
    </View>
  );
};

export default OtpScreen;


const styles = StyleSheet.create({
    body: 
    {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
    },
    textStyle: 
    {
        color: '#fff',
    },
    boxStyle:
    {
      marginTop: 20
    }
});
