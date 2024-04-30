import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Button,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Header from "../../../components/Header";
import FormInput from "../../../components/form/FormInput";
import { Picker } from "@react-native-picker/picker";
import PrimaryButton from "../../../components/button/PrimaryButton";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Image } from "expo-image";
import { createLaporan } from "../../../services/LaporanService";
import { router } from "expo-router";

export default function index() {
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("");
  const [perihal, setPerihal] = useState("");
  const [isi, setIsi] = useState("");
  const [image, setImage] = useState("");

  const [selectedKategori, setSelectedKategori] = useState();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // set image dari hasil pick image
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleLaporan = async () => {
    try {
      console.log(judul, kategori, perihal, isi, image);
      await createLaporan({
        judul,
        kategori,
        perihal,
        isi,
        img_url: image,
      });

      router.push("(auth)/login");
    } catch (error: any) {
      // carikan errornya dimana
      console.log(error);
    }
  };

  const page = StyleSheet.create({
    picker: {
      backgroundColor: "white",
      borderRadius: 24,
      padding: 8,
      color: "#9E9C98",
    },
  });

  const styles = StyleSheet.create({
    image: {
      width: 300,
      height: 200,
    },
  });

  return (
    <SafeAreaView className="flex-1 justify-center">
      <StatusBar style="light" backgroundColor="#405B6A" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title="Laporan dan Usulan" />
        <View className="p-6 flex-1 gap-4">
          <View>
            <FormInput
              placeholder={"Judul"}
              onChangeText={(text) => setJudul(text)}
              value={judul}
              type="default"
            />
          </View>
          <View>
            <Text className="text-[#4B5563] text-[12px] mb-2">Kategori</Text>
            <Picker
              style={page.picker}
              selectedValue={selectedKategori}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedKategori(itemValue);
                setKategori(itemValue === "usulan" ? "usulan" : "laporan");
              }}
            >
              <Picker.Item label="Usulan" value="usulan" />
              <Picker.Item label="Laporan" value="laporan" />
            </Picker>
          </View>
          <View>
            <FormInput
              placeholder={"Perihal"}
              onChangeText={(text) => setPerihal(text)}
              value={perihal}
              type="default"
            />
          </View>
          <View>
            <FormInput
              placeholder={"Isi Laporan/Usulan"}
              onChangeText={(text) => setIsi(text)}
              value={isi}
              type="default"
            />
          </View>
          <View className="flex-1 items-center justify-center">
            {/* {image && <Image source={{ uri: image }} style={styles.image} />} */}
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Pressable onPress={pickImage}>
                <Text className="text-[#4B5563] text-[12px] underline">Upload Gambar</Text>
              </Pressable>
            )}
          </View>
          <PrimaryButton title="Kirim" onPress={handleLaporan} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
