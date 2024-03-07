import { KeyboardAvoidingView, Text, ViewStyle } from "react-native";
import React from "react";
import AppButton from "./AppButton";
import { TextInput } from "react-native-gesture-handler";

interface ITextInput {
  tittle: string;
  placeholder?: string;
  style?: ViewStyle;
  onChange?: (value: string) => void;
  onSubmit: () => void;
}

export default function AppTextInput(props: ITextInput) {
  const { onChange, onSubmit, tittle, placeholder, style } = props;
  return (
    <KeyboardAvoidingView
      style={[
        style,
        {
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 15,
          paddingVertical: 30,
          gap: 10,
        },
      ]}
    >
      <Text style={{ fontSize: 17, fontFamily: "Poppins-SemiBold" }}>
        {tittle}
      </Text>
      <TextInput
        placeholder={placeholder}
        style={{
          borderColor: "#42459E",
          borderWidth: 1,
          width: 280,
          height: 45,
          borderRadius: 10,
          paddingHorizontal: 10,
          fontSize: 20,
        }}
        onChangeText={onChange}
      />
      <AppButton
        BtnStyle={{
          backgroundColor: "#E6E7FF",
          paddingHorizontal: 20,
          marginTop: 20,
        }}
        name="Simpan"
        onPress={onSubmit}
      />
    </KeyboardAvoidingView>
  );
}
