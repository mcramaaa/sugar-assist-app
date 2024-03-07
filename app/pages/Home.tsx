/* eslint-disable react/jsx-curly-brace-presence */
import React, { useEffect } from "react";
import HomeHead from "../components/Home/HomeHead";
import GradientLayout from "../components/Layout/GradientLayout";
import AppScrollView from "../components/AppScrollView";
import { Text } from "react-native";

export default function Home() {
  const gradientProps = {
    startColor: "#E6E7FF",
    endColor: "white",
  };

  useEffect(() => {}, []);

  return (
    <>
      <GradientLayout gradientProps={gradientProps}>
        <HomeHead />
        <AppScrollView style={{ marginTop: 20, padding: 15 }} backcolor="white">
          <Text
            style={{
              color: "black",
              fontFamily: "Poppins-SemiBold",
              fontSize: 20,
              textAlign: "center",
            }}
          ></Text>
        </AppScrollView>
        <HomeHead />
      </GradientLayout>
    </>
  );
}
