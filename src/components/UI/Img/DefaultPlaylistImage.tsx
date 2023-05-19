
import { IoPencilSharp } from "react-icons/io5";
import { IoMdMusicalNotes } from "react-icons/io";

interface DefaultImageProps {
    iconSize: number;
    isHovered: boolean;
    preventHoverEffect?: boolean;
    iconColor:string;
}

export default function DefaultPlaylistImage({ isHovered, iconSize, preventHoverEffect, iconColor }: DefaultImageProps) {
    return (
        <>
            {
                isHovered && !preventHoverEffect ?
                    <IoPencilSharp size={iconSize} color={iconColor} className="animate-fastfade cursor-pointer" /> :
                    <IoMdMusicalNotes size={iconSize} color={iconColor} className="animate-fastfade cursor-pointer" />
            }
        </>
    );
}