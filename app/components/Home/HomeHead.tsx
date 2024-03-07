import { View, Text } from "react-native";
import React from "react";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";

export default function HomeHead() {
  const Navigation = useNavigation();

  function goToProfile() {
    Navigation.navigate("Profile" as never);
  }
  return (
    <View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Entypo
          name="menu"
          size={30}
          color="#42459E"
          onPress={() => Navigation.dispatch(DrawerActions.openDrawer())}
        />
        <Text
          style={{
            fontSize: 30,
            fontFamily: "LilitaOne-Regular",
            color: "#42459E",
          }}
        >
          SAPI
        </Text>
        <MaterialIcons
          onPress={goToProfile}
          name="person"
          size={30}
          color="#42459E"
        />
      </View>
      <Text
        style={{
          marginTop: 10,
          fontSize: 17,
          fontFamily: "Poppins-Regular",
          color: "black",
          textAlign: "center",
        }}
      >
        Sugar O'Clock Assistant for Parental Intervention
      </Text>
    </View>
  );
}
