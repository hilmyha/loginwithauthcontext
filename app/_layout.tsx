import { StyleSheet, Text, View } from "react-native";
import { Slot } from "expo-router";
import { AuthProvider } from "../context/AuthenticationContext";
import "../global.css";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
