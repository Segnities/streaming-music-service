import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router";

import { useSelector } from "react-redux";

import { Formik, Form, Field } from "formik";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

import { signUpValidationSchema } from "../utils/validation";

import { firebaseDatabase, firebaseApp } from "../firebase/firebaseConfig";

import { FirebaseUsersSelectorInterface } from "../store/reducers/firebaseUsers";

import { RiErrorWarningFill } from "react-icons/ri";

interface SignUpFormProps {
    isFieldUnique: { email: boolean, username: boolean };
    setIsFieldUnique: Dispatch<SetStateAction<{
        email: boolean;
        username: boolean;
    }>>;
    setCreatePasswordError: Dispatch<SetStateAction<{
        code: string | number;
        message: string;
    } | null>>
}

export default function SignUpForm(props: SignUpFormProps) {
    const { isFieldUnique, setIsFieldUnique, setCreatePasswordError } = props;

    const auth = getAuth(firebaseApp);
    const collectionRef = collection(firebaseDatabase, "users");
    const navigate = useNavigate();

    const { firebaseUsers: users } = useSelector((state: FirebaseUsersSelectorInterface) => state.firebaseUsers);

    const handleSignUpWithEmailAndPassword = async ({ email, password, username, day, month, year, gender }) => {
        const isEmailUnique: boolean = users.filter(usr => usr.data.email === email).length > 1 ? false : true;
        const isUsernameUnique: boolean = users.filter(usr => usr.data.username === username).length > 1 ? false : true;

        setIsFieldUnique({ ...isFieldUnique, email: isEmailUnique, username: isUsernameUnique });

        if (isEmailUnique && isUsernameUnique) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => userCredential)
                .catch((error) => setCreatePasswordError(error));
            addDoc(collectionRef, {
                email, username, birthday: `${day} ${month} ${year}`, gender
            });
        }
        navigate('/');
    };

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                username: '',
                confirmPassword: '',
                day: '',
                month: '',
                year: '',
                gender: ''

            }}
            validationSchema={signUpValidationSchema}
            onSubmit={(values) => {
                handleSignUpWithEmailAndPassword(values);
            }}
        >
            {
                ({ errors, touched, values }) => (
                    <Form autoComplete="off">
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-sm font-bold my-1">Enter your email address</label>
                            <Field
                                type="text"
                                id="email"
                                autoComplete="off"
                                name="email"
                                placeholder="Enter your email address"
                                className={`
                                            text-base normal-case my-1 
                                            outline-none
                                            line tracking-normal p-3 border-[1px] 
                                            focus-visible:border-[3px] 
                                            ${(errors.email || isFieldUnique.email === false) && touched.email ? "border-red-700" : "border-gray-800"}`}
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
                            <label htmlFor="password" className="text-sm font-bold my-1">Create a password</label>
                            <Field
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                className={`
                                                text-base normal-case line my-1 tracking-normal 
                                                p-3 border-[1px] 
                                                outline-none
                                                focus-visible:border-[3px] 
                                                ${errors.password && touched.password ? "border-red-700" : "border-gray-800"}`}
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
                            <label htmlFor="confirm-password" className="text-sm font-bold my-1">Confirm password</label>
                            <Field
                                type="password"
                                id="confirm-password"
                                name="confirmPassword"
                                placeholder="Confirm password"
                                className={`text-base normal-case line my-1 tracking-normal p-3 border-[1px] outline-none focus-visible:border-[3px] ${errors.confirmPassword && touched.confirmPassword ? "border-red-700" : "border-gray-800"}`}
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
                            <label htmlFor="username" className="text-sm font-bold my-1">Username</label>
                            <Field
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Name of profile"
                                className={`text-base normal-case line my-1 tracking-normal p-3 border-[1px] outline-none focus-visible:border-[3px] ${(errors.username || isFieldUnique.username === false) && touched.username ? "border-red-700" : "border-gray-800"}`}
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
                            <p className="my-3 font-bold text-sm">Enter your birthday</p>
                            <div className="flex flex-row items-center">
                                <div className="flex flex-col justify-between w-1/6">
                                    <label htmlFor="day" className="text-base font-medium mb-2">Day</label>
                                    <Field
                                        type="text"
                                        id="day"
                                        name="day"
                                        maxLength={2}
                                        minLength={2}
                                        placeholder="DD"
                                        className={`p-2 outline-none border-[1px] hover:border-2 ${errors.day && touched.day ? "border-red-700" : "border-gray-500"} hover:${errors.day ? "border-red-800" : "border-black"}`}
                                    />
                                </div>
                                <div className="flex flex-col w-2/3 px-3">
                                    <label htmlFor="month" className="text-base font-medium mb-2">Month</label>
                                    <Field
                                        as="select"
                                        name="month"
                                        id="month"
                                        className={`p-2 border-[1px] hover:border-2 ${errors.month && touched.month ? "border-red-700" : "border-gray-500"} hover:${errors.month ? "border-red-700" : "border-black"}`}
                                    >
                                        <option value="" disabled>Month</option>
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
                                    <label htmlFor="year" className="text-base font-medium mb-2">Year</label>
                                    <Field
                                        type="text"
                                        name="year"
                                        id="year"
                                        placeholder="YYYY"
                                        minLength={4}
                                        maxLength={4}
                                        className={`p-2 border-[1px] hover:border-2 ${errors.year && touched.year ? "border-red-700" : "border-gray-500"} hover:${errors.year ? "border-red-700" : "border-black"} outline-none`}
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
                                errors.month && touched.month && values.month.length === 0 ? (
                                    <div className="flex items-center mt-1">
                                        <RiErrorWarningFill color="red" size={16} className="mr-1" />
                                        <span className="text-sm font-semibold text-red-700">{errors.month}</span>
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
                            <p className="text-base my-2 font-bold">Enter your gender</p>
                            <div className="flex flex-row flex-wrap">
                                <div className="flex flex-row-reverse items-center mr-2">
                                    <label htmlFor="male-gender" className="ml-1">Male</label>
                                    <Field
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        id="male-gender"
                                        className="w-4 h-4"
                                    />
                                </div>
                                <div className="flex flex-row-reverse mx-2 items-center">
                                    <label htmlFor="female-gender" className="ml-1">Female</label>
                                    <Field
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        id="female-gender"
                                        className="w-4 h-4"
                                    />
                                </div>
                                <div className="flex flex-row-reverse mx-2 items-center">
                                    <label htmlFor="non-binary-gender" className="ml-1">Non-binary</label>
                                    <Field
                                        type="radio"
                                        name="gender"
                                        value="Non-binary"
                                        id="non-binary-gender"
                                        className="w-4 h-4"
                                    />
                                </div>
                                <div className="flex flex-row-reverse mx-0 sm:mx-2 items-center">
                                    <label htmlFor="another-gender" className="ml-1">Another</label>
                                    <Field
                                        type="radio"
                                        name="gender"
                                        value="Another"
                                        id="another-gender"
                                        className="w-4 h-4"
                                    />
                                </div>
                                <div className="flex flex-row-reverse mx-0 sm:mx-2 items-center">
                                    <label htmlFor="not-specified-gender" className="ml-1">I don&apos;t want to specify</label>
                                    <Field
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
                        <div className="flex justify-center items-center my-8">
                            <button type="submit" className="bg-[#1ED760] w-2/6 text-2xl p-3 rounded-[32px] text-black font-medium hover:scale-x-110 hover:scale-y-105 hover:transition-transform">Sign Up</button>
                        </div>
                    </Form>
                )
            }
        </Formik>

    );
}
