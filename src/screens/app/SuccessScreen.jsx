import { Button, View,Text, Image, AspectRatio, Box, HStack, Divider } from "native-base";
import { StyleSheet } from "react-native";
import { useNavigation,useRoute } from "@react-navigation/native";
import MainStyles from "../../components/styles/MainStyle";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";


const SuccessScreen = ()=>{
  const navigation = useNavigation();
  const route = useRoute();
  const { params } = route;
  const { order_id } = params;
  const theme = useSelector((state) => state.theme);


//   const goCheckout = () => {
//      navigation.navigate("Make Payment", { order_id: order_id });
//    }

   const goHome = () => {
    navigation.navigate("Home")
   }
   
    return(
        <>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Image
                        source={require('../../../assets/thankyou.png')}
                        alt="Preview"
                        style={styles.image}
                    />
                </View>
                <Box>
                    <Box style={{alignContent: 'center', alignItems: 'center'}}>
                        <Text style={{...MainStyles.normalFont, lineHeight: 40, fontSize: 20}}>လူကြီးမင်း၏  အားပေးမှုအတွက်</Text>
                        <Text style={{...MainStyles.normalFont, lineHeight: 40, fontSize: 20}}>ကျေးဇူးတင်ပါသည်။</Text>
                    </Box>
                    <Box style={{alignItems: 'center', marginVertical: 5 }}>
                        <Image
                            source={{uri: theme?.app_logo_img}}
                            alt="Preview"
                            style={styles.logoImage}
                        />
                    </Box>
                </Box>
            </View>
            <View>
                <HStack style={styles.bottomContainer}>
                    <Box style={styles.box}>
                        <Button
                            rounded="full"
                            onPress={() => goHome()}
                            style={{
                            backgroundColor: theme?.app_button_color,
                            width: "100%",
                            marginBottom: 10
                            }}
                        >
                            <Box style={{ ...MainStyles.flexRowCenter }}>
                                <Box style={{marginTop: 4, marginRight: 4}}>
                                    <Icon name="home-outline" style={{color: '#fff'}} size={20} />
                                </Box>
                                <Text style={{ lineHeight: 30, color: "#fff" }}>
                                    အစသို့ပြန်သွားမည်။
                                </Text>
                            </Box>
                        </Button>
                    </Box>
                </HStack>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff',
    },
    containerTwo: {
        flex:1,
        justifyContent: 'flex-end',
    },
    content:{
        marginTop: 100,
        padding:35,
        justifyContent:'center',
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 15
    },
    logoImage: {
        width: 200,
        height: 200,
        borderRadius: 15
    },
    bottomContainer: {
        width: '100%',
        padding: 20,
        backgroundColor: 'white', // Add background color if needed
    },
    box: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
});

export default SuccessScreen;