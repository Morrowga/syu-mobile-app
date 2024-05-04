import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const NotificationIcon = ({ notificationCount }) => {
  return (
    <View style={styles.container}>
      <Icon name="notifications" size={30} color="tomato" />
      {notificationCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{notificationCount}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50, // Adjust width and height as needed
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginRight: 15, // Spacing for visual clarity
  },
  badge: {
    position: "absolute",
    right: -6, // Adjust position based on your needs
    top: -3,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20, // Adjust size accordingly
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default NotificationIcon;
