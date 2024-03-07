import { Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import React from "react";

interface IButton {
  name: string;
  onPress?: () => void;
  fontStyle?: TextStyle;
  BtnStyle?: ViewStyle;
}

export default function AppButton(props: IButton) {
  const { onPress, name, fontStyle, BtnStyle } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        BtnStyle,
        {
          paddingVertical: 4,
          borderRadius: 10,
          elevation: 4,
        },
      ]}
    >
      <Text
        style={[
          fontStyle,
          {
            fontSize: 15,
            textAlign: "center",
            fontFamily: "Poppins-SemiBold",
          },
        ]}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
}
