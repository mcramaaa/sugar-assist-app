import React from "react";

import GradientLayout from "../components/Layout/GradientLayout";
import { Text, View } from "react-native";
import FeatureHead from "../components/FeatureHead";
import AppScrollView from "../components/AppScrollView";
import AppButton from "../components/AppButton";

export default function Setting() {
  const gradientProps = {
    startColor: "#E6E7FF",
    endColor: "white",
  };

  return (
    <GradientLayout gradientProps={gradientProps}>
      <FeatureHead
        name="Pengaturan"
        textStyle={{
          color: "black",
          fontFamily: "LilitaOne-Regular",
          fontSize: 30,
        }}
      />
      <AppScrollView
        style={{
          marginTop: 30,
          height: "100%",
          borderRadius: 20,
          marginBottom: 50,
        }}
      >
        <View style={{ padding: 10, gap: 40, paddingBottom: 230 }}>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Poppins-SemiBold",
              fontSize: 17,
            }}
          >
            Jam Sarapan
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Poppins-SemiBold",
              fontSize: 17,
            }}
          >
            Jam Sarapan
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Poppins-SemiBold",
              fontSize: 17,
            }}
          >
            Jam Sarapan
          </Text>
          <AppButton
            BtnStyle={{
              backgroundColor: "#E6E7FF",
              paddingHorizontal: 20,
              marginTop: 20,
              paddingVertical: 10,
            }}
            fontStyle={{ paddingVertical: 5, fontSize: 18 }}
            name="Simpan"
          />
        </View>
      </AppScrollView>
    </GradientLayout>
  );
}
