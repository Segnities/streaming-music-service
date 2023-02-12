import { NavLink } from "react-router-dom";
import { useFormik } from "formik";

import * as Yup from "yup";

import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook, AiOutlineTwitter } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context";


const validationSchema = Yup.object().shape({
    email: Yup.string().email().min(1).required('Email is required'),
    password: Yup.string().min(1).required('Password is required'),
    rememberMe: Yup.boolean()

})

function Login() {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validationSchema: validationSchema,
        onSubmit(values, formikHelpers) {
            alert(JSON.stringify(values, null, 2))
        },
    });
    const [successSignUp, setSuccessSignUp] = useState(false);

    const authContext = useContext(AuthContext);

    useEffect(() => {
        if (localStorage.getItem("success-user-sign-up") === "true") {
            setSuccessSignUp(true);
        }
    })


    return (
        <div className="flex flex-1 flex-col items-center">
            {
                successSignUp && <div className="w-full p-5 font-bold text-2xl color-white bg-green-600">Your successfully sign up to Vite!</div>
            }
            <p className="text-base font-bold">To continue, log to Vite.</p>
            <div className="flex flex-col flex-1 mt-2">
                <div>
                    <button className="w-72 sm:w-96 flex items-center my-2 bg-[#3b5998] justify-center p-3 border-[1px] border-gray-400 hover:border-black rounded-[32px]">
                        <AiFillFacebook size={21} color={"white"} />
                        <span className="text-white font-semibold text-base pl-2">CONTINUE WITH FACEBOOK</span>
                    </button>
                    <button className="w-72 sm:w-96 flex items-center my-2 bg-[#1887F2] justify-center p-3 border-[1px] border-gray-400 hover:border-black rounded-[32px]">
                        <AiOutlineTwitter size={21} color={"white"} />
                        <span className="text-white font-semibold text-base pl-2">CONTINUE WITH TWITTER</span>
                    </button>
                    <button className="w-72 sm:w-96 flex items-center my-2 justify-center p-3 border-[1px] border-gray-400 hover:border-black rounded-[32px]">
                        <FcGoogle size={21} />
                        <span className="text-base text-gray-600 pl-2 font-semibold">CONTINUE WITH GOOGLE</span>
                    </button>
                </div>
                <div className="flex flex-row mt-5">
                    <hr role="presentation" className="flex-1 border-[1px] border-solid border-gray-300" />
                    <span className="flex-1 self-center text-center font-bold text-xs uppercase">OR</span>
                    <hr role="presentation" className="flex-1 border-[1px] border-solid border-gray-300" />
                </div>
                <div className="flex flex-col flex-1 mt-4">
                    <form onSubmit={formik.handleSubmit} autoComplete="off">
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-sm font-bold my-1">Email address or username</label>
                            <input
                                type="text"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                id="email"
                                autoComplete="off"
                                name="email"
                                placeholder="Email address or username"
                                className="text-base normal-case my-1 line tracking-normal p-3 border-[1px]  focus-visible:border-[3px] border-gray-800"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password" className="text-sm font-bold my-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                id="password"
                                placeholder="Password"
                                className="text-base normal-case line my-1 tracking-normal p-3 border-[1px] focus-visible:border-[3px] border-gray-800"
                            />
                        </div>
                        <p className="mt-2">
                            <NavLink to='/forgot-password' className="underline text-base font-semibold hover:text-[#1ED760]"> Forgot your password?</NavLink>
                        </p>
                        <div className="flex justify-between items-center mt-3">
                            <div className="flex flex-row-reverse items-center">
                                <label htmlFor="remember-me" className="font-medium text-base ml-4">Remember me</label>
                                <input type="checkbox" name="rememberMe" checked={formik.values.rememberMe} onChange={formik.handleChange} className="w-4 h-4" id="remember-me" />
                            </div>
                            <div>
                                <button type="submit" className="bg-[#1ED760] w-32 text-sm p-4 rounded-3xl text-black font-medium">LOG IN</button>
                            </div>
                        </div>
                    </form>
                    <hr />
                    <div className="flex flex-col mt-4">
                        <p className="text-center font-bold text-lg">Don't have an account?</p>
                        <NavLink to={'/sign-up'} className="flex justify-center my-3 rounded-3xl p-4 border-[1px] text-gray-500 hover:border-gray-800 border-gray-500"> SIGN UP FOR VITE </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;