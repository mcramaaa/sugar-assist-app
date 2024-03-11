import React from "react";
import LayoutV2 from "../components/Layout/LayoutV2";
import FeatureHead from "../components/FeatureHead";
import AppScrollView from "../components/AppScrollView";
import { Text, View } from "react-native";
import LottieView from "lottie-react-native";
import toDentist from "../assets/toDentist.json";
import { Image } from "expo-image";
import ProfileCard from "../components/ProfileCard";

export default function About() {
  const profiles = [
    {
      img: require("../../assets/profile/Dodo.png"),
      Name: "Dodo",
    },
    {
      img: require("../../assets/profile/Ossama.png"),
      Name: "Ossama",
    },
    {
      img: require("../../assets/profile/Wulan.png"),
      Name: "Wulan",
    },
    {
      img: require("../../assets/profile/Dyta.png"),
      Name: "Dyta",
    },
    {
      img: require("../../assets/profile/Nadien.png"),
      Name: "Nadien",
    },
  ];
  return (
    <LayoutV2 motherStyle={{ backgroundColor: "#E6E7FF" }}>
      <FeatureHead
        name="Tentang Kami"
        textStyle={{
          color: "black",
          fontFamily: "LilitaOne-Regular",
          fontSize: 30,
        }}
      />
      <AppScrollView style={{ marginTop: 20, padding: 15 }}>
        <View
          style={{
            margin: 15,
            gap: 5,
            alignItems: "center",
          }}
        >
          <FeatureHead
            name="Tentang Aplikasi"
            textStyle={{
              color: "black",
              fontFamily: "LilitaOne-Regular",
              fontSize: 23,
            }}
          />
          <View
            style={{
              borderWidth: 10,
              borderColor: "white",
              elevation: 2,
              borderRadius: 100,
              width: 200,
              height: 200,
              position: "relative",
            }}
          >
            <Image
              source={require("../../assets/AppIcon.png")}
              contentFit="contain"
              style={{ height: "100%", width: "100%" }}
            />
          </View>

          <Text style={{ textAlign: "justify", fontSize: 16 }}>
            SAPI (Sugar Clock Assistant for Parental Intervention) adalah sebuah
            aplikasi inovatif yang dirancang untuk membantu orangtua dalam
            mengelola dan mengatur pola diet gula anak-anak mereka, berlandaskan
            pada prinsip Sugar Clock. Aplikasi ini bertujuan untuk meningkatkan
            kesadaran dan pemahaman orangtua tentang pentingnya mengontrol
            asupan gula pada anak, serta memberikan alat bantu praktis untuk
            menerapkan kebiasaan makan yang lebih sehat.
          </Text>
        </View>
        <View
          style={{
            margin: 15,
            gap: 5,
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FeatureHead
              name="Penyusun"
              textStyle={{
                color: "black",
                fontFamily: "LilitaOne-Regular",
                fontSize: 23,
              }}
            />
            <Text style={{ marginTop: 25, textAlign: "justify", fontSize: 16 }}>
              Kami adalah Kelompok 44 mahasiswa Fakultas Kedokteran Gigi
              Universitas Airlangga, yang menjalani Praktik Kerja Lapangan (PKL)
              di Puskesmas Gunung Anyar. Dengan semangat untuk berkontribusi
              pada peningkatan kesehatan masyarakat, kami berinisiatif
              mengembangkan aplikasi mobile ini sebagai sarana edukasi dan
              pelayanan kesehatan gigi yang mudah diakses oleh masyarakat.
            </Text>
            {profiles.map((profile, i) => (
              <ProfileCard key={i} img={profile.img} name={profile.Name} />
            ))}
          </View>
          <LottieView
            autoPlay
            source={toDentist}
            style={{ height: 250, width: 250 }}
          />
          <Text style={{ textAlign: "center", fontSize: 16 }}>
            Ayo jaga kesehatan gigi dan mulut Anda dengan berkunjung ke
            Puskesmas Gunung Anyar atau dokter gigi terdekat! Mari kita
            prioritaskan perawatan gigi secara teratur untuk senyum yang lebih
            cerah dan kesehatan tubuh yang optimal.
          </Text>
        </View>
      </AppScrollView>
    </LayoutV2>
  );
}
