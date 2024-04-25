import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { useAuth } from "../../../context/AuthenticationContext";
import { StatusBar } from "expo-status-bar";
import Header from "../../../components/Header";
import PrimaryButton from "../../../components/button/PrimaryButton";

export default function profile() {
  const { authState, onUser, onLogout } = useAuth();

  useEffect(() => {
    if (!authState!.user && authState!.authenticated) {
      const fetchUser = async () => {
        if (onUser) {
          await onUser();
        }
      };
      fetchUser();
    }
  }, [authState!.user, authState!.authenticated, onUser]);

  function handleLogout() {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => onLogout && onLogout() },
    ]);
  }

  function Splash() {
    return (
      <View className="w-full h-full flex-1 justify-center items-center">
        <ActivityIndicator color={"black"} size={"large"} />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 justify-center">
      <StatusBar style="light" backgroundColor="#405B6A" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {authState!.authenticated && authState!.user ? (
          <View>
            <Header
              title={authState!.user.name}
              desc={authState!.user.email}
              descHide={false}
            />
            {authState!.user.is_admin ? (
              <View className="p-6">
                <Text>Admin</Text>
              </View>
            ) : null}
          </View>
        ) : (
          <View>
            <View className="flex-1 gap-2 bg-[#4E6E81] px-6 pt-24 pb-6 rounded-bl-3xl">
              <View className="flex justify-center items-center">
                <Splash />
                <View className="flex justify-center items-center">
                  <Splash />
                </View>
              </View>
            </View>
            <Splash />
          </View>
        )}
        <View className="p-6">
          <PrimaryButton onPress={handleLogout} title="Logout" />
          <Text className="bottom-0 text-center">Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
