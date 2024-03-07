import { View, Text } from "react-native";
import React from "react";

interface IName {
  name: string;
}

export default function Name(props: IName) {
  const { name } = props;
  return (
    <View>
      <Text style={{ fontSize: 20 }}>
        Hallo,{" "}
        <Text style={{ fontWeight: "bold", textTransform: "uppercase" }}>
          {name}
        </Text>
      </Text>
    </View>
  );
}
