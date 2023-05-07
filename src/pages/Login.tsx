import { NavLink } from "react-router-dom";

import GoogleBtn from "../components/UI/Buttons/GoogleBtn";
import LoginForm from "../components/LoginForm";

function Login() {

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
                    <LoginForm />
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