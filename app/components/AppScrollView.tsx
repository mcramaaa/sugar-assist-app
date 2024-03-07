import { ScrollView, View, ViewStyle } from "react-native";
import React, { ReactNode } from "react";

interface IScrollView {
  children: ReactNode;
  style?: ViewStyle;
  backcolor?: string;
}
export default function AppScrollView(props: IScrollView) {
  const { children, style, backcolor } = props;
  return (
    <ScrollView
      style={[
        style,
        {
          backgroundColor: backcolor === undefined ? "white" : backcolor,
          height: "100%",
          borderRadius: 20,
          marginBottom: 50,
        },
      ]}
    >
      <View style={{ paddingBottom: 230 }}>{children}</View>
    </ScrollView>
  );
}
