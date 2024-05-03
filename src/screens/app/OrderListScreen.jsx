import { StyleSheet, Text, View } from "react-native";

const OrderListScreen = () => (
  <View style={styles.container}>
    <Text>Order List Screen</Text>
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default OrderListScreen;
