import { View, Text, Pressable, Alert, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { getWargaById } from "../../../services/WargaService";
import { Ionicons } from "@expo/vector-icons";
import { loadUser } from "../../../services/AuthService";

type Warga = {
  nama_kk: string;
  jalan: string;
  blok: string;
  nomor_hp: string;
  status_kependudukan: number;
  jumlah_keluarga: number;
  user_id: number;
};

export default function detail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [user, setUser] = useState<any>();
  const [selectedWarga, setSelectedWarga] = useState<Warga | null>(null);

  useEffect(() => {
    const getWargaDetail = async (id: string) => {
      try {
        const response = await getWargaById(id);
        console.log("Warga Detail selected: ", response.data);
        setSelectedWarga(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await loadUser();
        console.log("User: ", response.id);
        setUser(response.id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUser();
    getWargaDetail(id ?? "");
  }, []);

  const handleWhatsapp = () => {
    const messageText = `Halo, apakah benar ini bapak/ibu ${selectedWarga?.nama_kk}? Saya ingin menghubungi anda.`;

    Alert.alert(
      "Peringatan",
      "Fitur hubungi warga hanya digunakan saat penting, apakah anda yakin?",
      [
        {
          text: "Batal",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Hubungi",
          onPress: () =>
            Linking.openURL(
              `https://wa.me/62${selectedWarga?.nomor_hp}?text=${messageText}`
            ),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View className="mt-3 p-6">
      <View className="flex-row gap-4 justify-between items-center px-3 py-4 rounded-xl mt-4">
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </Pressable>
        <Text className="text-2xl text-[#374151] font-black text-center capitalize">
          {selectedWarga?.nama_kk}
        </Text>
        <View className="w-6"></View>
      </View>
      <View className="px-3 py-4 rounded-xl mt-4">
        <View className="flex-row items-center gap-2">
          <Ionicons name="home" size={18} color="#374151" />
          <Text className="mb-1 text-[#374151] text-lg font-semibold">
            Informasi penduduk
          </Text>
        </View>
        <Text className="border-b text-[#374151] border-b-gray-200 pb-2 mt-2 capitalize">
          Perumahan taman gading Jl. {selectedWarga?.jalan},{" "}
          {selectedWarga?.blok}, Tegalkamulyan
        </Text>
        <Text className="pt-2">
          {selectedWarga?.jumlah_keluarga} anggota keluarga
        </Text>
      </View>
      <View className="px-3 py-4 rounded-xl mt-4">
        <View className="flex-row items-center gap-2">
          <Ionicons name="information-circle" size={18} color="#374151" />
          <Text className="mb-1 text-[#374151] text-lg font-semibold">
            Keterangan
          </Text>
          {selectedWarga?.status_kependudukan === 1 ? (
            <View className="px-2 py-1 rounded-full bg-green-600">
              <Text className="text-white">Menetap</Text>
            </View>
          ) : (
            <View className="px-2 py-1 rounded-full bg-orange-400">
              <Text className="text-white">Kontrak</Text>
            </View>
          )}
        </View>
        <Text className="pb-2 mt-2 capitalize"></Text>
      </View>
      {/* whatsapp button */}
      <Pressable
        onPress={handleWhatsapp}
        className="bg-green-500 px-3 py-2 rounded-xl mt-4"
      >
        <View className="flex-row items-center justify-center">
          <Ionicons name="logo-whatsapp" size={18} color="#fff" />
          <Text className="text-white ml-2">Hubungi via Whatsapp</Text>
        </View>
      </Pressable>

      {/* update data berdasarkan id user && user_id */}
      {user === selectedWarga?.user_id && (
        <Pressable
          onPress={() =>
            router.push({
              pathname: "(pages)/warga/update",
              params: { id: selectedWarga?.user_id },
            })
          }
          className="bg-blue-500 px-3 py-2 rounded-xl mt-4"
        >
          <View className="flex-row items-center justify-center">
            <Ionicons name="create" size={18} color="#fff" />
            <Text className="text-white ml-2">Update Datamu</Text>
          </View>
        </Pressable>
      )}
    </View>
  );
}
