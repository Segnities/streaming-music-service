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
import ForgotPassword from "../pages/ForgotPassword";
import CreatePlaylist from "../pages/CreatePlaylist";
import MyLibrary from "../pages/MyLibrary";

import {
  HiOutlineHome,
  HiOutlinePhotograph,
  HiOutlineUserGroup,
  HiOutlineHashtag,
  HiUser,
  HiUserAdd,
} from "react-icons/hi";


import { BiAddToQueue, BiLibrary } from "react-icons/bi";
import MyPlaylist from "../pages/MyPlaylist";

type Routing = {
  id: string | number;
  path: string;
  element: () => JSX.Element;
}[];

export const publicRoutes: Routing = [
  { id: "/", path: "/", element: Discover },
  { id: "/top-charts", path: "/top-charts", element: TopCharts },
  { id: "/top-artists", path: "/top-artists", element: TopArtists },
  { id: "/around-you", path: "/around-you", element: AroundYou },
  { id: "/artists/:id", path: "/artists/:id", element: Artist },
  { id: "/songs/:songid", path: "/songs/:songid", element: Song },
  { id: "/search/:query", path: "/search/:query", element: Search },
  { id: "*", path: "*", element: NotFound },
];

export const privateRoutes: Routing = [
  { id: "/", path: "/", element: Discover },
  { id: "/user", path: "/user", element: User },
  { id: "/top-charts", path: "/top-charts", element: TopCharts },
  { id: "/top-artists", path: "/top-artists", element: TopArtists },
  { id: "/around-you", path: "/around-you", element: AroundYou },
  { id: "/artists/:id", path: "/artists/:id", element: Artist },
  { id: "/songs/:songid", path: "/songs/:songid", element: Song },
  { id: "/search/:query", path: "/search/:query", element: Search },
  { id: "/create-playlist", path: "/create-playlist", element: CreatePlaylist },
  { id: "/my-library", path: "/my-library", element: MyLibrary },
  { id: "/my-playlist/:playlist_id", path: "/my-playlist/:playlist_id", element: MyPlaylist },
  { id: "*", path: "*", element: NotFound },
];

export const authenticationRoutes: Routing = [
  { id: "/login", path: "/login", element: Login },
  { id: "/sign-up", path: "/sign-up", element: SignUp },
  {
    id: "/forgot-password",
    path: "/forgot-password",
    element: ForgotPassword,
  },
];

export const publicLinks = [
  { name: "Discover", to: "/", icon: HiOutlineHome },
  { name: "Around You", to: "/around-you", icon: HiOutlinePhotograph },
  { name: "Top Artists", to: "/top-artists", icon: HiOutlineUserGroup },
  { name: "Top Charts", to: "/top-charts", icon: HiOutlineHashtag },
  { name: "Auth", to: "/login", icon: HiUserAdd },
];

export const privateLinks = [
  { name: "Discover", to: "/", icon: HiOutlineHome },
  { name: "Around You", to: "/around-you", icon: HiOutlinePhotograph },
  { name: "Top Artists", to: "/top-artists", icon: HiOutlineUserGroup },
  { name: "Top Charts", to: "/top-charts", icon: HiOutlineHashtag },
  { name: "User", to: "/user", icon: HiUser },
  { name: "My Library", to: "/my-library", icon: BiLibrary },
  { name: "Create Playlist", to: "/create-playlist", icon: BiAddToQueue }
];
