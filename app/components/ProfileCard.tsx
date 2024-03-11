import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";

interface IProps {
  img: string;
  name: string;
}

export default function ProfileCard(props: IProps) {
  const { img, name } = props;
  return (
    <View
      style={{
        backgroundColor: "white",
        elevation: 3,
        width: 160,
        padding: 10,
        borderRadius: 10,
        gap: 10,
      }}
    >
      <Image
        source={img}
        contentFit="contain"
        style={{
          height: 150,
        }}
      />
      <Text
        style={{
          fontFamily: "LilitaOne-Regular",
          fontSize: 18,
          textAlign: "center",
        }}
      >
        {name}
      </Text>
    </View>
  );
}
