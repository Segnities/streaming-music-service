import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import UserAuthFields from "../components/UserAuthFields";

import {
    getAuth,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";


import { firebaseApp, firebaseDatabase } from "../firebase/firebaseConfig";

import GoogleSignInBtn from "../components/GoogleSignInBtn";

import { getUsers } from "../utils/getUsers";

function SignUp() {
    const auth = getAuth(firebaseApp);
    const collectionRef = collection(firebaseDatabase, "users");
    const navigate = useNavigate();

    const [isFieldUnique, setIsFieldUnique] = useState({
        email: true,
        username: true
    });

    const handleSignUpWithEmailAndPassword = async ({ email, password, username, day, mounth, year, gender }) => {
        const users = await getUsers();
        const isEmailUnique: boolean = users.filter(usr => usr.data.email === email).length > 1 ? false : true;
        const isUsernameUnique: boolean = users.filter(usr => usr.data.username === username).length > 1 ? false : true;

        setIsFieldUnique({ ...isFieldUnique, email: isEmailUnique, username: isUsernameUnique })

        if (isEmailUnique && isUsernameUnique) {
            createUserWithEmailAndPassword(auth, email, password).then((userCredential) => userCredential).catch((error) => console.log(error));
            addDoc(collectionRef, {
                email, password, username, birthday: `${day} ${mounth} ${year}`, gender
            });
            navigate('/login');
        }
    }

    return (
        <div className="flex flex-1 flex-col items-center max-w-screen">
            <p className="font-bold text-2xl">To get started, sign up. It's free?!</p>
            <div className="flex flex-col flex-1 mt-2">
                <div className="flex flex-col flex-1 items-center">
                    <GoogleSignInBtn />
                </div>
                <div className="flex flex-row mt-5">
                    <hr role="presentation" className="flex-1 border-[1px] border-solid border-gray-300" />
                    <span className="flex-1 self-center text-center font-bold text-xs uppercase">OR</span>
                    <hr role="presentation" className="flex-1 border-[1px] border-solid border-gray-300" />
                </div>
                <div className="mt-2 mb-1">
                    <h2 className="text-xl font-bold text-center">Register via email</h2>
                </div>
                <div className="flex flex-col flex-1 mt-4 px-4 sm:px-0">
                    <UserAuthFields
                        onSubmitCallback={handleSignUpWithEmailAndPassword}
                        isFieldUnique={isFieldUnique}
                        disabledFields={
                            {
                                email: false,
                                password: false,
                                username: false,
                                birthday: false,
                                gender: false,
                            }
                        }
                    >
                        <div className="flex justify-center items-center my-8">
                            <button type="submit" className="bg-[#1ED760] w-2/6 text-2xl p-3 rounded-[32px] text-black font-medium hover:scale-x-110 hover:scale-y-105 hover:transition-transform">Sign Up</button>
                        </div>
                    </UserAuthFields>
                    <hr />
                    <div className="flex justify-center mt-1">
                        <p>Do you have an account?<NavLink to='/login'><span className="text-[#1ED760] underline-offset-2 underline ml-1">Login.</span></NavLink></p>
                    </div>
                    <div className="h-32" />
                </div>
            </div>
        </div>
    )
}

export default SignUp;