import Discover from "../pages/Discover";
import Artist from "../pages/Artist";
import AroundYou from "../pages/AroundYou";
import Song from "../pages/Song";
import TopArtists from "../pages/TopArtists";
import TopSongs from "../pages/TopSongs";

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

export const routes: Routing = [
  { id: "/", path: "/", element: Discover },
  { id: "/top-artists", path: "/top-artists", element: TopArtists },
  { id: "/top-songs", path: "/top-songs", element: TopSongs },
  { id: "/around-you", path: "/around-you", element: AroundYou },
  { id: "/artists/:id", path: "/artists/:id", element: Artist },
  { id: "/songs/:songid", path: "/songs/:songid", element: Song },
];

export const links = [
  { name: "Discover", to: "/", icon: HiOutlineHome },
  { name: "Around You", to: "/around-you", icon: HiOutlinePhotograph },
  { name: "Top Artists", to: "/top-artists", icon: HiOutlineUserGroup },
  { name: "Top Charts", to: "/top-charts", icon: HiOutlineHashtag },
];
