import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import Setting from "../pages/Setting";
import Home from "../pages/Home";
import About from "../pages/About";

export const APP_TABS = [
  {
    id: "Setting",
    component: Setting,
    icon: (
      <MaterialCommunityIcons name="tooth-outline" size={30} color="black" />
    ),
  },
  {
    id: "Home",
    component: Home,
    icon: <AntDesign name="home" size={30} color="black" />,
  },
  {
    id: "About",
    component: About,
    icon: (
      <MaterialCommunityIcons
        name="feature-search-outline"
        size={27}
        color="black"
      />
    ),
  },
];
