import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function InformationCard(props: any) {
  return (
    <Pressable className="mb-4">
      <View className="bg-[#E5E7EB] p-4 rounded-xl">
        <View className="flex-row gap-2 items-center">
          <Ionicons name="newspaper" size={18} color="#374151" />
          <Text
            className="text-[#374151] text-[18px]"
            // style={{ fontFamily: "Rubik_500Medium" }}
          >
            {props.title}
          </Text>
        </View>
        <Text
          className="text-[#4B5563] text-[14px] mt-2 text-justify"
          // style={{ fontFamily: "Rubik_300Light" }}
        >
          {props.date} | {props.time}
        </Text>
        <Text
          className="text-[#374151] text-[16px] mt-2 text-justify"
          // style={{ fontFamily: "Rubik_400Regular" }}
        >
          {props.desc}
        </Text>
      </View>
    </Pressable>
  );
}
