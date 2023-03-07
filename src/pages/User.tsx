import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { Formik, Form, Field } from "formik";

import { AuthContext, AuthType } from "../context";

import { signOut, getAuth } from "firebase/auth"
import { doc, updateDoc } from "firebase/firestore";
import { firebaseApp, firebaseDatabase } from "../firebase/firebaseConfig";

import { getUser } from "../utils/getUser";

import { AiOutlinePoweroff } from "react-icons/ai";
import { UserDoc } from "../utils/@types";

import NoImage from "../assets/no_artist.jpg";
import Loader from "../components/UI/Loader";

import { userInfoValidationSchema } from "../validation";

import { RiErrorWarningFill } from "react-icons/ri";

interface DisabledFields {
    email: boolean;
    username: boolean;
    birthday: boolean;
    password: boolean;
    gender: boolean;
}

function User() {
    const authContext: AuthType | null = useContext(AuthContext);
    const navigate = useNavigate();
    const auth = getAuth(firebaseApp);

    const [firebaseUser, setFirebaseUser] = useState<UserDoc | undefined | null>(null);

    const [isUserLoading, setIsUserLoading] = useState<boolean>(true);

    const [disabledFields, setDisabledFields] = useState<DisabledFields>({
        email: true,
        password: true,
        username: true,
        birthday: true,
        gender: true,
    });

    const [isFieldUnique, setIsFieldUnique] = useState({
        email: true,
        username: true
    });


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
                        <p className="text-3xl sm:text-base md:text-2xl text-white mb-2">
                            {authContext?.user?.displayName ?? firebaseUser?.data?.username}
                        </p>
                    </div>
                </div>
                <div className="w-full h-24 sm:h-24" />
            </div>
            <div className="mt-3 w-full">
                <Formik
                    initialValues={{
                        email: firebaseUser?.data.email,
                        password: '',
                        confirmPassword: '',
                        username: firebaseUser?.data.username,
                        day: firebaseUser?.data.birthday.split(" ")[0],
                        mounth: firebaseUser?.data.birthday.split(" ")[1],
                        year: firebaseUser?.data.birthday.split(" ")[2],
                        gender: firebaseUser?.data.gender

                    }}
                    validationSchema={userInfoValidationSchema}
                    onSubmit={(values) => {
                        alert("Hello!");
                        console.log(JSON.stringify(values, null, 2));
                    }}
                >
                    {
                        ({ errors, touched, values }) => (
                            <Form autoComplete="off">
                                <div className="flex flex-col">
                                    <label htmlFor="email" className="text-sm text-white font-bold my-1">Enter your email address</label>
                                    <Field disabled={disabledFields.email}
                                        type="text"
                                        id="email"
                                        autoComplete="off"
                                        name="email"
                                        placeholder="Enter your email address"
                                        className={`
                                            text-base normal-case my-1 
                                            disabled:text-white
                                            outline-none
                                            line tracking-normal p-3 border-[1px] 
                                            focus-visible:border-[3px] 
                                            ${errors.email || isFieldUnique.email === false ? "border-red-700" : "border-gray-800"}`}
                                    />
                                    {
                                        errors.email && touched.email ? (
                                            <div className="flex items-center mt-1">
                                                <RiErrorWarningFill color="red" size={16} className="mr-1" />
                                                <span className="text-sm font-semibold text-red-700">{errors.email}</span>
                                            </div>
                                        ) : null
                                    }
                                    {
                                        isFieldUnique.email === false && touched.email ? (
                                            <div className="flex items-center mt-1">
                                                <RiErrorWarningFill color="red" size={16} className="mr-1" />
                                                <span className="text-sm font-semibold text-red-700">This email already exist!</span>
                                            </div>
                                        ) : null
                                    }
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="password" className="text-sm text-white font-bold my-1">Create a password</label>
                                    <Field disabled={disabledFields.password}
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        className={`
                                                text-base normal-case line my-1 tracking-normal 
                                                p-3 border-[1px]
                                              disabled:text-white
                                                outline-none
                                                focus-visible:border-[3px] 
                                                ${errors.password ? "border-red-700" : "border-gray-800"}`}
                                    />
                                    {
                                        errors.password && touched.password ? (
                                            <div className="flex items-center mt-1">
                                                <RiErrorWarningFill color="red" size={16} className="mr-1" />
                                                <span className="text-sm font-semibold text-red-700">{errors.password}</span>
                                            </div>
                                        ) : null
                                    }
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="confirm-password" className="text-sm text-white font-bold my-1">Confirm password</label>
                                    <Field disabled={disabledFields.password}
                                        type="password"
                                        id="confirm-password"
                                        name="confirmPassword"
                                        placeholder="Confirm password"
                                        className={`
                                                text-base normal-case line my-1 tracking-normal 
                                                p-3 border-[1px] 
                                                disabled:text-white
                                                outline-none
                                                focus-visible:border-[3px] 
                                                ${errors.confirmPassword ? "border-red-700" : "border-gray-800"}`}
                                    />
                                    {
                                        errors.confirmPassword && touched.confirmPassword ? (
                                            <div className="flex items-center mt-1">
                                                <RiErrorWarningFill color="red" size={16} className="mr-1" />
                                                <span className="text-sm font-semibold text-red-700">{errors.confirmPassword}</span>
                                            </div>) : null
                                    }
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="username" className="text-sm text-white font-bold my-1">Username</label>
                                    <Field disabled={disabledFields.username}
                                        type="text"
                                        name="username"
                                        id="username"
                                        placeholder="Name of profile"
                                        className={`
                                                text-base normal-case line my-1 tracking-normal 
                                                p-3 border-[1px] 
                                                disabled:text-white
                                                outline-none
                                                focus-visible:border-[3px] 
                                                ${errors.username || isFieldUnique.username === false ? "border-red-700" : "border-gray-800"}`}
                                    />
                                    {
                                        errors.username && touched.username ? (
                                            <div className="flex items-center mt-1">
                                                <RiErrorWarningFill color="red" size={16} className="mr-1" />
                                                <span className="text-sm font-semibold text-red-700">{errors.username}</span>
                                            </div>) : null
                                    }
                                    {
                                        isFieldUnique.username === false && touched.username ? (
                                            <div className="flex items-center mt-1">
                                                <RiErrorWarningFill color="red" size={16} className="mr-1" />
                                                <span className="text-sm font-semibold text-red-700">This username already exist!</span>
                                            </div>) : null
                                    }

                                </div>
                                <div className="flex flex-col justify-between">
                                    <p className="my-3 font-bold text-sm text-white">Enter your birthday</p>
                                    <div className="flex flex-row items-center">
                                        <div className="flex flex-col justify-between w-1/6">
                                            <label htmlFor="day" className="text-base font-medium mb-2 text-white">Day</label>
                                            <Field disabled={disabledFields.username}
                                                type="text"
                                                id="day"
                                                name="day"
                                                maxLength={2}
                                                minLength={2}
                                                placeholder="DD"
                                                className={`
                                                        p-2 outline-none 
                                                        border-[1px] hover:border-2 
                                                        disabled:border-none
                                                        disabled:outline-none
                                                        disabled:text-white
                                                        ${errors.day ? "border-red-700" : "border-gray-500"}
                                                        hover:${errors.day ? "border-red-800" : "border-black"}`}
                                            />
                                        </div>
                                        <div className="flex flex-col w-2/3 px-3">
                                            <label htmlFor="mounth" className="text-base font-medium mb-2 text-white">Mounth</label>
                                            <Field disabled={disabledFields.birthday}
                                                as="select"
                                                name="mounth"
                                                id="mounth"
                                                className={`
                                                    p-2 border-[1px] hover:border-2 
                                                    disabled:border-none
                                                    disabled:outline-none
                                                    disabled:bg-gray-500
                                                    disabled:text-white
                                                    ${errors.mounth ? "border-red-700" : "border-gray-500"} 
                                                    hover:${errors.mounth ? "border-red-700" : "border-black"}`}
                                            >
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
                                            <label htmlFor="year" className="text-base font-medium mb-2 text-white">Year</label>
                                            <Field disabled={disabledFields.birthday}
                                                type="text"
                                                name="year"
                                                id="year"
                                                placeholder="YYYY"
                                                minLength={4}
                                                maxLength={4}
                                                className={`
                                                        p-2 
                                                        border-[1px] hover:border-2 
                                                        disabled:border-none
                                                        disabled:outline-none
                                                        disabled:text-white
                                                        ${errors.year ? "border-red-700" : "border-gray-500"} 
                                                        hover:${errors.year ? "border-red-700" : "border-black"} 
                                                        outline-none`}
                                            />
                                        </div>
                                    </div>
                                    {
                                        errors.day && touched.day ? (
                                            <div className="flex items-center mt-1">
                                                <RiErrorWarningFill color="red" size={16} className="mr-1" />
                                                <span className="text-sm font-semibold text-red-700">{errors.day}</span>
                                            </div>) : null
                                    }
                                    {
                                        errors.mounth && touched.mounth && values?.mounth?.length === 0 ? (
                                            <div className="flex items-center mt-1">
                                                <RiErrorWarningFill color="red" size={16} className="mr-1" />
                                                <span className="text-sm font-semibold text-red-700">{errors.mounth}</span>
                                            </div>) : null
                                    }
                                    {
                                        errors.year && touched.year ? (
                                            <div className="flex items-center mt-1">
                                                <RiErrorWarningFill color="red" size={16} className="mr-1" />
                                                <span className="text-sm font-semibold text-red-700">{errors.year}</span>
                                            </div>) : null
                                    }
                                </div>
                                <div className="mt-3">
                                    <p className="text-base my-2 font-bold text-white">Enter your gender</p>
                                    <div className="flex flex-row flex-wrap">
                                        <div className="flex flex-row-reverse items-center mr-2">
                                            <label htmlFor="male-gender" className="ml-1 text-white">Male</label>
                                            <Field disabled={disabledFields.gender}
                                                type="radio"
                                                name="gender"
                                                value="Male"
                                                id="male-gender"
                                                className="w-4 h-4"
                                            />
                                        </div>
                                        <div className="flex flex-row-reverse mx-2 items-center">
                                            <label htmlFor="female-gender" className="ml-1 text-white">Female</label>
                                            <Field disabled={disabledFields.gender}
                                                type="radio"
                                                name="gender"
                                                value="Female"
                                                id="female-gender"
                                                className="w-4 h-4"
                                            />
                                        </div>
                                        <div className="flex flex-row-reverse mx-2 items-center">
                                            <label htmlFor="non-binary-gender" className="ml-1 text-white">Non-binary</label>
                                            <Field disabled={disabledFields.gender}
                                                type="radio"
                                                name="gender"
                                                value="Non-binary"
                                                id="non-binary-gender"
                                                className="w-4 h-4"
                                            />
                                        </div>
                                        <div className="flex flex-row-reverse mx-0 sm:mx-2 items-center">
                                            <label htmlFor="another-gender" className="ml-1 text-white">Another</label>
                                            <Field disabled={disabledFields.gender}
                                                type="radio"
                                                name="gender"
                                                value="Another"
                                                id="another-gender"
                                                className="w-4 h-4"
                                            />
                                        </div>
                                        <div className="flex flex-row-reverse mx-0 sm:mx-2 items-center">
                                            <label htmlFor="not-specified-gender" className="ml-1 text-white">I don't want to specify</label>
                                            <Field disabled={disabledFields.gender}
                                                type="radio"
                                                name="gender"
                                                value="I don't want to specify"
                                                id="not-specified-gender"
                                                className="w-4 h-4"
                                            />
                                        </div>
                                    </div>
                                    {
                                        errors.gender && touched.gender ? (
                                            <div className="flex items-center mt-1">
                                                <RiErrorWarningFill color="red" size={16} className="mr-1" />
                                                <span className="text-sm font-semibold text-red-700">{errors.gender}</span>
                                            </div>) : null
                                    }
                                </div>

                            </Form>
                        )
                    }
                </Formik>
            </div>
            <div className="flex justify-end mt-12">
                <button className="flex items-center bg-transparent hover:border-gray-400 cursor-pointer rounded-xl text-white hover:text-gray-400 border-2 px-4 py-3 z-10" onClick={userSignOut}>Logout <AiOutlinePoweroff className="mx-1" size={18} />
                </button>
            </div>
        </div>
    )
}

export default User;

