import { StyleSheet, Text, View } from "react-native";
import MainStyles from "../../components/styles/MainStyle";

const AdScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{...MainStyles.normalFont}}>Coming Soon...</Text>
    </View>
  )
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
},
});
export default AdScreen;
