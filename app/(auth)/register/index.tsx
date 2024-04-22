import { View, Text, SafeAreaView, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import Header from "../../../components/Header";
import FormInput from "../../../components/form/FormInput";
import PrimaryButton from "../../../components/button/PrimaryButton";
import { Link, router } from "expo-router";
import { useAuth } from "../../../context/AuthenticationContext";
import { StatusBar } from "expo-status-bar";

export default function register() {
  const { onRegister } = useAuth();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState<{
    name: [];
    username: [];
    email: [];
    password: [];
    passwordConfirmation: [];
  }>({
    name: [],
    username: [],
    email: [],
    password: [],
    passwordConfirmation: [],
  });

  const handleRegister = async () => {
    try {
      const response = await onRegister!(
        name,
        username,
        email,
        password,
        passwordConfirmation
      );
      if (response && response.errors) {
        setErrors(response.errors);
      } else {
        router.push("/(onboard)/welcome");
      }
    } catch (error) {
      setErrors(null as any); // Set generic error message
    }
  };

  return (
    <SafeAreaView>
      <StatusBar style="light" backgroundColor="#405B6A" />
      <ScrollView>
        <Header
          title="Registrasi"
          desc="Silahkan registrasi sebagai user baru untuk melanjutkan"
        />
        <View className="p-6 flex-1 gap-4">
          <View>
            <FormInput
              placeholder={"Name"}
              onChangeText={(text) => setName(text)}
              value={name}
              type="default"
              errors={errors?.name}
            />
          </View>
          <View>
            <FormInput
              placeholder={"Username"}
              onChangeText={(text) => setUsername(text)}
              value={username}
              type="default"
              errors={errors?.username}
            />
          </View>
          <View>
            <FormInput
              placeholder={"Email"}
              onChangeText={(text) => setEmail(text)}
              value={email}
              type="email-address"
              errors={errors?.email}
            />
          </View>
          <View>
            <FormInput
              placeholder={"Password"}
              onChangeText={(text) => setPassword(text)}
              value={password}
              type="password"
              secureTextEntry={true}
              errors={errors?.username}
            />
          </View>
          <View>
            <FormInput
              placeholder={"Konfirmasi Password"}
              onChangeText={(text) => setPasswordConfirmation(text)}
              value={passwordConfirmation}
              type="password"
              secureTextEntry={true}
              errors={errors?.username}
            />
          </View>
          <PrimaryButton onPress={handleRegister} title="Registrasi" />
          <View className="flex-row items-center">
            <Text className="text-[#4B5563] text-[14px] mr-1">
              Sudah punya akun?
            </Text>
            <Pressable>
              <Link href={"(auth)/login"} asChild>
                <Text className="text-[#4B5563] text-[14px] underline">
                  Masuk
                </Text>
              </Link>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
