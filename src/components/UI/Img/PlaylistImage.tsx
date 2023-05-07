import { useHover } from "../../../hooks/useHover";

import { BsFillPencilFill } from "react-icons/bs";
import { IoMdMusicalNotes } from "react-icons/io";

export default function PlaylistImage() {
    const [hoverRef, isHovered] = useHover<HTMLDivElement>();

    return (
        <div
            className="flex flex-col w-24 h-16 sm:48  sm:h-36 md:w-52 drop-shadow-xl shadow-slate-700 justify-center rounded-xl items-center bg-gray-800"
            ref={hoverRef}>
            {
                isHovered ?
                    <BsFillPencilFill size={48} color="gray" className="animate-fastfade cursor-pointer" /> :
                    <IoMdMusicalNotes size={48} color="gray" className="animate-fastfade cursor-pointer" />
            }
        </div>
    );
}