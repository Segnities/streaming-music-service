import { useEffect, useState } from "react";

import { BrowserRouter } from "react-router-dom";

import { AuthContext } from "./context";

import AppRouter from "./components/AppRouter";

import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import { firebaseApp } from "./firebase/firebaseConfig";

function App() {

  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const auth = getAuth(firebaseApp);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsAuth(true);
      } else {
        localStorage.clear();
        setIsAuth(false);
      }
    })
  }, []);


  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, user, setUser }}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
