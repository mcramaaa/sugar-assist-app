import React, { useCallback, useState } from "react";

import GradientLayout from "../components/Layout/GradientLayout";
import { Text, View } from "react-native";
import FeatureHead from "../components/FeatureHead";
import AppScrollView from "../components/AppScrollView";
import AppButton from "../components/AppButton";
import AppAlarmBox from "../components/AppAlarmBox";
import { SettingNameID } from "../enum/setting.enum";
import { IUser, UserDefaultValue } from "../hooks/zustand";
import { useFocusEffect } from "@react-navigation/native";
import { getUsers } from "../api/GET";

export default function Setting() {
  /**
   * State
   */
  const [payload, setPayload] = useState<IUser & { id: number }>(
    Object.assign(UserDefaultValue, { id: 1 })
  );

  /**
   * Client
   */

  const gradientProps = {
    startColor: "#E6E7FF",
    endColor: "white",
  };

  useFocusEffect(
    useCallback(() => {
      getUsers().then((res: any) => {
        setPayload(res[0]);
        console.log(res[0]);
      });
    }, [])
  );

  return (
    <GradientLayout gradientProps={gradientProps}>
      <FeatureHead
        name="Pengaturan"
        textStyle={{
          color: "black",
          fontFamily: "LilitaOne-Regular",
          fontSize: 30,
        }}
      />
      <AppScrollView
        style={{
          marginTop: 30,
          borderRadius: 20,
          marginBottom: 50,
        }}
      >
        <View style={{ padding: 10, gap: 40, paddingBottom: 230 }}>
          {payload.name &&
            Object.values(SettingNameID).map((setting, i) => {
              return (
                <AppAlarmBox alarmData={payload} tittle={setting} key={i} />
              );
            })}
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Poppins-SemiBold",
              fontSize: 17,
            }}
          >
            Jam Sarapan
          </Text>

          <Text
            style={{
              textAlign: "center",
              fontFamily: "Poppins-SemiBold",
              fontSize: 17,
            }}
          >
            Jam Makan Siang
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Poppins-SemiBold",
              fontSize: 17,
            }}
          >
            Jam Makan Malam
          </Text>
          <AppButton
            BtnStyle={{
              backgroundColor: "#E6E7FF",
              paddingHorizontal: 20,
              marginTop: 20,
              paddingVertical: 10,
            }}
            fontStyle={{ paddingVertical: 5, fontSize: 18 }}
            name="Simpan"
          />
        </View>
      </AppScrollView>
    </GradientLayout>
  );
}
