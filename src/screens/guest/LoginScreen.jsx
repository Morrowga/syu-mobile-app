// Login.jsx
import { View, Text,StyleSheet } from 'react-native';
import { Button, Box } from "native-base";
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.body}>
        <Text style={styles.textStyle}>Login</Text>
        <Box alignItems="center" style={styles.boxStyle}>
          <Button onPress={() => navigation.navigate('Otp')}>OTP</Button>
        </Box>
    </View>
  );
};

export default Login;


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
