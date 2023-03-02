import { AiOutlineTwitter } from "react-icons/ai";

function TwitterSignInBtn() {
    return (
    <button className="w-72 sm:w-96 flex items-center my-2 bg-[#1887F2] justify-center p-3 border-[1px] border-gray-400 hover:border-black rounded-[32px]">
        <AiOutlineTwitter size={21} color={"white"} />
        <span className="text-white font-semibold text-base pl-2">CONTINUE WITH TWITTER</span>
    </button>
    )
}

export default TwitterSignInBtn;