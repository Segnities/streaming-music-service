import { useState } from "react";
import { NavLink } from "react-router-dom";

import GoogleBtn from "../components/UI/Buttons/GoogleBtn";
import SignUpForm from "../components/SignUpForm";
import BlockSpace from "../components/UI/BlockSpace/BlockSpace";

function SignUp() {

    const [createPasswordError, setCreatePasswordError] = useState<{ code: string | number, message: string } | null>(null);


    const [isFieldUnique, setIsFieldUnique] = useState({
        email: true,
        username: true
    });


    return (
        <div className="flex flex-1 flex-col items-center max-w-screen">
            {
                createPasswordError && (
                    <div className='w-full flex flex-col p-5 rounded-md items-center text-center'>
                        <h4 className='text-red-600 text-2xl font-semibold'>Error!</h4>
                        <p className='text-red-500 text-base font-medium'>{createPasswordError.code} {createPasswordError.message}</p>
                    </div>
                )
            }
            <p className="font-bold text-2xl">To get started, sign up. It&apos;s free?!</p>
            <div className="flex flex-col flex-1 mt-2">
                <div className="flex flex-col flex-1 items-center">
                    <GoogleBtn />
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
                    <SignUpForm
                        isFieldUnique={isFieldUnique}
                        setIsFieldUnique={setIsFieldUnique}
                        setCreatePasswordError={setCreatePasswordError}
                    />
                    <hr />
                    <div className="flex justify-center mt-1">
                        <p>Do you have an account?<NavLink to='/login'><span className="text-[#1ED760] underline-offset-2 underline ml-1">Login.</span></NavLink></p>
                    </div>
                    <BlockSpace />
                </div>
            </div>
        </div>
    );
}

export default SignUp;