import { useEffect, useState } from "react";

import { BrowserRouter } from "react-router-dom";

import AppRouter from "./components/AppRouter";

import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import { firebaseApp } from "./firebase/firebaseConfig";
import Loader from "./components/UI/Loader";
import { getUsers } from "./utils/getUsers";
import { useDispatch } from "react-redux";

import { setFirebaseUsers } from "./store/reducers/firebaseUsers";

import { setUserSignUp, changeIsAuth } from "./store/reducers/auth";

function App() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const auth = getAuth(firebaseApp);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                dispatch(setUserSignUp({ user: await JSON.stringify(user) }))
                dispatch(setFirebaseUsers(await getUsers()))
                setIsLoading(false);
            } else {
                dispatch(changeIsAuth(false));
                setIsLoading(false);
            }
        })
    }, []);

    if (isLoading) {
        return <div className="w-full h-screen flex flex-1 flex-col bg-gradient-to-br from-black to-[#121286]" data-testid='app-loader'>
            <Loader />
        </div>
    }

    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
}

export default App;
