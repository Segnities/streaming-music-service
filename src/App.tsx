import { useEffect, useState } from "react";

import { BrowserRouter } from "react-router-dom";

import { AuthContext } from "./context";

import AppRouter from "./components/AppRouter";
import { User } from "firebase/auth";


function App() {

  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | {}>({});

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, isLoading, user, setUser }}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
