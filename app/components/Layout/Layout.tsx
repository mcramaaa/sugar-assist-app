// Layout.tsx
import React, { ReactNode } from "react";
import { Platform, StatusBar, View, ViewStyle } from "react-native";

interface LayoutProps {
  children: ReactNode;
  childStyle?: ViewStyle;
  motherStyle?: ViewStyle;
}

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const { children, childStyle, motherStyle } = props;
  const statusBarHeight =
    Platform.OS === "ios" ? 45 : StatusBar.currentHeight ?? 0;
  return (
    <View style={[{ height: "100%", paddingHorizontal: 20 }, motherStyle]}>
      <View style={[{ marginTop: statusBarHeight + 5 }, childStyle]}>
        {children}
      </View>
    </View>
  );
};

export default Layout;
