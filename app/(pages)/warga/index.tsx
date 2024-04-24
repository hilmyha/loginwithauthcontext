import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getWarga } from "../../../services/WargaService";
import Header from "../../../components/Header";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

const Splash = () => {
  return (
    <View>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default function warga() {
  const [warga, setWarga] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getWarga();
        setWarga(response.data);
        setLoading(false);
      } catch (error) {
        setIsEmpty(true);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar style="light" backgroundColor="#405B6A" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          title="Warga"
          desc="Daftar warga yang terdaftar di perumahan."
          LIcon="arrow-back"
        />
        {loading && <Splash />}
        {isEmpty && <Text>Data is empty</Text>}
        <View className="p-6">
          {warga.map((item: any) => (
            <Pressable
              key={item.id}
              onPress={() =>
                router.push({
                  pathname: "(pages)/warga/[id]",
                  params: { id: item.id },
                })
              }
              className="bg-[#E5E7EB] p-4 rounded-xl mb-4"
            >
              <View className="flex-row items-center justify-between gap-3">
                <View className="p-6 rounded-full bg-white"></View>
                <View className="flex-1">
                  <Text className="font-bold">{item.nama_kk}</Text>
                  <Text>{item.blok}</Text>
                  <Text className="font-semibold underline">Jl.{item.jalan}</Text>
                </View>
                <Ionicons name="arrow-forward" size={24} color={"gray"} />
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
