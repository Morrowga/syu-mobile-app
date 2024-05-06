import { StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

const OrderInfoScreen = () => {
  const navigation = useNavigation();

  const route = useRoute();

  useEffect(() => {
    const { params } = route;

    const { order_id, order_name } = params;

    navigation.setOptions({
      title: order_name,
      headerBackTitle: "Back",
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Order Info Screen</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default OrderInfoScreen;
