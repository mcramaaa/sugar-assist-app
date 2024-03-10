import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Image } from "expo-image";
import { useUser } from "../hooks/zustand";
import { useNavigation } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";

export default function AppDrawer(props: any) {
  const { user } = useUser();
  const db = SQLite.openDatabase("sapi.db");
  //   const statusBarHeight =
  //     Platform.OS === "ios" ? 45 : StatusBar.currentHeight ?? 0;
  const navigation = useNavigation();

  function emptyTable() {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM users",
        [],
        (_, result) => {
          console.log("Table emptied successfully");
        },
        (error) => {
          console.error("Error while emptying the table:", error);
          return false;
        }
      );
    });
  }

  function goToProfile() {
    navigation.navigate("Profile" as never);
  }
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView>
        <View
          style={{
            backgroundColor: "white",
            padding: 10,
            marginBottom: 15,
            borderBottomWidth: 0.2,
            borderBottomColor: "#42459E",
          }}
        >
          <Image
            source={require("../../assets/AppIcon.png")}
            // resizeMode={ResizeMode.CONTAIN}
            contentFit="contain"
            style={{ minHeight: 150 }}
          />
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 15,
            }}
          >
            <TouchableOpacity
              onPress={goToProfile}
              style={{
                backgroundColor: "#E6E7FF",
                //  elevation: 4,
                borderRadius: 20,
                paddingHorizontal: 10,
                paddingVertical: 4,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                }}
              >
                Hai {user.name}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Text style={{ marginBottom: 100 }} onPress={emptyTable}>
        we are
      </Text>
    </View>
  );
}
