import React from "react";
import LayoutV2 from "../components/Layout/LayoutV2";
import FeatureHead from "../components/FeatureHead";
import AppScrollView from "../components/AppScrollView";
import { View } from "react-native";

export default function About() {
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
        <View style={{ gap: 25, margin: 15 }}></View>
      </AppScrollView>
    </LayoutV2>
  );
}
