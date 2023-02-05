import { FcGoogle } from "react-icons/fc";

function Login() {
    return <div className="flex flex-1 flex-col items-center">
        <p className="text-base font-bold">To continue, log to Vite.</p>
        <div className="mt-2">
            <button className="w-72 sm:w-96 flex items-center justify-center p-2 border-[1px] border-gray-400 hover:border-black rounded-[32px]">
                <FcGoogle size={28} />
                <span className="text-base text-gray-600 pl-2 font-semibold">CONTINUE WITH GOOGLE</span>
            </button>
        </div>
    </div>
}

export default Login;