import { StyleSheet, Text, View } from "react-native";

const NewFeedScreen = () => (
  <View style={styles.container}>
    <Text>New Feed</Text>
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default NewFeedScreen;
