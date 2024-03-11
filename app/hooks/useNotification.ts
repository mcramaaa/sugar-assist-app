import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { useRef } from "react";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
const useNotification = () => {
  /**
   * Ref
   */
  const notificationListener = useRef<any | null>(null);
  const responseListener = useRef<any | null>(null);

  /**
   * Notification Start
   */
  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "5e97bb4e-8f78-4f79-9601-d88e3c691ab3",
        })
      ).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  async function initNotification(data: any) {
    await Notifications.scheduleNotificationAsync({
      identifier: `${data.identifier}`,
      content: {
        title: `${data.title}`,
        body: `${data.body}`,
        data: { screen: "default" },
      },
      trigger: {
        hour: data.hour,
        minute: data.minute,
        repeats: true,
      },
    });
  }
  //   registerForPushNotificationsAsync().then((token) => console.log(token));
  notificationListener.current = Notifications.addNotificationReceivedListener(
    (notification) => {
      console.log(notification);
    }
  );

  responseListener.current =
    Notifications.addNotificationResponseReceivedListener((response) => {});

  const subscription = Notifications.addNotificationResponseReceivedListener(
    (response) => {
      if (response.notification.request.content.data.screen === "default") {
        console.log("Astagfirullah");
      }
    }
  );

  return {
    registerForPushNotificationsAsync,
    initNotification,
    subscription,
    responseListener,
    notificationListener,
  };
};

export default useNotification;
