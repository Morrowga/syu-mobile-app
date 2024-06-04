import { Button, View,Text } from "native-base";
import { StyleSheet } from "react-native";
import { useNavigation,useRoute } from "@react-navigation/native";


const SuccessScreen = ()=>{
  const navigation = useNavigation();
  const route = useRoute();
  const { params } = route;
  const { order_id } = params;


  const goCheckout = () => {
     navigation.navigate("Order Confirm Screen", { order_id: order_id });
   }
   
    return(
        <View style={styles.container}>
            <View style={styles.content}>
              <Text>Success !!!</Text>
            </View>
            <Button color="teal.400" onPress={goCheckout}>Continue</Button>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20
    },
    content:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default SuccessScreen;