import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  Button,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Header from "../../../components/Header";
import { createInformasi } from "../../../services/InformasiService";
import FormInput from "../../../components/form/FormInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import PrimaryButton from "../../../components/button/PrimaryButton";

export default function index() {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [waktu, setWaktu] = useState("");

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const toggleTimePicker = () => {
    setShowTimePicker(!showTimePicker);
  };

  const onChange = ({ type }: { type: string }, selectedDate: any) => {
    if (type === "set") {
      const currentDate = selectedDate || date;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();

        setTanggal(
          currentDate.toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        );
      }
    } else {
      toggleDatePicker();
    }
  };

  const onChangeTime = (event: any, selectedTime: any) => {
    if (selectedTime) {
      const currentTime = selectedTime || date;
      setDate(currentTime);

      if (Platform.OS === "android") {
        toggleTimePicker();
        setWaktu(
          currentTime.toLocaleTimeString("id-ID", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          })
        );
      }
    } else {
      toggleTimePicker();
    }
  };

  const handleCreateInformasi = async () => {
    console.log(judul, deskripsi, tanggal);

    try {
      await createInformasi({
        judul,
        deskripsi,
        tanggal,
        waktu,
      });

      router.push("/(auth)/login");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center">
      <StatusBar style="light" backgroundColor="#405B6A" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Header title="Pengajuan Informasi" />

          <View className="flex-1 p-6 gap-4">
            <View>
              <FormInput
                placeholder={"Judul Informasi"}
                onChangeText={(text) => setJudul(text)}
                value={judul}
                type="default"
              />
            </View>
            <View>
              <FormInput
                placeholder={"Deskripsi"}
                onChangeText={(text) => setDeskripsi(text)}
                value={deskripsi}
                type="default"
              />
            </View>
            <View>
              {showPicker && (
                <DateTimePicker value={date} mode="date" onChange={onChange} />
              )}

              <Pressable onPress={toggleDatePicker}>
                <FormInput
                  placeholder={"Hari Tanggal"}
                  onChangeText={setTanggal}
                  value={tanggal}
                  type="default"
                  editable={false}
                />
              </Pressable>
            </View>
            <View>
              {showTimePicker && (
                <DateTimePicker
                  value={date}
                  mode="time"
                  is24Hour={true}
                  onChange={onChangeTime}
                />
              )}

              <Pressable onPress={toggleTimePicker}>
                <FormInput
                  placeholder={"Waktu"}
                  onChangeText={setWaktu}
                  value={waktu}
                  type="default"
                  editable={false}
                />
              </Pressable>
            </View>

            <PrimaryButton title="Kirim" onPress={handleCreateInformasi} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
