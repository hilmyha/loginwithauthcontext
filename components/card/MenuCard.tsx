import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function MenuCard(props: any) {
  return (
    <Pressable onPress={() => console.log("Pressed")}>
      <View className="flex-col items-center">
        <View
          className="w-[100px] h-[64px] justify-center items-center rounded-2xl mb-[10px]"
          style={{ backgroundColor: props.bgcolor }}
        >
          <Ionicons name={props.icoName} size={32} color={props.icoColor} />
        </View>
        <Text className="text-[#3A5261]">{props.title}</Text>
      </View>
    </Pressable>
  );
}
