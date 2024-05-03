import { StyleSheet, Text, View } from "react-native";

const ProductListScreen = () => (
  <View style={styles.container}>
    <Text>Product List Screen</Text>
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ProductListScreen;
