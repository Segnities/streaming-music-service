import { useState, useContext } from "react";

import { useNavigate } from "react-router";

import { getAuth } from "firebase/auth";

import { Formik, Form, Field } from "formik";

import { AuthType, AuthContext } from "../context";

import { RiErrorWarningFill } from "react-icons/ri";

import { UserDoc } from "../utils/@types";

import { firebaseApp } from "../firebase/firebaseConfig";

import { userInfoValidationSchema } from "../validation";


interface DisabledFields {
    email: boolean;
    username: boolean;
    birthday: boolean;
    password: boolean;
    gender: boolean;
}


function UserFormik() {
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



    return <><Formik
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
                        <label htmlFor="email" className="text-sm text-white font-bold my-1">Email address</label>
                        <Field disabled={disabledFields.email}
                            type="text"
                            id="email"
                            autoComplete="off"
                            name="email"
                            placeholder="Enter your email address"
                            className={`text-base normal-case my-1 disabled:text-white outline-none line tracking-normal p-3 border-[1px] 
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
                        <label htmlFor="password" className="text-sm text-white font-bold my-1">Password</label>
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
                        <p className="my-3 font-bold text-sm text-white">Birthday</p>
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
                        <p className="text-base my-2 font-bold text-white">Gender</p>
                        <div className="flex flex-row w-full flex-wrap">
                            <Field
                                disabled={disabledFields.gender}
                                name="gender"
                                className="text-base w-full normal-case line my-1 tracking-normal p-3 border-[1px] disabled:text-white outline-none focus-visible:border-[3px]"
                            />
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
    </>
}