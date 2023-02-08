import { NavLink } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook, AiOutlineTwitter } from "react-icons/ai";

function SignUp() {
    return (
        <div className="flex flex-1 flex-col items-center">
            <p className="font-bold text-2xl">To get started, sign up. It's free?!</p>
            <div className="flex flex-col flex-1 mt-2">
                <div className="flex flex-col flex-1 items-center">
                    <button className="w-72 sm:w-96 flex items-center my-2 bg-[#3b5998] justify-center p-3 border-[1px] border-gray-400 hover:border-black rounded-[32px]">
                        <AiFillFacebook size={21} color={"white"} />
                        <span className="text-white font-semibold text-base pl-2">START WITH FACEBOOK</span>
                    </button>
                    <button className="w-72 sm:w-96 flex items-center my-2 bg-[#1887F2] justify-center p-3 border-[1px] border-gray-400 hover:border-black rounded-[32px]">
                        <AiOutlineTwitter size={21} color={"white"} />
                        <span className="text-white font-semibold text-base pl-2">START WITH TWITTER</span>
                    </button>
                    <button className="w-72 sm:w-96 flex items-center my-2 justify-center p-3 border-[1px] border-gray-400 hover:border-black rounded-[32px]">
                        <FcGoogle size={21} />
                        <span className="text-base text-gray-600 pl-2 font-semibold">START WITH GOOGLE</span>
                    </button>
                </div>
                <div className="flex flex-row mt-5">
                    <hr role="presentation" className="flex-1 border-[1px] border-solid border-gray-300" />
                    <span className="flex-1 self-center text-center font-bold text-xs uppercase">OR</span>
                    <hr role="presentation" className="flex-1 border-[1px] border-solid border-gray-300" />
                </div>
                <div className="mt-2 mb-1">
                    <h2 className="text-xl font-bold text-center">Register via email</h2>
                </div>
                <div className="flex flex-col flex-1 mt-4">
                    <form autoComplete="off">
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-sm font-bold my-1">Enter your email address</label>
                            <input
                                type="text"
                                id="email"
                                autoComplete="off"
                                name="email"
                                placeholder="Enter your email address"
                                className="text-base normal-case my-1 line tracking-normal p-3 border-[1px] focus-visible:border-[3px] border-gray-800"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password" className="text-sm font-bold my-1">Create a password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                className="text-base normal-case line my-1 tracking-normal p-3 border-[1px] focus-visible:border-[3px] border-gray-800"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="confirm-password" className="text-sm font-bold my-1">Confirm password</label>
                            <input
                                type="password"
                                id="confirm-password"
                                name="password"
                                placeholder="Confirm password"
                                className="text-base normal-case line my-1 tracking-normal p-3 border-[1px] focus-visible:border-[3px] border-gray-800"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="username" className="text-sm font-bold my-1">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Name of profile"
                                className="text-base normal-case line my-1 tracking-normal p-3 border-[1px] focus-visible:border-[3px] border-gray-800"
                            />

                        </div>
                        <div className="flex flex-col justify-between">
                            <p className="my-3 font-bold text-sm">Enter your birthday</p>
                            <div className="flex flex-row items-center">
                                <div className="flex flex-col justify-between w-1/6">
                                    <label htmlFor="day" className="text-base font-medium mb-2">Day</label>
                                    <input
                                        type="text"
                                        id="day"
                                        maxLength={2}
                                        minLength={2}
                                        placeholder="DD"
                                        className="p-2 border-[1px] border-gray-500 hover:border-black"
                                    />
                                </div>
                                <div className="flex flex-col w-2/3 px-3">
                                    <label htmlFor="mounth" className="text-base font-medium mb-2">Mounth</label>
                                    <select name="mounth" id="mounth" className="p-2 border-[1px] border-gray-500 hover:border-black">
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
                                    </select>
                                </div>
                                <div className="flex flex-col w-1/5">
                                    <label htmlFor="year" className="text-base font-medium mb-2">Year</label>
                                    <input
                                        type="text"
                                        name="year"
                                        id="year"
                                        maxLength={4}
                                        minLength={4}
                                        placeholder="YYYY"
                                        className="p-2 border-[1px] border-gray-500 hover:border-black"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="text-base my-2 font-bold">Enter your gender</p>
                            <div className="flex flex-row flex-wrap">
                                <div className="flex flex-row-reverse items-center mr-2">
                                    <label htmlFor="male-gender" className="ml-1">Male</label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        id="male-gender"
                                        className="w-4 h-4"
                                    />
                                </div>
                                <div className="flex flex-row-reverse mx-2 items-center">
                                    <label htmlFor="female-gender" className="ml-1">Female</label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        id="female-gender"
                                        className="w-4 h-4"
                                    />
                                </div>
                                <div className="flex flex-row-reverse mx-2 items-center">
                                    <label htmlFor="non-binary-gender" className="ml-1">Non-binary</label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Non-binary"
                                        id="non-binary-gender"
                                        className="w-4 h-4"
                                    />
                                </div>
                                <div className="flex flex-row-reverse mx-2 items-center">
                                    <label htmlFor="another-gender" className="ml-1">Another</label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Another"
                                        id="another-gender"
                                        className="w-4 h-4"
                                    />
                                </div>
                                <div className="flex flex-row-reverse mx-2 items-center">
                                    <label htmlFor="not-specified-gender" className="ml-1">I don't want to specify</label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="I don't want to specify"
                                        id="not-specified-gender"
                                        className="w-4 h-4"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center my-8">
                            <button className="bg-[#1ED760] w-2/6 text-2xl p-3 rounded-[32px] text-black font-medium hover:scale-x-110 hover:scale-y-105 hover:transition-transform">Sign Up</button>
                        </div>
                    </form>
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