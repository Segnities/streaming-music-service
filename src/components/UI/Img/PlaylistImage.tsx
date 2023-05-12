import { Dispatch, SetStateAction } from "react";

import { useHover } from "../../../hooks/useHover";

import { IoPencilSharp } from "react-icons/io5";
import { IoMdMusicalNotes } from "react-icons/io";

interface PlaylistImageProps {
    tailwindWidth: string;
    tailwindHeight: string;
    iconSize: number;
    setTriggerElement?: Dispatch<SetStateAction<boolean>>
}

export default function PlaylistImage(props: PlaylistImageProps) {
    const [hoverRef, isHovered] = useHover<HTMLDivElement>();

    return (
        <div
            className={`flex flex-col ${props.tailwindWidth} ${props.tailwindHeight} z-20 drop-shadow-xl shadow-slate-700 justify-center rounded-xl items-center bg-gray-800`}
            ref={hoverRef}
            onClick={() => props.setTriggerElement && props.setTriggerElement(true)}
        >
            {
                isHovered ?
                    <IoPencilSharp size={props.iconSize} color="gray" className="animate-fastfade cursor-pointer" /> :
                    <IoMdMusicalNotes size={props.iconSize} color="gray" className="animate-fastfade cursor-pointer" />
            }
            {isHovered && <p className="text-sm font-semibold text-center text-gray-300">Edit playlist</p>}
        </div>
    );
}