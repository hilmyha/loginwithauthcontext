import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{ headerShown: true, animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="register"
        options={{ headerShown: true, animation: "slide_from_right" }}
      />
    </Stack>
  );
}
