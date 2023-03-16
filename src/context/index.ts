import React, { createContext } from "react";

import { User } from "firebase/auth";
import {DocumentData} from "firebase/firestore";

export type AuthType = {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const AuthContext = createContext<AuthType | null>(null);
