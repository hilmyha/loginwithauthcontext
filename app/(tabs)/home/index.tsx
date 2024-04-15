import { View, Text, Button, Alert } from "react-native";
import React from "react";
import { useAuth } from "../../../context/AuthContext";

export default function home() {
  const { onLogout } = useAuth();

  function logout() {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => onLogout && onLogout() },
    ]);
  }

  return (
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <View className="flex-1 p-5 bg-gray-400">
      <Text>home</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
