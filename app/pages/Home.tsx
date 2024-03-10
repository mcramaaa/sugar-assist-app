/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-curly-brace-presence */
import React, { useCallback, useState } from "react";
import HomeHead from "../components/Home/HomeHead";
import GradientLayout from "../components/Layout/GradientLayout";
import AppScrollView from "../components/AppScrollView";
import { Text, View } from "react-native";
import AnalogClock from "../components/AnalogClock";
import moment from "moment";
import "moment/locale/id";
import TaskCard from "../components/Home/TaskCard";
import { useFocusEffect } from "@react-navigation/native";
import { getUsers } from "../api/GET";
import { IUser, UserDefaultValue } from "../hooks/zustand";
import { SettingNameID } from "../enum/setting.enum";

export default function Home() {
  const [user, setUser] = useState<IUser>(UserDefaultValue);
  const [schedule, setSchedule] = useState<string>(SettingNameID.MAKAN_SIANG);

  const gradientProps = {
    startColor: "#E6E7FF",
    endColor: "white",
  };

  const days = moment().format("dddd");
  const date = moment().format("DD MMMM");
  const year = moment().format("YYYY");
  // useEffect(() => {}, []);

  useFocusEffect(
    useCallback(() => {
      getUsers()
        .then((res: any) => {
          const user: IUser = res[0];
          if (user) {
            setUser(user);
            const now = new Date(new Date().getTime() + 7 * 60 * 60 * 1000);

            const breakfastHour = +user.breakfast.split(":")[0];
            const breakfastMinute = +user.breakfast.split(":")[1];
            const lunchHour = +user.lunch.split(":")[0];
            const lunchMinute = +user.lunch.split(":")[1];

            const breakfastTimeUtcPlus7 = new Date(now);
            breakfastTimeUtcPlus7.setUTCHours(breakfastHour + 7);
            breakfastTimeUtcPlus7.setUTCMinutes(breakfastMinute);

            const lunchTimeUtcPlus7 = new Date(now);
            lunchTimeUtcPlus7.setUTCHours(lunchHour + 7);
            lunchTimeUtcPlus7.setUTCMinutes(lunchMinute);

            const nextDayStartTimeUtcPlus7 = new Date(now);
            nextDayStartTimeUtcPlus7.setDate(
              nextDayStartTimeUtcPlus7.getUTCDate()
            );
            nextDayStartTimeUtcPlus7.setUTCHours(6);
            nextDayStartTimeUtcPlus7.setUTCMinutes(59);

            const currentDate = new Date();
            const timeZoneOffset = 7 * 60 * 60 * 1000; // UTC+7 offset in milliseconds
            const nowTime = new Date(
              currentDate.getTime() - 4 * 60 * 60 * 1000 - timeZoneOffset
            );

            console.log(nowTime);
            const str = new Date().toLocaleString("en-US", {
              timeZone: "Asia/Jakarta",
            });
            console.log(str);
            console.log(new Date());

            if (
              nowTime <= breakfastTimeUtcPlus7 &&
              nowTime > nextDayStartTimeUtcPlus7
            ) {
              setSchedule(SettingNameID.SARAPAN);
            }

            if (
              nowTime <= lunchTimeUtcPlus7 &&
              nowTime > breakfastTimeUtcPlus7
            ) {
              setSchedule(SettingNameID.MAKAN_SIANG);
            }

            if (
              nowTime > lunchTimeUtcPlus7 &&
              nowTime < nextDayStartTimeUtcPlus7
            ) {
              setSchedule(SettingNameID.MAKAN_MALAM);
            }
          }
        })
        .catch((err) => console.log(err));
    }, [])
  );

  return (
    <>
      <GradientLayout gradientProps={gradientProps}>
        <HomeHead />
        <AppScrollView style={{ marginTop: 20 }} backcolor="white">
          <Text
            style={{
              marginTop: 15,
              color: "black",
              fontFamily: "Poppins-SemiBold",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            {days}
          </Text>
          <Text
            style={{
              color: "black",
              fontFamily: "Poppins-Regular",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            {date} ,{year}
          </Text>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "yellow",
            }}
          >
            <AnalogClock
              hourHandWidth={2}
              hourHandLength={55}
              hourHandColor="#767676"
              minuteHandWidth={2}
              minuteHandLength={75}
              minuteHandColor="#42459E"
              secondHandWidth={0.2}
              secondHandLength={90}
              clockBorderWidth={0}
            />
          </View>
          <Text></Text>
          <View style={{ gap: 10, flexDirection: "column" }}>
            <TaskCard
              is_active={true}
              nameTask={`Waktu ${schedule}`}
              // hourTask="11:00 - 12:00"
              hourTask={`${user.breakfast} - ${+user.breakfast.split(":")[0] + +1}:${user.breakfast.split(":")[1]}`}
            />
            {schedule === SettingNameID.SARAPAN && (
              <TaskCard
                is_active={false}
                nameTask="Waktu Nyemil"
                hourTask={`${+user.breakfast.split(":")[0] + +2}:${user.breakfast.split(":")[1]} - ${+user.breakfast.split(":")[0] + +3}:${user.breakfast.split(":")[1]}`}
              />
            )}
            {schedule === SettingNameID.MAKAN_SIANG && (
              <>
                <TaskCard
                  is_active={false}
                  nameTask="Waktu Minum"
                  hourTask={`${+user.breakfast.split(":")[0] + +2}:${user.breakfast.split(":")[1]} - ${+user.breakfast.split(":")[0] + +3}:${user.breakfast.split(":")[1]}`}
                />
                <TaskCard
                  is_active={false}
                  nameTask="Waktunya Nyemil"
                  hourTask={`${+user.breakfast.split(":")[0] + +4}:${user.breakfast.split(":")[1]} - ${+user.breakfast.split(":")[0] + +5}:${user.breakfast.split(":")[1]}`}
                />
              </>
            )}
          </View>
        </AppScrollView>
        <HomeHead />
      </GradientLayout>
    </>
  );
}
