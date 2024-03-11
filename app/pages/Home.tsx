/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-curly-brace-presence */
import React, { useCallback, useState } from "react";
import HomeHead from "../components/Home/HomeHead";
import GradientLayout from "../components/Layout/GradientLayout";
import AppScrollView from "../components/AppScrollView";
import { Text, View } from "react-native";
import AnalogClock from "../components/AnalogClock";
import "moment/locale/id";
import TaskCard from "../components/Home/TaskCard";
import { useFocusEffect } from "@react-navigation/native";
import { getUsers } from "../api/GET";
import { IUser } from "../hooks/zustand";
import { SettingNameID } from "../enum/setting.enum";
import { appDayjs } from "../ constants/dayjs.constant";

export default function Home() {
  /**
   * HOOK
   */

  /**
   * STATE
   */
  const [schedule, setSchedule] = useState<string>(SettingNameID.MAKAN_SIANG);
  const [hourTask, setHourTask] = useState<string>("");

  useFocusEffect(
    useCallback(() => {
      getUsers()
        .then((response: any) => {
          const user: IUser = response[0];
          if (user) {
            console.log("home user", user);
            const now = new Date();

            const breakfastHour = +user.breakfast.split(":")[0] + 3;
            const breakfastMinute = +user.breakfast.split(":")[1];
            const lunchHour = +user.lunch.split(":")[0] + 5;
            const lunchMinute = +user.lunch.split(":")[1];
            const dinnerHour = +user.dinner.split(":")[0] + 1;
            const dinnerMinute = +user.dinner.split(":")[1];

            const breakfastEnd = new Date(now);
            breakfastEnd.setHours(breakfastHour);
            breakfastEnd.setMinutes(breakfastMinute);

            const lunchEnd = new Date(now);
            lunchEnd.setHours(lunchHour);
            lunchEnd.setMinutes(lunchMinute);

            const dinnerEnd = new Date(now);
            dinnerEnd.setHours(dinnerHour);
            dinnerEnd.setMinutes(dinnerMinute);

            const dinnerStartClock = +user.dinner.split(":")[0];
            const dinnerStart = new Date(now);
            dinnerStart.setHours(dinnerStartClock);
            dinnerStart.setMinutes(dinnerMinute);

            const nowTime = new Date();

            if (nowTime.getTime() <= breakfastEnd.getTime()) {
              console.log("breakfast", true);
              setHourTask(user.breakfast);
              setSchedule(SettingNameID.SARAPAN);
            }
            if (
              nowTime.getTime() <= lunchEnd.getTime() &&
              nowTime.getTime() > breakfastEnd.getTime()
            ) {
              console.log("lunch", true);
              setHourTask(user.lunch);
              setSchedule(SettingNameID.MAKAN_SIANG);
            }

            if (
              nowTime.getTime() > lunchEnd.getTime() &&
              nowTime.getTime() <= dinnerEnd.getTime()
            ) {
              console.log("dinner", true);
              setHourTask(user.dinner);
              setSchedule(SettingNameID.MAKAN_MALAM);
            }
          }
        })
        .catch((err) => console.log(err));

      // return () => {
      //   Notifications.removeNotificationSubscription(
      //     notificationListener.current
      //   );
      //   Notifications.removeNotificationSubscription(responseListener.current);
      //   subscription.remove();
      // };
    }, [])
  );

  const gradientProps = {
    startColor: "#E6E7FF",
    endColor: "white",
  };

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
            {appDayjs.days}
          </Text>
          <Text
            style={{
              color: "black",
              fontFamily: "Poppins-Regular",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            {appDayjs.date} ,{appDayjs.year}
          </Text>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
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
              hourTask={`${hourTask} - ${+hourTask.split(":")[0] + +1}:${hourTask.split(":")[1]}`}
            />
            {schedule === SettingNameID.SARAPAN && (
              <TaskCard
                is_active={false}
                nameTask="Waktu Nyemil"
                hourTask={`${+hourTask.split(":")[0] + +2}:${hourTask.split(":")[1]} - ${+hourTask.split(":")[0] + +3}:${hourTask.split(":")[1]}`}
              />
            )}
            {schedule === SettingNameID.MAKAN_SIANG && (
              <>
                <TaskCard
                  is_active={false}
                  nameTask="Waktu Minum"
                  hourTask={`${+hourTask.split(":")[0] + +2}:${hourTask.split(":")[1]} - ${+hourTask.split(":")[0] + +3}:${hourTask.split(":")[1]}`}
                />
                <TaskCard
                  is_active={false}
                  nameTask="Waktunya Nyemil"
                  hourTask={`${+hourTask.split(":")[0] + +4}:${hourTask.split(":")[1]} - ${+hourTask.split(":")[0] + +5}:${hourTask.split(":")[1]}`}
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
