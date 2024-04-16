import { View, Text, Pressable, SafeAreaView, ScrollView } from "react-native";
import { useContext, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import Header from "../../../components/Header";
import FormInput from "../../../components/form/FormInput";
import PrimaryButton from "../../../components/button/PrimaryButton";
import { Link } from "expo-router";

export default function login() {
  const { onLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ username: []; password: [] }>({
    username: [],
    password: [],
  });

  const login = async () => {
    try {
      const response = await onLogin!(username, password);
      if (response && response.errors) {
        setErrors(response.errors); // Set error message from response
      }
    } catch (error) {
      setErrors(null as any); // Set generic error message
    }
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          title="Login"
          desc="Masuk untuk melanjutkan"
          descHide={false}
          LIcon="arrow-back"
          RIcon="notifications"
          LIcoHide={true}
          RIcoHide={true}
        />
        <View className="p-6 flex-1 gap-4">
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
              placeholder={"Password"}
              onChangeText={(text) => setPassword(text)}
              value={password}
              type="password"
              secureTextEntry={true}
              errors={errors.password}
            />
          </View>
          <PrimaryButton onPress={login} title="Login" />
          <View className="flex-row items-center">
            <Text className="text-[#4B5563] text-[14px] mr-1">
              Belum punya akun?
            </Text>
            <Pressable>
              <Link href={"(auth)/register"} asChild>
                <Text className="text-[#4B5563] text-[14px] underline">
                  Daftar sekarang
                </Text>
              </Link>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
