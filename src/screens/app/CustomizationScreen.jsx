import { StyleSheet, Text, View } from "react-native";

const CustomizationScreen = () => (
  <View style={styles.container}>
    <Text>Customization Screen</Text>
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
},
});
export default CustomizationScreen;
