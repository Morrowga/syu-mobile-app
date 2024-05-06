import { StyleSheet, Text, View } from "react-native";

const HomeScreen = () => {

  const slides = [
    { id: 1, image: require('../../../assets/innerlogo.png') },
    { id: 2, image: require('../../../assets/innerlogo.png') },
    { id: 3, image: require('../../../assets/innerlogo.png') },
  ];
  

  <View style={styles.container}>
    <Text>Home Screen</Text>
  </View>
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
},
});
export default HomeScreen;
