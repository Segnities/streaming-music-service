import { AiFillFacebook } from "react-icons/ai";

function FacebookSignInButton() {
    return (
        <button className="w-72 sm:w-96 flex items-center my-2 bg-[#3b5998] justify-center p-3 border-[1px] border-gray-400 hover:border-black rounded-[32px]">
            <AiFillFacebook size={21} color={"white"} />
            <span className="text-white font-semibold text-base pl-2">CONTINUE WITH FACEBOOK</span>
        </button>
    );
}

export default FacebookSignInButton;