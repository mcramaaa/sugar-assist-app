/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-curly-brace-presence */
import React from "react";
import HomeHead from "../components/Home/HomeHead";
import GradientLayout from "../components/Layout/GradientLayout";
import AppScrollView from "../components/AppScrollView";
import { Text, View } from "react-native";
import AnalogClock from "../components/AnalogClock";
import moment from "moment";
import "moment/locale/id";
import TaskCard from "../components/Home/TaskCard";

export default function Home() {
  const gradientProps = {
    startColor: "#E6E7FF",
    endColor: "white",
  };
  const days = moment().format("dddd");
  const date = moment().format("DD MMMM");
  const year = moment().format("YYYY");
  // useEffect(() => {}, []);

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
              nameTask="Waktunya Sarapan"
              hourTask="11:00 - 12:00"
            />
            <TaskCard
              is_active={false}
              nameTask="Waktunya Nyemil"
              hourTask="11:00 - 12:00"
            />
          </View>
        </AppScrollView>
        <HomeHead />
      </GradientLayout>
    </>
  );
}
