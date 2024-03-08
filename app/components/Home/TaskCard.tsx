import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";

interface IProps {
  is_active: boolean;
  nameTask?: string;
  hourTask?: string;
  icon?: any;
}

export default function TaskCard(props: IProps) {
  const { is_active, nameTask, hourTask, icon } = props;
  return (
    <View
      style={{
        backgroundColor: is_active ? "#42459E" : "#F1F1FF",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 7,
        gap: 7,
        marginHorizontal: 15,
        elevation: 2,
      }}
    >
      <Image
        contentFit="contain"
        source={require("../../../assets/AppIcon.png")}
        style={{ height: 50, width: 50 }}
      />
      <View>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Poppins-SemiBold",
            color: is_active ? "white" : "#42459E",
          }}
        >
          {nameTask}
        </Text>
        <Text
          style={{
            fontSize: 17,
            fontFamily: "Poppins-Regular",
            color: is_active ? "white" : "#42459E",
          }}
        >
          {hourTask}
        </Text>
      </View>
    </View>
  );
}
