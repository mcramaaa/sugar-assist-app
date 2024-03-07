import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import Layout from "../components/Layout/Layout";
import { useNavigation } from "@react-navigation/native";
// import { useUser } from "../hooks/zustand";
// import * as SQLite from "expo-sqlite";
import { Image } from "expo-image";
import AppButton from "../components/AppButton";
import { useUser } from "../hooks/zustand";

export default function NewUser() {
  const { setUser } = useUser();
  // const [userName, setUserName] = useState("");

  // const db = SQLite.openDatabase("sapi.db");

  const navigation = useNavigation();

  // function createUser() {
  //   return new Promise((resolve, reject) => {
  //     db.transaction((tx) => {
  //       tx.executeSql(
  //         `INSERT INTO users (name) values (?)`,
  //         [userName],
  //         (_, { insertId, rowsAffected }) => {
  //           resolve({ insertId, rowsAffected });
  //         },
  //         (error) => {
  //           reject(error);
  //           return false;
  //         }
  //       );
  //     });
  //   });
  // }

  function handleSubmit() {
    Keyboard.dismiss();
    // createUser()
    //   .then((res: any) => {
    //     if (res.rowsAffected === 1) {
    //       setUser(userName);
    //       Navigation.navigate("AppTabs" as never);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    console.log("tes");
    navigation.navigate("Home" as never);
  }

  function handleTextInput(value: string) {
    setUser(value);
  }

  return (
    <Layout
      motherStyle={{ backgroundColor: "#E6E7FF" }}
      childStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <KeyboardAvoidingView
        style={[
          {
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          },
        ]}
      >
        <Image
          source={require("../../assets/AppIcon.png")}
          contentFit="contain"
          style={{ minHeight: 200, width: "100%" }}
        />
        <View>
          <Text
            style={{
              fontSize: 30,
              fontFamily: "Poppins-Bold",
              color: "#4E4E4E",
              textAlign: "center",
            }}
          >
            SAPI
          </Text>
          <Text
            style={{
              marginTop: 1,
              fontSize: 17,
              fontFamily: "Poppins-Regular",
              color: "black",
              textAlign: "center",
            }}
          >
            Sugar O'Clock Assistant for Parental Intervention
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "white",
            elevation: 4,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 15,
            paddingVertical: 30,
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ fontSize: 17, fontFamily: "Poppins-SemiBold" }}>
            Masukkan Nama :
          </Text>
          <TextInput
            // placeholder={placeholder}
            style={{
              borderColor: "#42459E",
              borderWidth: 1,
              width: 280,
              height: 45,
              borderRadius: 10,
              paddingHorizontal: 10,
              fontSize: 20,
            }}
            onChangeText={handleTextInput}
          />
          <AppButton
            BtnStyle={{
              backgroundColor: "#E6E7FF",
              paddingHorizontal: 20,
              marginTop: 20,
            }}
            name="Simpan"
            onPress={handleSubmit}
          />
        </View>
      </KeyboardAvoidingView>
    </Layout>
  );
}
