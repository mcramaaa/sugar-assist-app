import { LinearGradient } from "expo-linear-gradient";
import React, { ReactNode } from "react";
import { Platform, StatusBar, View, ViewStyle } from "react-native";

interface gradientProps {
  startColor: string;
  endColor: string;
}

interface LayoutProps {
  children: ReactNode;
  childStyle?: ViewStyle;
  motherStyle?: ViewStyle;
  gradientProps: gradientProps;
}

const GradientLayout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const { children, childStyle, motherStyle, gradientProps } = props;
  const statusBarHeight =
    Platform.OS === "ios" ? 45 : StatusBar.currentHeight ?? 0;

  return (
    <LinearGradient
      colors={[gradientProps.startColor, gradientProps.endColor]}
      style={[{ height: "100%", paddingHorizontal: 20 }, motherStyle]}
    >
      <View style={[{ paddingTop: statusBarHeight + 5 }, childStyle]}>
        {children}
      </View>
    </LinearGradient>
  );
};

export default GradientLayout;
