import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { AuthContext, AuthType } from "../context";

import { signOut, getAuth } from "firebase/auth"
import { doc, updateDoc } from "firebase/firestore";
import { firebaseApp, firebaseDatabase } from "../firebase/firebaseConfig";

import { getUser } from "../utils/getUser";

import { AiOutlinePoweroff } from "react-icons/ai";
import { UserDoc } from "../utils/@types";

import NoImage from "../assets/no_artist.jpg";
import Loader from "../components/UI/Loader";


function User() {
    const authContext: AuthType | null = useContext(AuthContext);
    const navigate = useNavigate();
    const auth = getAuth(firebaseApp);

    const [firebaseUser, setFirebaseUser] = useState<UserDoc | undefined | null>(null);

    const [isUserLoading, setIsUserLoading] = useState<boolean>(true);

    const userSignOut = () => {
        signOut(auth);
        authContext?.setUser(null);
        navigate("/");
    }

    const handleBioSubmit = async (bio: string) => {
        const id: string = firebaseUser!.id;
        const docRef = doc(firebaseDatabase, "users", id);
        await updateDoc(docRef, {
            bio
        });
        alert("Doc updated!")
    }

    useEffect(() => {
        getUser(authContext?.user?.email).then((res) => {
            setFirebaseUser(res);
        }).finally(() => setIsUserLoading(false));

    }, []);

    if (isUserLoading) {
        return <Loader />
    }


    return (
        <div className="flex flex-col">
            <div className="relative w-full flex flex-col">
                <div className="w-full h-28 bg-gradient-to-l from-transparent to-black sm:h-52"></div>
                <div className="absolute inset-0 flex flex-row items-center">
                    <img
                        src={authContext?.user?.photoURL ?? NoImage}
                        alt="art"
                        className="w-28 sm:w-48 h-28 sm:h-48 rounded-full object-cover border-2 shadow-xl shadow-black cursor-pointer"
                        onDragStart={(e) => e.preventDefault()}
                    />

                    <div className="ml-5 mb-3">
                        <p className="text-3xl sm:text-xl md:text-2xl text-white mb-2">
                            {authContext?.user?.displayName ?? firebaseUser?.data?.username}
                        </p>
                    </div>
                </div>
                <div className="w-full h-24 sm:h-24" />
            </div>
            <div className="mt-3 w-full">
                <div>
                    <p className="text-white text-2xl my-2">Email: <span className="text-white italic text-lg">{firebaseUser?.data?.email}</span></p>
                </div>
                {firebaseUser?.data.birthday && <div>
                    <p className="text-white text-2xl my-2">Birthday: <span className="text-white italic text-lg">{firebaseUser?.data?.birthday}</span></p>
                </div>}
                {firebaseUser?.data.gender && <div>
                    <p className="text-white text-2xl my-2">Gender: <span className="text-white italic text-lg">{firebaseUser?.data?.gender}</span></p>
                </div>}
                {
                    firebaseUser?.data.bio && <div>
                        <h4 className="text-white text-2xl my-2">Bio</h4>
                        <p>{firebaseUser?.data.bio}</p>
                    </div>
                }
            </div>
            <div className="flex justify-end mt-12">
                <button className="flex items-center bg-transparent hover:border-gray-400 cursor-pointer rounded-xl text-white hover:text-gray-400 border-2 px-4 py-3 z-10" onClick={userSignOut}>Logout <AiOutlinePoweroff className="mx-1" size={18} />
                </button>
            </div>
        </div >
    )
}

export default User;

