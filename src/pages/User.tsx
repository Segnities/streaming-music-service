import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { Form, Formik, Field } from "formik";

import { AuthContext, AuthType } from "../context";

import { signOut, getAuth } from "firebase/auth"
import { DocumentData } from "firebase/firestore";
import { firebaseApp } from "../firebase/firebaseConfig";

import { getUser } from "../utils/getUser";

import * as Yup from "yup";

import { AiOutlinePoweroff } from "react-icons/ai";

import NoImage from "../assets/no_artist.jpg";

const validationSchema = Yup.object().shape({
    bio: Yup.string()
});
interface UserDocList {
    id: string;
    data: DocumentData;
}

function User() {
    const authContext: AuthType | null = useContext(AuthContext);
    const navigate = useNavigate();
    const auth = getAuth(firebaseApp);
    const [firebaseUser, setFirebaseUser] = useState<UserDocList | undefined | null>(null);

    const userSignOut = () => {
        signOut(auth);
        authContext?.setUser(null);
        navigate("/");
    }

    useEffect(() => {
        getUser(authContext?.user?.email).then((res) => {
            setFirebaseUser(res);
        });
    }, [])

    return (
        <div className="flex flex-col">
            <div className="relative w-full flex flex-col">
                <div className="w-full h-28 bg-gradient-to-l from-transparent to-black sm:h-52"></div>
                <div className="absolute inset-0 flex flex-row items-center">
                    <img
                        src={NoImage}
                        alt="art"
                        className="w-28 sm:w-48 h-28 sm:h-48 rounded-full object-cover border-2 shadow-xl shadow-black cursor-pointer"
                        onDragStart={(e) => e.preventDefault()}
                    />

                    <div className="ml-5 mb-3">
                        <p className="text-3xl sm:text-base md:text-2xl text-white mb-2">
                            {authContext?.user?.displayName ?? authContext?.user?.email}
                        </p>
                    </div>
                </div>
                <div className="w-full h-24 sm:h-24" />
            </div>
            <div className="mt-8 w-full text-2xl">
                {firebaseUser?.data?.bio && <p>{firebaseUser?.data?.bio}</p>}
                {!firebaseUser?.data?.bio && (
                    <div>
                        <h3 className="text-2xl text-white font-semibold mb-10">Add your bio:</h3>
                        <Formik
                            initialValues={{ bio: "" }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                alert(values);
                            }}
                        >
                            {
                                ({ errors, touched, values }) => (
                                    <Form autoComplete="off">
                                        <Field
                                            as="textarea"
                                            name="bio"
                                            className="w-full h-96 
                                            text-white
                                            placeholder:italic placeholder:text-slate-400 block bg-transparent border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-gray-500 focus:ring-sky-500 focus:ring-1 sm:text-sm lg:text-2xl"

                                        />
                                    </Form>
                                )
                            }
                        </Formik>
                    </div>
                )
                }

            </div>
            <div className="flex justify-end mt-12">
                <button className="flex items-center bg-transparent hover:border-gray-400 cursor-pointer rounded-xl text-white hover:text-gray-400 border-2 px-4 py-3 z-10" onClick={userSignOut}>Logout <AiOutlinePoweroff className="mx-1" size={18} />
                </button>
            </div>
        </div>
    )
}

export default User;