import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AppButton from "../components/AppButton";
import { IUser, useUser } from "../hooks/zustand";
import { SettingNameID } from "../enum/setting.enum";
import AppAlarmBox from "../components/AppAlarmBox";
import { createUser } from "../api/POST";

export default function NewUser() {
  const { setUser } = useUser();
  const navigation = useNavigation();

  // const [userName, setUserName] = useState<string>("");
  const [payload, setPayload] = useState<IUser>({
    name: "",
    breakfast: "",
    dinner: "",
    lunch: "",
  });

  const [errorObj, setErrorObj] = useState<Record<string, string>>({
    name: "",
  });

  const [isCrud, setIsCrud] = useState(0);

  function handleSubmit() {
    setIsCrud(isCrud + 1);
    const error: Record<string, string> = {};
    if (!payload.name) {
      error.name = "Name should not be empty!";
    }

    if (Object.values(error).length > 0) {
      Object.assign(errorObj, error);
      return;
    }
    Keyboard.dismiss();
    createUser(payload)
      .then((res: any) => {
        if (res.rowsAffected === 1) {
          setUser(payload);
          navigation.navigate("Home" as never);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleTextInput(value: string) {
    setErrorObj({ ...errorObj, name: "" });
    setPayload({ ...payload, name: value });
  }

  function handlePayload(name: string, selectedDate: string[]) {
    switch (name) {
      case SettingNameID.SARAPAN:
        setPayload({ ...payload, breakfast: selectedDate.join(":") });
        break;
      case SettingNameID.MAKAN_SIANG:
        setPayload({ ...payload, lunch: selectedDate.join(":") });
        break;
      case SettingNameID.MAKAN_MALAM:
        setPayload({ ...payload, dinner: selectedDate.join(":") });
        break;

      default:
        break;
    }
  }

  useFocusEffect(useCallback(() => {}, [isCrud]));

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
        {/* <Image
          source={require("../../assets/AppIcon.png")}
          contentFit="contain"
          style={{ minHeight: 200, width: "100%" }}
        /> */}
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
              // borderColor: "#42459E",
              borderColor: `${errorObj.name ? "red" : "#42459E"}`,
              borderWidth: 1,
              width: 280,
              height: 45,
              borderRadius: 10,
              paddingHorizontal: 10,
              fontSize: 20,
            }}
            onChangeText={handleTextInput}
          />
          {errorObj.name && (
            <View
              style={{
                // backgroundColor: "yellow",
                width: "100%",
                paddingHorizontal: 20,
                paddingTop: 2,
              }}
            >
              <Text style={{ color: "red", fontSize: 12 }}>
                {errorObj.name}
              </Text>
            </View>
          )}

          {Object.values(SettingNameID).map((setting, i) => (
            <AppAlarmBox
              tittle={setting}
              key={i}
              handlePayload={handlePayload}
            />
          ))}

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
