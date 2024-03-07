import { View, Text, TextStyle } from "react-native";
import React from "react";

interface IProps {
  title?: string;
  data?: string;
  titleStyle?: TextStyle;
}

export default function AppULText(props: IProps) {
  const { title, data, titleStyle } = props;
  return (
    <View style={{ alignItems: "flex-start", gap: 5 }}>
      <View style={{ flexDirection: "row" }}>
        {/* <Octicons name="dot" size={20} color="black" /> */}
        <Text
          style={
            titleStyle !== undefined
              ? [titleStyle]
              : { fontFamily: "Poppins-SemiBold", width: "30%" }
          }
        >
          {title}
        </Text>
      </View>
      <Text
        style={
          data !== undefined
            ? {
                fontFamily: "Poppins-Regular",
                flexWrap: "wrap",
                width: "90%",
                textAlign: "justify",
              }
            : { display: "none" }
        }
      >
        {data}
      </Text>
    </View>
  );
}
