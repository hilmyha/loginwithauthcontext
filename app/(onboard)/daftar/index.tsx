import { View, Text, SafeAreaView, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import Header from "../../../components/Header";
import FormInput from "../../../components/form/FormInput";
import PrimaryButton from "../../../components/button/PrimaryButton";
import { Link, router } from "expo-router";
import { useAuth } from "../../../context/AuthenticationContext";
import { StatusBar } from "expo-status-bar";
import { createWarga } from "../../../services/WargaService";

export default function register() {
  const [namaKK, setNamaKK] = useState("");
  const [blok, setBlok] = useState("");
  const [jalan, setJalan] = useState("");
  const [jumlahKeluarga, setJumlahKeluarga] = useState("");
  const [errors, setErrors] = useState<{
    namaKK: [];
    blok: [];
    jalan: [];
    jumlahKeluarga: [];
  }>({
    namaKK: [],
    blok: [],
    jalan: [],
    jumlahKeluarga: [],
  });

  const handleDaftar = async () => {
    try {
      await createWarga({
        nama_kk: namaKK,
        blok,
        jalan,
        jumlah_keluarga: parseInt(jumlahKeluarga),
      });
      console.log("berhasil daftar");

      router.push("/(tabs)/home");
    } catch (error: any) {
      if (error.response) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <SafeAreaView>
      <StatusBar style="light" backgroundColor="#405B6A" />
      <ScrollView>
        <Header
          title="Daftar Warga"
          desc="Daftarkan data diri anda agar data anda tersimpan dengan aman pada layanan kami."
        />
        <View className="p-6 flex-1 gap-4">
          <View>
            <FormInput
              placeholder={"Nama Kartu Keluarga"}
              onChangeText={(text) => setNamaKK(text)}
              value={namaKK}
              type="default"
              errors={errors?.namaKK}
            />
          </View>
          <View>
            <FormInput
              placeholder={"Blok"}
              onChangeText={(text) => setBlok(text)}
              value={blok}
              type="default"
              // errors={errors?.username}
            />
          </View>
          <View>
            <FormInput
              placeholder={"Jalan"}
              onChangeText={(text) => setJalan(text)}
              value={jalan}
              type="default"
              // errors={errors?.email}
            />
          </View>
          <View>
            <FormInput
              placeholder={"Jumlah Keluarga"}
              onChangeText={(text) => setJumlahKeluarga(text)}
              value={jumlahKeluarga.toString()}
              type="default"
              // errors={errors?.username}
            />
          </View>
          <View className="flex-row items-center">
            <Text className="text-[#4B5563] text-[12px] mr-1">
              Jangan lupa untuk melampirkan Kartu Keluarga anda pada menu profil
              untuk diserahkan kepada pengurus RT.
            </Text>
          </View>
          <PrimaryButton onPress={handleDaftar} title="Selanjutnya" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
