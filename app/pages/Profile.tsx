import { Keyboard, KeyboardAvoidingView, Text, View } from "react-native";
import React, { useState } from "react";
import { useUser } from "../hooks/zustand";
import AppTextInput from "../components/AppTextInput";
import GradientLayout from "../components/Layout/GradientLayout";
import AppButton from "../components/AppButton";
import LottieView from "lottie-react-native";
import profile from "../assets/profile.json";

export default function Profile() {
  const { user, setUser } = useUser();
  const [userName, setUserName] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  function ChangeNamBtn() {
    setIsEdit(true);
  }

  function handleSubmit() {
    setUser({ ...user, name: userName });
    Keyboard.dismiss();
    setIsEdit(false);
  }

  function handleTextInput(value: string) {
    setUserName(value);
  }

  const gradientProps = {
    startColor: "#E6E7FF",
    endColor: "#E6E7FF",
  };

  return (
    <GradientLayout
      motherStyle={{ flex: 1 }}
      gradientProps={gradientProps}
      childStyle={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LottieView
        autoPlay
        source={profile}
        style={{ height: 250, width: 250 }}
      />
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 20,
          padding: 10,
          width: "100%",
          height: 250,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <KeyboardAvoidingView
          behavior="position"
          style={{
            justifyContent: "space-around",
            height: "100%",
            display: isEdit ? "none" : "flex",
            elevation: 4,
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 25 }}>Nama :</Text>
          <Text style={{ textAlign: "center", fontSize: 25 }}>{user.name}</Text>
          <AppButton
            name="Ubah Nama"
            onPress={ChangeNamBtn}
            BtnStyle={{ paddingHorizontal: 40, backgroundColor: "#E6E7FF" }}
          />
        </KeyboardAvoidingView>
        <AppTextInput
          tittle="Masukkan Nama :"
          placeholder="Masukkan Nama"
          onChange={handleTextInput}
          onSubmit={handleSubmit}
          style={{ display: isEdit ? "flex" : "none" }}
        />
      </View>
    </GradientLayout>
  );
}
