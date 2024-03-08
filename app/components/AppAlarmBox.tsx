import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as SQLite from "expo-sqlite";
import { ltrimFirstZero } from "../helpers/ltrimZero";

type TProps = {
  tittle: string;
  alarmData: any;
  notifications: any;
  initNotification: any;
};

export default function AppAlarmBox(props: TProps) {
  const { tittle, alarmData, notifications, initNotification } = props;

  const db = SQLite.openDatabase("gimul.db");

  const [date, setDate] = useState(new Date(setDefaultAlarm()));
  const [show, setShow] = useState(false);

  function editAlarm(payload: any) {
    return new Promise((resolve: any, reject: any) => {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE alarms SET tag = ?, hours = ?, minute = ? WHERE id = ?",
          [payload.tag, payload.hours, payload.minute, payload.id],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              notifications.cancelScheduledNotificationAsync(
                `${alarmData.tag}`
              );
              initNotification({
                title: `${payload.tag}`,
                body: `Alarm ${payload.tag}`,
                hour: Number(ltrimFirstZero(`${payload.hours}`)),
                minute: Number(ltrimFirstZero(`${payload.minute}`)),
                identifier: `${payload.tag}`,
              });
              resolve();
            } else {
              reject(new Error("User not found"));
            }
          },
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  function onChange(event: any, selectedDate: any) {
    const currentDate = selectedDate;
    const timeToStore = new Intl.DateTimeFormat("id-ID", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    })
      .format(currentDate)
      .split(".");

    editAlarm(
      Object.assign({
        id: alarmData.id,
        tag: alarmData.tag,
        hours: timeToStore[0],
        minute: timeToStore[1],
      })
    );

    setShow(false);
    setDate(currentDate);
  }

  function showMode() {
    setShow(true);
  }

  function showTimepicker() {
    showMode();
  }

  function setDefaultAlarm() {
    const now = new Date();

    const dateWithTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      alarmData.hours,
      alarmData.minute
    );

    return dateWithTime;
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
