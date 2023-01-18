import Discover from "../pages/Discover";

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

export const routes: Routing = [{ id: "/", path: "/", element: Discover }];

export const links = [
  { name: "Discover", to: "/", icon: HiOutlineHome },
  { name: "Around You", to: "/around-you", icon: HiOutlinePhotograph },
  { name: "Top Artists", to: "/top-artists", icon: HiOutlineUserGroup },
  { name: "Top Charts", to: "/top-charts", icon: HiOutlineHashtag },
];
