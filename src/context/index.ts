import { createContext } from "react";

type AuthType = {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthType | null>(null);
