import {
  View,
  Text,
  Button,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";
import {
  useFonts,
  Rubik_300Light,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_600SemiBold,
} from "@expo-google-fonts/rubik";
import { useAuth } from "../../../context/AuthContext";
import Header from "../../../components/Header";
import MenuCard from "../../../components/card/MenuCard";
import InformationCard from "../../../components/card/InformationCard";
import { StatusBar } from "expo-status-bar";

export default function home() {
  const infoCardArr = [
    {
      title: "Kumpul Warga",
      date: "1 Agustus 2024",
      time: "10:00",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In urna, euismod.",
    },
    {
      title: "Kerja Bakti",
      date: "9 Agustus 2024",
      time: "14:00",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In urna, euismod.",
    },
    {
      title: "Arisan RT",
      date: "12 Agustus 2024",
      time: "20:00",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In urna, euismod.",
    },
  ];

  const menuCardArr = [
    {
      iconame: "people",
      icolor: "#16A34A",
      bgcolor: "#22C55E",
      title: "Warga",
      // link: "pages/warga",
    },
    {
      iconame: "information-circle",
      icolor: "#D97706",
      bgcolor: "#F59E0B",
      title: "Informasi",
      // link: "pages/warga",
    },
    {
      iconame: "megaphone",
      icolor: "#DC2626",
      bgcolor: "#EF4444",
      title: "Panic Button",
      // link: "pages/warga",
    },
  ];

  const { onUser } = useAuth();

  return (
    <SafeAreaView className="flex-1 justify-center">
      <StatusBar style="light" backgroundColor="#405B6A" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          title="Selamat Datang"
          desc="Home Page"
          descHide={true}
          LIcon="arrow-back"
          RIcon="notifications"
          LIcoHide={true}
          RIcoHide={false}
        />
        {/* main */}
        <View className="p-6">
          <View className="flex-row justify-between pb-6">
            {menuCardArr.map((menuCard, index) => (
              <MenuCard
                key={index}
                icoName={menuCard.iconame}
                icoColor={menuCard.icolor}
                bgcolor={menuCard.bgcolor}
                title={menuCard.title}
              />
            ))}
          </View>
          <Text
            className="text-[22px] text-[#3A5261] mb-2"
            // style={{ fontFamily: "Rubik_600SemiBold" }}
          >
            Informasi Terbaru
          </Text>

          {infoCardArr.map((infoCard, index) => (
            <InformationCard
              key={index}
              title={infoCard.title}
              date={infoCard.date}
              time={infoCard.time}
              desc={infoCard.desc}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
