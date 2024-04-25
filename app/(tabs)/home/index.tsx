import {
  View,
  Text,
  Button,
  Alert,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { getInformasi } from "../../../services/InformasiService";

export default function home() {
  const [informasi, setInformasi] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const getDataInformasi = async () => {
      try {
        const response = await getInformasi();
        console.log("response", response);

        setInformasi(response.data);

        setLoading(false);
      } catch (error) {
        setIsEmpty(true);
      }
    };

    getDataInformasi();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getInformasi().then((response) => {
      setInformasi(response.data);
      setRefreshing(false);
    });
  };

  const Splash = () => {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={{ marginTop: 20 }}
      />
    );
  };

  const menuCardArr = [
    {
      iconame: "people",
      icolor: "#16A34A",
      bgcolor: "#22C55E",
      title: "Warga",
      link: "(pages)/warga",
    },
    {
      iconame: "information-circle",
      icolor: "#D97706",
      bgcolor: "#F59E0B",
      title: "Informasi",
      link: "(pages)/warga",
    },
    {
      iconame: "megaphone",
      icolor: "#DC2626",
      bgcolor: "#EF4444",
      title: "Panic Button",
      link: "(pages)/warga",
    },
  ];

  return (
    <SafeAreaView className="flex-1 justify-center">
      <StatusBar style="light" backgroundColor="#405B6A" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Header
          title="Selamat Datang"
          descHide={false}
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
                link={menuCard.link}
              />
            ))}
          </View>
          <Text
            className="text-[22px] text-[#3A5261] mb-2"
            // style={{ fontFamily: "Rubik_600SemiBold" }}
          >
            Informasi Terbaru
          </Text>

          {loading && <Splash />}
          {isEmpty && <Text>Data is empty</Text>}
          {informasi.map((item: any, index) => (
            <InformationCard
              key={index}
              title={item.judul}
              date={item.tanggal}
              desc={item.deskripsi}
              time={item.waktu}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
