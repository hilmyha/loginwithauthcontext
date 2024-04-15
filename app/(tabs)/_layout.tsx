import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

export default function AppLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ headerShown: true }} />
      <Tabs.Screen name="about" options={{ headerShown: true }} />
    </Tabs>
  );
}
