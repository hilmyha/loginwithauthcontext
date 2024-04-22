import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../../../components/button/PrimaryButton";
import { Image } from "expo-image";
import { router } from "expo-router";

export default function welcome() {
  const handlePress = () => {
    router.replace("daftar");
  };

  return (
    <SafeAreaView className="flex-1 p-6 justify-center items-center">
      <View>
        {/* image */}
        <View>
          <Image
            style={styles.image}
            source={require("../../../assets/welcome.svg")}
            contentFit="fill"
            transition={500}
          />
          <Text className="font-black text-4xl text-[#3A5261]">
            TG Connect,
          </Text>
          <Text className="mb-6">
            Dirancang untuk mengamankan data penduduk.
          </Text>
        </View>

        {/* button */}
        <View>
          <PrimaryButton onPress={handlePress} title="Get Started" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 350,
    height: 260,
  },
});
