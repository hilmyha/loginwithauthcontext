import React from "react";
import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, animation: "slide_from_right" }}  />
      <Stack.Screen name="[id]" options={{ headerShown: false, animation: "slide_from_right" }}  />
      <Stack.Screen name="update" options={{ headerShown: false, animation: "slide_from_right" }}  />
    </Stack>
  );
}
