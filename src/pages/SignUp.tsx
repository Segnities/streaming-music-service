import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import UserAuthFields from "../components/UserAuthFields";

import {
    getAuth,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

import * as Yup from "yup";

import { firebaseApp, firebaseDatabase } from "../firebase/firebaseConfig";

import GoogleSignInBtn from "../components/GoogleSignInBtn";

import { getUsers } from "../utils/getUsers";


const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().min(8, 'Password is too short - should be 8 chars minimum.').required('Password is required'),
    confirmPassword: Yup.string().min(8).when("password", {
        is: (val: any) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf([Yup.ref("password")], "Both password need to be the same")
    }).required('Confirm password is required'),
    username: Yup.string().min(4).required('Username is required'),
    day: Yup.string().min(2).max(2).test('day', 'Invalid day', (value) => {
        if (Number(value) < 1 || Number(value) > 31) {
            return false;
        }
        return true
    }).matches(/\d/g, 'Day must contain only numbers!').required('Day of birth is required'),
    mounth: Yup.string().required('Mounth of birth is required'),
    year: Yup.string().min(4).max(4).test('year', 'Invalid year', (value) => {
        if (Number(value) < 1918 || Number(value) > new Date().getFullYear()) {
            return false;
        }
        return true;
    }).matches(/\d/g, 'Year must contain only numbers!').required('Year of birth is required'),
    gender: Yup.string().required('Gender is required')
})

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
                    />
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