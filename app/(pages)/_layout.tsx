import React from "react";
import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="warga"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
    </Stack>
  );
}
