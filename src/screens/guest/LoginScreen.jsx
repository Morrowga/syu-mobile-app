// Login.js
import { View, Text,StyleSheet } from 'react-native';

const Login = () => {
  return (
    <View style={styles.body}>
        <Text style={styles.textStyle}>Login</Text>
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
    }
});
