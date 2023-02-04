import Discover from "../pages/Discover";
import Artist from "../pages/Artist";
import AroundYou from "../pages/AroundYou";
import Song from "../pages/Song";
import TopCharts from "../pages/TopCharts";
import TopArtists from "../pages/TopArtists";
import Search from "../pages/Search";
import NotFound from "../pages/NotFound";
import User from "../pages/User";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";

import {
  HiOutlineHome,
  HiOutlinePhotograph,
  HiOutlineUserGroup,
  HiOutlineHashtag,
} from "react-icons/hi";

type Routing = {
  id: string | number;
  path: string;
  element: () => JSX.Element;
}[];

export const publicRoutes: Routing = [
  { id: "/login", path: "/login", element: Login },
  { id: "/sign-up", path: "/sign-up", element: SignUp },
  { id: "/", path: "/", element: Discover },
  { id: "/top-charts", path: "/top-charts", element: TopCharts },
  { id: "/top-artists", path: "/top-artists", element: TopArtists },
  { id: "/around-you", path: "/around-you", element: AroundYou },
  { id: "*", path: "*", element: NotFound },
  { id: "/artists/:id", path: "/artists/:id", element: Artist },
  { id: "/songs/:songid", path: "/songs/:songid", element: Song },
  { id: "/search/:query", path: "/search/:query", element: Search },
];

export const privateRoutes: Routing = [
  { id: "/user", path: "/user", element: User },
];

export const links = [
  { name: "Discover", to: "/", icon: HiOutlineHome },
  { name: "Around You", to: "/around-you", icon: HiOutlinePhotograph },
  { name: "Top Artists", to: "/top-artists", icon: HiOutlineUserGroup },
  { name: "Top Charts", to: "/top-charts", icon: HiOutlineHashtag },
];
