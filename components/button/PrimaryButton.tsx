import { View, Text, Pressable } from "react-native";
import React from "react";

type Props = {
  title: string;
  onPress: () => void;
};

export default function PrimaryButton(props: Props) {
  return (
    <Pressable onPress={props.onPress}>
      <View className="bg-[#4E6E81] p-3 rounded-xl">
        <Text
          className="text-white text-center text-[16px]"
          // style={{ fontFamily: "Rubik_500Medium" }}
        >
          {props.title}
        </Text>
      </View>
    </Pressable>
  );
}
