import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Header from "../../../components/Header";
import FormInput from "../../../components/form/FormInput";
import PrimaryButton from "../../../components/button/PrimaryButton";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { createWarga } from "../../../services/WargaService";
import { Picker } from "@react-native-picker/picker";

export default function daftar() {
  const [namaKK, setNamaKK] = useState("");
  const [blok, setBlok] = useState("");
  const [jalan, setJalan] = useState("");
  const [jumlahKeluarga, setJumlahKeluarga] = useState("");
  const [statusKependudukan, setStatusKependudukan] = useState(false);
  const [nomorHp, setNomorHp] = useState("");

  const [selectedStatusKependudukan, setSelectedStatusKependudukan] =
    useState();
  const [errors, setErrors] = useState<{
    namaKK: [];
    blok: [];
    jalan: [];
    jumlahKeluarga: [];
    statusKependudukan: [];
  }>({
    namaKK: [],
    blok: [],
    jalan: [],
    jumlahKeluarga: [],
    statusKependudukan: [],
  });

  const handleDaftar = async () => {
    try {
      await createWarga({
        nama_kk: namaKK,
        blok,
        jalan,
        jumlah_keluarga: parseInt(jumlahKeluarga),
        status_kependudukan: statusKependudukan,
        nomor_hp: nomorHp,
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
              // errors={errors?.namaKK}
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
              type="number-pad"
              // errors={errors?.username}
            />
          </View>
          <View>
            <Text className="text-[#4B5563] text-[12px]">
              Status Kependudukan
            </Text>
            <Picker
              className="flex-row w-full items-center bg-white rounded-lg px-4 py-3 flex-1 text-[#9E9C98] "
              selectedValue={selectedStatusKependudukan}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedStatusKependudukan(itemValue);
                setStatusKependudukan(itemValue === "1" ? true : false);
              }}
            >
              <Picker.Item label="Kontrak" value="0" />
              <Picker.Item label="Tetap" value="1" />
            </Picker>
          </View>
          <View>
            <FormInput
              placeholder={"Nomor HP"}
              onChangeText={(text) => setNomorHp(text)}
              value={nomorHp}
              type="phone-pad"
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
