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
import * as SQLite from "expo-sqlite";
import { useEffect } from "react";

const Drawer = createDrawerNavigator();
export default function App() {
  const { user, setUser } = useUser();
  const [fontsLoaded] = useFonts({
    "LilitaOne-Regular": require("./assets/fonts/LilitaOne-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
  });

  const db = SQLite.openDatabase("sapi.db");

  function initDatabases() {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) NOT NULL, breakfast VARCHAR(100), lunch VARCHAR(100), dinner VARCHAR(100) );",
        [],
        () => console.log("Succes create Users Table"),
        (error) => {
          if (error) {
            console.error("Error creating table: ", error);
          }
          return false;
        }
      );
    });
  }

  useEffect(() => {
    initDatabases();
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
          initialRouteName="AppDrawer"
          // initialRouteName={`${user !== "" ? "AppTabs" : "newUser"}`}
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
            name="newUser"
            component={NewUser}
            options={{ headerShown: false, drawerItemStyle: { height: 0 } }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  );
}
