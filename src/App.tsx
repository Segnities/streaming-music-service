import { useEffect, useState } from "react";

import { BrowserRouter } from "react-router-dom";

import { AuthContext } from "./context";

import AppRouter from "./components/AppRouter";

import { onAuthStateChanged, User, getAuth } from "firebase/auth";
import { firebaseApp } from "./firebase/firebaseConfig";


function App() {

  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const auth = getAuth(firebaseApp);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        localStorage.clear();
      }
    })
  }, [])

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, isLoading, user, setUser }}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
