import React from "react";
import Discover from "../pages/Discover";

type Routing = {
  id: string | number;
  path: string;
  element: () => JSX.Element;
}[];

export const routes: Routing = [{ id: "/", path: "/", element: Discover }];
