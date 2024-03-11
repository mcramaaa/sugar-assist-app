import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SettingNameEN, SettingNameID } from "../enum/setting.enum";
import { IUser } from "../hooks/zustand";
import { editUserSchedule } from "../api/PATCH";

type TProps = {
  tittle: string;
  alarmData?: IUser;
  notifications?: any;
  initNotification?: any;
  handlePayload?: (name: string, selectedDate: string[]) => void;
};

export default function AppAlarmBox(props: TProps) {
  const { tittle, alarmData, notifications, initNotification, handlePayload } =
    props;

  const [date, setDate] = useState(setDefaultAlarm());
  const [show, setShow] = useState(false);

  function onChange(event: any, selectedDate: any) {
    const currentDate = selectedDate;
    const timeToStore = new Intl.DateTimeFormat("id-ID", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    })
      .format(currentDate)
      .split(".");

    setShow(false);
    let newTitle: string = "";
    switch (tittle) {
      case SettingNameID.SARAPAN:
        newTitle = SettingNameEN.SARAPAN;
        break;
      case SettingNameID.MAKAN_SIANG:
        newTitle = SettingNameEN.MAKAN_SIANG;
        break;
      case SettingNameID.MAKAN_MALAM:
        newTitle = SettingNameEN.MAKAN_MALAM;
        break;

      default:
        break;
    }
    if (!handlePayload && alarmData && alarmData.id && event.type === "set") {
      editUserSchedule(
        { id: alarmData.id, clock: timeToStore.join(":") },
        newTitle
      ).then((res: any) => {
        if (res.rowsAffected > 0) {
          const newDate = new Date();
          newDate.setHours(res.clock.split(":")[0]);
          newDate.setMinutes(res.clock.split(":")[1]);
          setDate(newDate);
        }
      });
    }
    if (handlePayload) {
      handlePayload(tittle, timeToStore);
      setDate(currentDate);
    }
  }

  function showMode() {
    setShow(true);
  }

  function showTimepicker() {
    showMode();
  }

  function setDefaultAlarm() {
    const now = new Date();
    let scheduleTime: string = "";

    if (alarmData && alarmData.breakfast) {
      if (tittle === SettingNameID.SARAPAN) scheduleTime = alarmData.breakfast;
      if (tittle === SettingNameID.MAKAN_SIANG) scheduleTime = alarmData.lunch;
      if (tittle === SettingNameID.MAKAN_MALAM) scheduleTime = alarmData.dinner;
      const dateWithTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        +scheduleTime.split(":")[0],
        +scheduleTime.split(":")[1]
      );

      return dateWithTime;
    } else {
      return new Date();
    }
  }

  return (
    <View
      style={{
        marginTop: 20,
        backgroundColor: "#FFF0F5",
        height: "auto",
        padding: 10,
        borderRadius: 15,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="time"
          is24Hour
          onChange={onChange}
          display="spinner"
          onTouchCancel={() => setShow(false)}
        />
      )}
      <View
        style={{
          justifyContent: "center",
          paddingVertical: 5,
          gap: 5,
        }}
      >
        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18 }}>
          {tittle}
        </Text>
        <Text
          style={{
            fontSize: 40,
            fontFamily: "Poppins-Bold",
            color: "#FBA1B7",
            marginBottom: -15,
            marginTop: -10,
          }}
        >
          {date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </Text>
        <View style={{ flexDirection: "row" }}></View>
      </View>
      <TouchableOpacity
        onPress={showTimepicker}
        style={{
          backgroundColor: "#FBA1B7",
          paddingHorizontal: 20,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins-SemiBold",
            fontSize: 25,
            color: "white",
          }}
        >
          Edit Jam
        </Text>
      </TouchableOpacity>
    </View>
  );
}
