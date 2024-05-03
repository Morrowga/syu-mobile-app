import { StyleSheet, Text, View } from "react-native";

const WishlistScreen = () => (
  <View style={styles.container}>
    <Text>Wishlist Screen</Text>
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default WishlistScreen;
