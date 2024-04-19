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

  function logout() {
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
            <Header title={authState!.user.username} descHide={true} />
            <Text>Email: {authState!.user.email}</Text>
            <Text>Username: {authState!.user.username}</Text>
          </View>
        ) : (
          <View>
            <Splash />
          </View>
        )}
        <View>
          <Pressable onPress={logout} className="bg-[#4E6E81]">
            <Text>Logout</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
