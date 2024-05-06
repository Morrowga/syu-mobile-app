import {
  AspectRatio,
  Box,
  Button,
  Heading,
  Image,
  Text,
  View,
} from "native-base";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { deleteAllCartData } from "../../redux/slices/cartSlice";

const CheckoutScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleChoosePhoto = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 2],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleClearPhoto = () => {
    setImageUri(null);
    // handleChoosePhoto();
  };

  const onConfirm = () => {
    dispatch(deleteAllCartData());
    navigation.navigate("Home", { order_id: 1, isOpen: true });
  };
  return (
    <View style={styles.container}>
      <Box style={styles.imageUpload}>
        {imageUri ? (
          <TouchableWithoutFeedback onPress={handleClearPhoto}>
            <Image
              source={{ uri: imageUri }}
              style={styles.imagePreview}
              alt="preview"
            />
          </TouchableWithoutFeedback>
        ) : (
          <TouchableOpacity onPress={handleChoosePhoto}>
            <Icon
              name="cloud-upload"
              size={100}
              style={{ textAlign: "center" }}
            />
            <Heading>Click Here To Upload</Heading>
          </TouchableOpacity>
        )}
      </Box>
      <Box style={styles.buttonContainer}>
        <Button w="full" rounded="full" onPress={onConfirm}>
          Confirm
        </Button>
      </Box>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
  },
  imageUpload: {
    flex: 1,
    // borderWidth: 2,
    // borderRadius: 10,
    borderStyle: "dashed",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default CheckoutScreen;
