
import { IoPencilSharp } from "react-icons/io5";
import { IoMdMusicalNotes } from "react-icons/io";

interface DefaultImageProps {
    iconSize: number;
    isHovered: boolean;
}

export default function DefaultPlaylistImage({isHovered, iconSize}:DefaultImageProps) {
    return (
        <>
            {
                isHovered ?
                    <IoPencilSharp size={iconSize} color="gray" className="animate-fastfade cursor-pointer" /> :
                    <IoMdMusicalNotes size={iconSize} color="gray" className="animate-fastfade cursor-pointer" />
            }
        </>
    );
}