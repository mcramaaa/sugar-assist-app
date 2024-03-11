import { View, Text } from "react-native";
import React from "react";

interface IProps {
  title?: string;
  data?: string;
}

export default function AppLIText(props: IProps) {
  const { data } = props;
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 5,
        marginLeft: 15,
      }}
    >
      {/* <Octicons name="dot" size={20} color="black" /> */}

      <Text style={{ fontFamily: "Poppins-Regular" }}>~</Text>
      <Text style={{ fontFamily: "Poppins-Regular" }}>{data}</Text>
    </View>
  );
}
