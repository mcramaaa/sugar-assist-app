import { ScrollView, View, ViewStyle } from "react-native";
import React, { ReactNode } from "react";

interface IScrollView {
  height?: any;
  children: ReactNode;
  style?: ViewStyle;
  backcolor?: string;
}
export default function AppScrollView(props: IScrollView) {
  const { children, height, style, backcolor } = props;
  return (
    <ScrollView
      style={[
        style,
        {
          backgroundColor: backcolor === undefined ? "white" : backcolor,
          height: height === undefined ? "100%" : height,
          borderRadius: 20,
          marginBottom: 50,
        },
      ]}
    >
      <View style={{ paddingBottom: 230 }}>{children}</View>
    </ScrollView>
  );
}
