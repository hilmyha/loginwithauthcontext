import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Header from "../../../components/Header";
import FormInput from "../../../components/form/FormInput";
import { Picker } from "@react-native-picker/picker";

export default function index() {
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("");
  const [perihal, setPerihal] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const [selectedKategori, setSelectedKategori] = useState();

  const page = StyleSheet.create({
    picker: {
      backgroundColor: "white",
      borderRadius: 24,
      padding: 8,
      color: "#9E9C98",
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
            <Text className="text-[#4B5563] text-[12px] mb-2">
              Kategori
            </Text>
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
              onChangeText={(text) => setDeskripsi(text)}
              value={deskripsi}
              type="default"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
