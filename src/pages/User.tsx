import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { AuthContext, AuthType } from "../context";

import { Formik, Form, Field } from "formik";

import { signOut, getAuth } from "firebase/auth"
import { firebaseApp } from "../firebase/firebaseConfig";

import { findUserByEmail } from "../utils/findUserByEmail";

import { UserDoc } from "../utils/@types";

import NoImage from "../assets/no_artist.jpg";
import Loader from "../components/UI/Loader";
import Modal from "../components/UI/Modal";

import { userInfoValidationSchema } from "../validation";

function User() {
    const authContext: AuthType | null = useContext(AuthContext);
    const navigate = useNavigate();
    const auth = getAuth(firebaseApp);

    const [firebaseUser, setFirebaseUser] = useState<UserDoc | undefined | null>(null);
    const [isUserLoading, setIsUserLoading] = useState<boolean>(true);

    const [openModal, setOpenModal] = useState<boolean>(false);

    const userSignOut = () => {
        signOut(auth);
        authContext?.setUser(null);
        navigate("/");
    }

    useEffect(() => {
        findUserByEmail(authContext?.user?.email).then((res: UserDoc) => {
            setFirebaseUser(res);
        }).finally(() => setIsUserLoading(false));
    }, []);

    if (isUserLoading) {
        return <Loader />
    }

    return (
        <div className="flex flex-col w-full">
            <Modal open={openModal} setOpen={setOpenModal}>
                <Formik
                    initialValues={{
                        email: firebaseUser?.data.email,
                        username: firebaseUser?.data.username,
                        password: '',
                        confirmPassword: '',
                        day: firebaseUser?.data?.birthday?.split(" ")[0] ?? "",
                        mounth: firebaseUser?.data?.birthday?.split(" ")[1] ?? "",
                        year: firebaseUser?.data?.birthday?.split(" ")[2] ?? "",
                        gender: "I don't want to specify"
                    }}
                    validationSchema={userInfoValidationSchema}
                    onSubmit={() => console.log('Send it!')}
                >
                    {
                        ({ errors, touched, values }) => (
                            <Form autoComplete="off">
                                <div className="w-full flex flex-col">
                                    <div className="flex flex-col">
                                        <Field type="email" name="email" className="w-full text-base normal-case my-1 outline-none line tracking-normal p-3 border-[1px] focus-visible:border-[3px]" />
                                    </div>
                                    <div className="flex flex-col">
                                        <Field type="password" name="password" className="w-full text-base normal-case my-1 outline-none line tracking-normal p-3 border-[1px] focus-visible:border-[3px]" />
                                    </div>
                                    <div className="flex flex-col">
                                        <Field type="password" name="confirmPassword" className="w-full text-base normal-case my-1 outline-none line tracking-normal p-3 border-[1px] focus-visible:border-[3px]" />
                                    </div>
                                    <div className="flex flex-col">
                                        <Field type="text" name="username" className="w-full text-base normal-case my-1 outline-none line tracking-normal p-3 border-[1px] focus-visible:border-[3px]" />
                                    </div>
                                    <div className="flex flex-row items-center">
                                        <div className="flex flex-col justify-between w-1/6">
                                            <Field type="text" name="day" maxLength={2}
                                                minLength={2}
                                                placeholder="DD"
                                                className='p-2 outline-none border-[1px] hover:border-2' />
                                        </div>
                                        <div className="flex flex-col w-2/3 px-3">
                                            <Field
                                                as="select"
                                                name="mounth"
                                                className="text-base normal-case my-1 outline-none line tracking-normal p-3 border-[1px] focus-visible:border-[3px]">
                                                <option value="" disabled>Mounth</option>
                                                <option value="January">January</option>
                                                <option value="February">February</option>
                                                <option value="March">March</option>
                                                <option value="April">April</option>
                                                <option value="May">May</option>
                                                <option value="June">June</option>
                                                <option value="July">July</option>
                                                <option value="August">August</option>
                                                <option value="September">September</option>
                                                <option value="October">October</option>
                                                <option value="November">November</option>
                                                <option value="December">December</option>
                                            </Field>
                                        </div>
                                        <div className="flex flex-col w-1/5">
                                            <Field
                                                type="text"
                                                name="year"
                                                className="text-base normal-case my-1 outline-none line tracking-normal p-3 border-[1px] focus-visible:border-[3px]"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col my-4">
                                        <Field as="select" name="gender" className="w-full text-base normal-case my-1 outline-none line tracking-normal p-3 border-[1px] focus-visible:border-[3px]">
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Non-binary">Non-binary</option>
                                            <option value="Another">Another</option>
                                            <option value="I don't want to specify">I don't want to specify</option>
                                        </Field>
                                    </div>
                                    <div className="flex justify-end items-center my-8">
                                        <button type="submit" className="bg-[#1ED760] rounded-md w-2/6 text-2xl p-2 text-black font-medium">Edit</button>
                                    </div>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </Modal>
            <h1 className="text-2xl sm:text-3xl text-white font-semibold my-5">Account overview</h1>
            <article className="relative w-full flex flex-col">
                <h2 className="text-xl sm:text-2xl text-white font-medium my-4">Profile</h2>
                <div className="w-full h-28 bg-gradient-to-l from-transparent to-black sm:h-52"></div>
                <section className="absolute inset-0 flex flex-row items-center">
                    <img
                        src={authContext?.user?.photoURL ?? NoImage}
                        alt="art"
                        className="w-28 sm:w-48 h-28 sm:h-48 rounded-full object-cover border-2 shadow-xl shadow-black cursor-pointer"
                        onClick={() => setOpenModal(true)}
                        onDragStart={(e) => e.preventDefault()}
                        title="Click to edit profile"
                    />

                    <h3 className="text-3xl sm:text-xl md:text-2xl text-white mb-5 ml-5">
                        {authContext?.user?.displayName ?? firebaseUser?.data?.username}
                    </h3>
                </section>
                <div className="w-full h-24 sm:h-24" />
            </article>
            <div className="flex flex-col">
                <table className="w-full">
                    <colgroup>
                        <col className="w-1/2" />
                        <col className="w-1/2" />
                    </colgroup>
                    <tbody>
                        <tr className="border-b-2 border-[#dedede]">
                            <td className="py-5 text-gray-500 text-lg">Username</td>
                            <td className="py-5 text-white text-lg">{firebaseUser?.data?.username ?? authContext?.user?.displayName}</td>
                        </tr>
                        <tr className="border-b-2 border-[#dedede]">
                            <td className="py-5 text-gray-500 text-lg">Email</td>
                            <td className="py-5 text-white text-lg">{firebaseUser?.data?.email ?? authContext?.user?.email}</td>
                        </tr>
                        <tr className="border-b-2 border-[#dedede]">
                            <td className="py-5 text-gray-500 text-lg">Date of birth</td>
                            <td className="py-5 text-white text-lg">{firebaseUser?.data?.birthday || "Unknown"}</td>
                        </tr>
                        <tr className="border-b-2 border-[#dedede]">
                            <td className="py-5 text-gray-500 text-lg">Gender</td>
                            <td className="py-5 text-white text-lg">{firebaseUser?.data?.gender || "Unknown"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between mt-12">
                <button onClick={() => setOpenModal(true)} className="flex items-center bg-white text-black cursor-pointer rounded-md text-lg border-2 px-6 py-3 z-10">Edit profile
                </button>
                <button className="flex items-center bg-transparent hover:border-gray-400 cursor-pointer rounded-md text-white hover:text-gray-500 text-lg border-2 px-6 py-3 z-10" onClick={userSignOut}>Logout
                </button>
            </div>
        </div >
    )
}

export default User;

