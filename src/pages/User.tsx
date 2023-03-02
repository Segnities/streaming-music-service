import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { Form, Formik, Field } from "formik";

import { AuthContext, AuthType } from "../context";

import { signOut, getAuth } from "firebase/auth"
import { doc, updateDoc } from "firebase/firestore";
import { firebaseApp, firebaseDatabase } from "../firebase/firebaseConfig";

import { getUser } from "../utils/getUser";

import * as Yup from "yup";

import { AiOutlinePoweroff } from "react-icons/ai";
import { UserDoc } from "../utils/@types";

import NoImage from "../assets/no_artist.jpg";

const validationSchema = Yup.object().shape({
    bio: Yup.string().min(200),
    birthday: Yup.string(),

});


function User() {
    const authContext: AuthType | null = useContext(AuthContext);
    const navigate = useNavigate();
    const auth = getAuth(firebaseApp);
    const [firebaseUser, setFirebaseUser] = useState<UserDoc | undefined | null>(null);

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
        });
    }, []);

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
                        <p className="text-3xl sm:text-base md:text-2xl text-white mb-2">
                            {authContext?.user?.displayName ?? firebaseUser?.data?.username}
                        </p>
                    </div>
                </div>
                <div className="w-full h-24 sm:h-24" />
            </div>
            <div className="mt-3 w-full">
                {
                    firebaseUser?.data?.birthday && (<p className="text-white text-base my-3"><span className="text-bold text-2xl">Birthday:</span> {firebaseUser?.data?.birthday}</p>)
                }
                {
                    firebaseUser?.data?.gender && (<p className="text-white text-base my-3"><span className="text-bold text-2xl">Gender:</span> {firebaseUser?.data?.gender}</p>)
                }
                {
                    firebaseUser?.data?.email && (<p className="text-white text-base my-3"><span className="text-bold text-2xl">Email:</span> {firebaseUser?.data?.email}</p>)
                }

            </div>
            <div className="mt-5 w-full text-2xl">
                {firebaseUser?.data?.bio && <div className="flex flex-col">
                    <p className="text-2xl text-white">Bio</p>
                    <p className="text-base text-white mt-5">{firebaseUser?.data?.bio}</p>
                </div>}
                {!firebaseUser?.data?.bio && (
                    <div className="flex flex-col">
                        <h3 className="text-2xl text-white font-semibold mb-10">Add your bio:</h3>
                        <Formik
                            initialValues={{ bio: "" }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                handleBioSubmit(values.bio);
                                values.bio = "";
                            }}
                        >
                            {
                                ({ errors, touched, values }) => (
                                    <Form className="flex flex-col">
                                        <Field
                                            as="textarea"
                                            id="bio"
                                            name="bio"
                                            className="w-full h-96 
                                            text-white
                                            placeholder:italic placeholder:text-slate-400 block bg-transparent border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-gray-500 focus:ring-sky-500 focus:ring-1 sm:text-sm lg:text-2xl"

                                        />
                                        {errors.bio && touched.bio ? <label className="text-red-700 text-sm mt-2" htmlFor="bio">Length of bio must be more than 200 words {values.bio.length}/200</label> : null}
                                        <button type="submit" className="self-start px-6 py-2 my-5 bg-white text-black rounded-md">Add bio</button>
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

