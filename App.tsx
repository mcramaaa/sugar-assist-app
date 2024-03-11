import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Profile from "./app/pages/Profile";
import NewUser from "./app/pages/NewUser";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AppDrawer from "./app/pages/AppDrawer";
import Home from "./app/pages/Home";
import Setting from "./app/pages/Setting";
import About from "./app/pages/About";
import { AntDesign } from "@expo/vector-icons";
import { useUser } from "./app/hooks/zustand";
import { useEffect } from "react";
import { initDatabases } from "./app/api/init";
import { getUsers } from "./app/api/GET";
import useNotification from "./app/hooks/useNotification";
import { SettingNameEN, SettingNameID } from "./app/enum/setting.enum";

const Drawer = createDrawerNavigator();

export default function App() {
  const { user, setUser } = useUser();
  const { initNotification, registerForPushNotificationsAsync } =
    useNotification();
  const [fontsLoaded] = useFonts({
    "LilitaOne-Regular": require("./assets/fonts/Madimi-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => console.log(token));
    getUsers()
      .then((userRows: any) => {
        if (userRows.length > 0) {
          const user = userRows[0];
          setUser({
            name: userRows[0].name,
            breakfast: userRows[0].breakfast,
            lunch: userRows[0].lunch,
            dinner: userRows[0].dinner,
          });

          /**
           * NOtification Set
           */

          initNotification({
            title: `${SettingNameID.SARAPAN} Notification`,
            body: `Saat ini adalah waktunya ${SettingNameID.SARAPAN}`,
            hour: user.breakfast.split(":")[0],
            minute: user.breakfast.split(":")[1],
            identifier: SettingNameEN.SARAPAN,
          });
          initNotification({
            title: `${SettingNameID.MAKAN_SIANG} Notification`,
            body: `Saat ini adalah waktunya ${SettingNameID.MAKAN_SIANG}`,
            hour: user.lunch.split(":")[0],
            minute: user.lunch.split(":")[1],
            identifier: SettingNameEN.MAKAN_SIANG,
          });
          initNotification({
            title: `${SettingNameID.MAKAN_MALAM} Notification`,
            body: `Saat ini adalah waktunya ${SettingNameID.MAKAN_MALAM}`,
            hour: user.dinner.split(":")[0],
            minute: user.dinner.split(":")[1],
            identifier: SettingNameEN.MAKAN_MALAM,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
    initDatabases();

    //  return () => {
    //     Notifications.removeNotificationSubscription(
    //       notificationListener.current
    //     );
    //     Notifications.removeNotificationSubscription(responseListener.current);
    //     subscription.remove();
    //   };
  }, []);

  if (!fontsLoaded) return null;
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <AppDrawer {...props} />}
          screenOptions={{
            drawerActiveBackgroundColor: "#E6E7FF",
            drawerActiveTintColor: "#42459E",
            headerTintColor: "black",
          }}
          // initialRouteName="Setting"
          initialRouteName={`${user.name && user.lunch ? "AppDrawer" : user.name && !user.lunch ? "Setting" : "NewUser"}`}
        >
          <Drawer.Screen
            name="Home"
            component={Home}
            options={{
              drawerIcon: ({ color }) => (
                <AntDesign name="home" size={24} color={color} />
              ),
              headerShown: false,
              drawerActiveBackgroundColor: "#E6E7FF",
            }}
          />
          <Drawer.Screen
            name="Setting"
            component={Setting}
            options={{
              drawerIcon: ({ color }) => (
                <AntDesign name="setting" size={24} color={color} />
              ),
              title: "Pengaturan",
              headerTitleStyle: { display: "none" },
              headerTitle: "",
              headerTransparent: true,
            }}
          />
          <Drawer.Screen
            name="About"
            component={About}
            options={{
              drawerIcon: ({ color }) => (
                <AntDesign name="customerservice" size={24} color={color} />
              ),
              drawerActiveBackgroundColor: "#E6E7FF",
              title: "Tentang Kami",
              headerTitleStyle: { display: "none" },
              headerTitle: "",
              headerTransparent: true,
            }}
          />
          <Drawer.Screen
            name="Profile"
            component={Profile}
            options={{
              drawerActiveBackgroundColor: "#E6E7FF",
              title: "Profile",
              headerTitleStyle: { display: "none" },
              headerTitle: "",
              headerTransparent: true,
              drawerItemStyle: { height: 0 },
            }}
          />
          <Drawer.Screen
            name="NewUser"
            component={NewUser}
            options={{ headerShown: false, drawerItemStyle: { height: 0 } }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  );
}
