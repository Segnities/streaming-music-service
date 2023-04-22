import { NavLink, useNavigate } from "react-router-dom";

import { Formik, Form, Field } from "formik";

import * as Yup from "yup";

import { setUserSignUp, changeIsAuth, setUserSignOut } from "../store/reducers/auth";

import {
    getAuth,
    setPersistence,
    browserSessionPersistence,
    browserLocalPersistence,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth";
import { firebaseApp } from "../firebase/firebaseConfig";
import GoogleBtn from "../components/UI/Buttons/GoogleBtn";
import { useDispatch } from "react-redux";

const validationSchema = Yup.object().shape({
    email: Yup.string().email().min(1).required('Email is required'),
    password: Yup.string().min(1).required('Password is required'),
    rememberMe: Yup.boolean()

});

function Login() {
    const auth = getAuth(firebaseApp);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignInWithEmailAndPasswordProvider = async (email: string, password: string, rememberMe: boolean) => {
        await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
        signInWithEmailAndPassword(auth, email, password).then(
            (res) => {
                dispatch(changeIsAuth(true));
                navigate('/');
            }).catch(err => alert(err.code + ":" + err.message));
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                dispatch(setUserSignUp({ user: JSON.stringify(user) }));
            } else {
                dispatch(setUserSignOut());
                console.log('User was sign out :(');
            }
        })
    }

    return (
        <div className="flex flex-1 flex-col items-center">
            <p className="text-base font-bold">To continue, log to Vite.</p>
            <div className="flex flex-col flex-1 mt-2">
                <div>
                    <GoogleBtn />
                </div>
                <div className="flex flex-row mt-5">
                    <hr role="presentation" className="flex-1 border-[1px] border-solid border-gray-300" />
                    <span className="flex-1 self-center text-center font-bold text-xs uppercase">OR</span>
                    <hr role="presentation" className="flex-1 border-[1px] border-solid border-gray-300" />
                </div>
                <div className="flex flex-col flex-1 mt-4">
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                            rememberMe: false
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            handleSignInWithEmailAndPasswordProvider(values.email, values.password, values.rememberMe);
                        }}
                    >
                        {
                            ({ errors }) => (
                                <Form autoComplete="off">
                                    {(errors.email || errors.password) && (

                                        <div className="flex w-full justify-center my-5">
                                            <h3 className="text-lg transition-opacity duration-100 ease-in text-red-600 font-semibold">Wrong email or password</h3>
                                        </div>
                                    )}
                                    <div className="flex flex-col">
                                        <label htmlFor="email" className="text-sm font-bold my-1">Email address</label>
                                        <Field
                                            type="text"
                                            id="email"
                                            autoComplete="off"
                                            name="email"
                                            placeholder="Enter your email address"
                                            className="text-base normal-case my-1 line tracking-normal p-3 border-[1px]  focus-visible:border-[3px] border-gray-800"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="password" className="text-sm font-bold my-1">Password</label>
                                        <Field
                                            type="password"
                                            name="password"
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
                                            <Field type="checkbox" name="rememberMe" className="w-4 h-4" id="remember-me" />
                                        </div>
                                        <div>
                                            <button type="submit" className="bg-[#1ED760] w-32 text-sm p-4 rounded-3xl text-black font-medium">LOG IN</button>
                                        </div>
                                    </div>
                                </Form>
                            )
                        }
                    </Formik>
                    <hr />
                    <div className="flex flex-col mt-4">
                        <p className="text-center font-bold text-lg">Don&apos;t have an account?</p>
                        <NavLink to={'/sign-up'} className="flex justify-center my-3 rounded-3xl p-4 border-[1px] text-gray-500 hover:border-gray-800 border-gray-500"> SIGN UP FOR VITE </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;