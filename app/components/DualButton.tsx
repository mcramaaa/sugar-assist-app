import { TextStyle, View } from "react-native";
import React from "react";
import AppButton from "./AppButton";

interface IButton {
  Rname: string;
  RonPress: () => void;
  Lname: string;
  LonPress: () => void;
  fontStyle?: TextStyle;
}

export default function DualButton(props: IButton) {
  const { Rname, RonPress, fontStyle, Lname, LonPress } = props;
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        justifyContent: "space-around",
        padding: 10,
      }}
    >
      <AppButton
        onPress={LonPress}
        name={Lname}
        BtnStyle={{ backgroundColor: "#FBA1B7", width: 160 }}
        fontStyle={fontStyle}
      />
      <AppButton
        onPress={RonPress}
        name={Rname}
        BtnStyle={{ backgroundColor: "#FFC5C5", width: 160 }}
        fontStyle={fontStyle}
      />
    </View>
  );
}
