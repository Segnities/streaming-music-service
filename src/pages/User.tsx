import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context";

import { signOut, getAuth, onAuthStateChanged } from "firebase/auth"
import { firebaseApp } from "../firebase/firebaseConfig";

import NoImage from "../assets/no_artist.jpg";


function User() {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const auth = getAuth(firebaseApp);

    const userSignOut = () => {
        signOut(auth);
        setUser(null);
        navigate("/");
    }

    return <div className="relative w-full flex flex-col">
        <div className="w-full h-28 bg-gradient-to-l from-transparent to-black sm:h-52"></div>
        <div className="absolute inset-0 flex flex-row items-center">
            <img
                src={NoImage}
                alt="art"
                className="w-28 sm:w-48 h-28 sm:h-48 rounded-full object-cover border-2 shadow-xl shadow-black"
                onDragStart={(e) => e.preventDefault()}
            />
            <div className="ml-5 mb-3">
                <p className="text-3xl sm:text-2xl text-white mb-2">
                    {user?.providerData?.displayName ?? user?.email}
                </p>

            </div>
        </div>
        <div className="w-full h-24 sm:h-24"></div>
        {user?.bio && (
            <div className="mt-8 w-full text-2xl">
                <h3 className="text-gray-100 my-3">Bio</h3>
                <p
                    className="text-base text-gray-500"
                >
                </p>
            </div>
        )
        }
        <div className="flex justify-end">
            <button className="bg-transparent hover:border-gray-400 cursor-pointer rounded-xl text-white hover:text-gray-400  border-2 px-4 py-3 z-10" onClick={userSignOut}>Logout</button>
        </div>
    </div>

}

export default User;