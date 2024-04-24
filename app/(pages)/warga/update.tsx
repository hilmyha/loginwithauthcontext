import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { getWargaById, updateWarga } from "../../../services/WargaService";
import FormInput from "../../../components/form/FormInput";
import { Picker } from "@react-native-picker/picker";
import PrimaryButton from "../../../components/button/PrimaryButton";
import { StatusBar } from "expo-status-bar";
import Header from "../../../components/Header";

type Warga = {
  nama_kk: string;
  jalan: string;
  blok: string;
  status_kependudukan: number;
  jumlah_keluarga: number;
  nomor_hp: string;
};

export default function update() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [wargaData, setWargaData] = useState<Warga>({
    nama_kk: "",
    jalan: "",
    blok: "",
    status_kependudukan: 0,
    jumlah_keluarga: 0,
    nomor_hp: "",
  });

  useEffect(() => {
    const getWargaDetail = async (id: string) => {
      try {
        const response = await getWargaById(id);
        console.log("Warga Detail selected: ", response.data);
        setWargaData(response.data || wargaData); // In case response.data is null, maintain the existing wargaData
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getWargaDetail(id ?? "");
  }, []);

  const handleUpdate = async () => {
    try {
      await updateWarga(id ?? "", {
        ...wargaData,
        status_kependudukan: Boolean(wargaData.status_kependudukan),
      });
      console.log("berhasil update");
      console.log("wargaData", wargaData);

      router.push("/(tabs)/home");
    } catch (error: any) {
      console.error("Error updating data:", error);
    }
  };

  const page = StyleSheet.create({
    picker: {
      backgroundColor: "white",
      borderRadius: 24,
      padding: 8,
      color: "#9E9C98",
      marginVertical: 8,
    },
  });

  return (
    <SafeAreaView>
      <StatusBar style="light" backgroundColor="#405B6A" />
      <ScrollView>
        <Header title="Update Warga" />
        <View className="p-6 flex-1 gap-4">
          <View>
            <FormInput
              placeholder={"Nama Kartu Keluarga"}
              onChangeText={(text) =>
                setWargaData({ ...wargaData, nama_kk: text })
              }
              value={wargaData.nama_kk}
              type="default"
              // errors={errors?.namaKK}
            />
          </View>
          <View>
            <FormInput
              placeholder={"Blok"}
              onChangeText={(text) =>
                setWargaData({ ...wargaData, blok: text })
              }
              value={wargaData.blok}
              type="default"
              // errors={errors?.username}
            />
          </View>
          <View>
            <FormInput
              placeholder={"Jalan"}
              onChangeText={(text) =>
                setWargaData({ ...wargaData, jalan: text })
              }
              value={wargaData.jalan}
              type="default"
              // errors={errors?.email}
            />
          </View>
          <View>
            <FormInput
              placeholder={"Jumlah Keluarga"}
              onChangeText={(text) =>
                setWargaData({
                  ...wargaData,
                  jumlah_keluarga: text ? parseInt(text) : 0,
                })
              }
              value={wargaData.jumlah_keluarga.toString()}
              type="number-pad"
              // errors={errors?.username}
            />
          </View>
          <View>
            <Text className="text-[#4B5563] text-[12px]">
              Status Kependudukan
            </Text>
            <View>
              <Picker
                // className="items-center bg-white rounded-lg px-4 py-3 flex-1 text-[#9E9C98]"
                style={page.picker}
                selectedValue={wargaData.status_kependudukan ? "1" : "0"}
                onValueChange={(itemValue, itemIndex) => {
                  setWargaData({
                    ...wargaData,
                    status_kependudukan: itemValue === "1" ? 1 : 0,
                  });
                }}
              >
                <Picker.Item label="Kontrak" value="0" />
                <Picker.Item label="Tetap" value="1" />
              </Picker>
            </View>
          </View>
          <View>
            <FormInput
              placeholder={"Nomor HP"}
              onChangeText={(text) =>
                setWargaData({ ...wargaData, nomor_hp: text })
              }
              value={wargaData.nomor_hp}
              type="phone-pad"
              // errors={errors?.username}
            />
          </View>
          <PrimaryButton
            onPress={() =>
              Alert.alert(
                "Peringatan",
                "Apakah anda yakin ingin mengupdate data warga ini?",
                [
                  {
                    text: "Batal",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "Update",
                    onPress: () => handleUpdate(),
                  },
                ],
                { cancelable: false }
              )
            }
            title="Update"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
