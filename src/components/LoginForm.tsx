import { useState } from "react";

import { NavLink } from "react-router-dom";

import { Formik, Field, Form } from "formik";

import * as Yup from 'yup';

import { useNavigate } from "react-router";

import { useDispatch } from "react-redux";

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

const validationSchema = Yup.object().shape({
    email: Yup.string().email().min(1).required('Email is required'),
    password: Yup.string().min(1).required('Password is required'),
    rememberMe: Yup.boolean()

});

export default function LoginForm() {
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const dispatch = useDispatch();
    const auth = getAuth(firebaseApp);
    const navigate = useNavigate();

    const handleSignInWithEmailAndPasswordProvider = async (email: string, password: string, rememberMe: boolean): Promise<void> => {

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

    return (<>
        <Formik
            initialValues={{
                email: "",
                password: "",
                rememberMe: false
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
                handleSignInWithEmailAndPasswordProvider(values.email, values.password, values.rememberMe);
                setIsSubmitted(true);
            }}
        >
            {
                ({ errors }) => (
                    <Form autoComplete="off">
                        {((errors.email || errors.password) && isSubmitted) && (
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
    </>
    )
}