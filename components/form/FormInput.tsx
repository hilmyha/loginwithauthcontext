import { View, Text, TextInputProps, TextInput, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  placeholder: string;
  secureTextEntry?: boolean;
  type?: TextInputProps["keyboardType"] | "password";
  onChangeText?: TextInputProps["onChangeText"];
  value?: string;
  errors?: [];
};

export default function FormInput({
  placeholder,
  errors = [],
  ...rest
}: Props) {
  const [isHidden, setIsHidden] = useState(true);
  const [iconName, setIconName] = useState("eye-off");

  const styles = StyleSheet.create({
    texterror: {
      color: "red",
      fontSize: 12,
      marginTop: 2,
    },
  });

  return (
    <View>
      <View className="flex-row w-full items-center bg-white rounded-lg">
        <TextInput
          className="px-4 py-3 flex-1 text-[#9E9C98]"
          placeholder={placeholder}
          autoCapitalize="none"
          {...rest}
          secureTextEntry={rest.type === "password" && isHidden}
          keyboardType={rest.type === "password" ? "default" : rest.type}
        />
        {rest.type === "password" && (
          <Pressable
            onPress={() => {
              setIsHidden(!isHidden);
              setIconName(isHidden ? "eye" : "eye-off");
            }}
            className="mr-4"
          >
            <Ionicons name={iconName} size={24} color="#9E9C98" />
          </Pressable>
        )}
      </View>
      {errors.map((err) => (
        <Text key={err} style={styles.texterror}>
          {err}
        </Text>
      ))}
    </View>
  );
}
