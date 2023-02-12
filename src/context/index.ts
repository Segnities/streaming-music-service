import React, { createContext } from "react";

import { User } from "firebase/auth";

type AuthType = {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  user: User | {};
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const AuthContext = createContext<AuthType | null>(null);
