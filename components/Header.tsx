import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

function HeaderIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function Header(props: {
  title?: string;
  desc?: string;
  descHide?: boolean;
  LIcon?: string;
  RIcon?: string;
  LIcoHide?: boolean;
  RIcoHide?: boolean;
}) {
  return (
    <View className="flex-1 gap-2 bg-[#4E6E81] p-6 rounded-bl-3xl">
      <View className="flex-row justify-between items-center">
        {props.LIcoHide ? (
          <View className="hidden" />
        ) : (
          <Pressable onPress={() => router.back()}>
            <HeaderIcon name={props.LIcon} color="white" />
          </Pressable>
        )}
        <Text className="text-[30px] font-extrabold text-white">
          {props.title}
        </Text>
        {props.RIcoHide ? (
          <View className="hidden" />
        ) : (
          <Pressable>
            <HeaderIcon name={props.RIcon} color="white" />
          </Pressable>
        )}
      </View>
      {props.descHide ? (
        <View className="hidden" />
      ) : (
        <View className="flex-row justify-between items-center">
          <Text className="text-white">{props.desc}</Text>
        </View>
      )}
    </View>
  );
}
