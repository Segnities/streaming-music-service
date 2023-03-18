import {useEffect, useState} from "react";

import {BrowserRouter} from "react-router-dom";

import {AuthContext} from "./context";

import AppRouter from "./components/AppRouter";

import {onAuthStateChanged, getAuth, User} from "firebase/auth";
import {firebaseApp} from "./firebase/firebaseConfig";
import Loader from "./components/UI/Loader";
import {getUsers} from "./utils/getUsers";
import {useDispatch} from "react-redux";

import {setFirebaseUsers} from "./store/reducers/firebaseUsers";

function App() {
    const dispatch = useDispatch();
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const auth = getAuth(firebaseApp);

    useEffect( () => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                setIsAuth(true);
                dispatch(setFirebaseUsers(await getUsers()))
                setIsLoading(false);
            } else {
                setIsAuth(false);
                setIsLoading(false);
            }
        })
    }, []);

    if (isLoading) {
        return <div className="w-full h-screen flex flex-1 flex-col bg-gradient-to-br from-black to-[#121286]">
            <Loader/>
        </div>
    }


    return (
        <AuthContext.Provider value={{isAuth, setIsAuth, user, setUser}}>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
