import React, { createContext } from "react";

import { UserCredential, User } from "firebase/auth";

export type AuthType = {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const AuthContext = createContext<AuthType | null>(null);
