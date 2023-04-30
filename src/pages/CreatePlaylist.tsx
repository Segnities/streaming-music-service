import { useState } from "react";

import BgDivider from "../components/UI/BgDivider/BgDivider";

import { IoMdMusicalNotes } from "react-icons/io";
import { BsFillPencilFill, BsThreeDots } from "react-icons/bs";

import { useGetCurrentUser } from "../hooks/useGetCurrentUser";
import { useHover } from "../hooks/useHover";
import { MoreOptionsIcon } from "../components/UI/MoreOptions";

export default function CreatePlaylist() {
    const [user, firebaseUser] = useGetCurrentUser();
    const [showMore, setShowMore] = useState<boolean>(false);
    const [hoverRef, isHovered] = useHover<HTMLDivElement>();

    return (
        <div className="flex flex-col">
            <div className="flex flex-col relative">
                <BgDivider />
                <div className="absolute flex inset-0 sm:inset-5 p-12 items-center gap-4">
                    <div className="flex flex-col w-24 h-16 sm:48  sm:h-36 md:w-52 drop-shadow-xl shadow-slate-700 justify-center rounded-xl items-center bg-gray-800" ref={hoverRef}>
                        {
                            isHovered ? <BsFillPencilFill size={48} color="gray" className="animate-fastfade cursor-pointer" /> : <IoMdMusicalNotes size={48} color="gray" className="animate-fastfade cursor-pointer" />
                        }
                    </div>
                    <div className="w-full grid grid-flow-row gap-3">
                        <p className="text-gray-300 text-xs font-semibold">Playlist</p>
                        <input type="text" className="w-full font-bold  text-3xl sm:text-[3rem] md:text-[3.5rem] outline-none px-4 rounded-xl bg-transparent text-white" placeholder="My Playlist" />
                        <p className="text-gray-300 text-sm font-semibold">{firebaseUser?.data.username ?? user?.displayName}</p>
                    </div>
                </div>
            </div>

            <div className="">
                <BsThreeDots size={32} color="gray" className="cursor-pointer" onClick={() => setShowMore(!showMore)} />
            </div>

        </div>
    );
}