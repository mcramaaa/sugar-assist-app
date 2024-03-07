import { View, Text, TextStyle } from "react-native";
import React from "react";

interface IHeader {
  name: string;
  textStyle?: TextStyle;
}
export default function FeatureHead(props: IHeader) {
  const { name, textStyle } = props;
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 15,
      }}
    >
      <Text
        style={
          textStyle === undefined
            ? {
                fontSize: 30,
                fontFamily: "LilitaOne-Regular",
                color: "white",
                textAlign: "center",
              }
            : [
                textStyle,
                {
                  textAlign: "center",
                  // fontFamily: "Poppins-SemiBold",
                },
              ]
        }
      >
        {name}
      </Text>
    </View>
  );
}
