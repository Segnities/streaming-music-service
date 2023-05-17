import { Dispatch, SetStateAction } from "react";

import DefaultPlaylistImage from "./DefaultPlaylistImage";

import { useHover } from "../../../hooks/useHover";


interface PlaylistImageProps {
    tailwindWidth: string;
    tailwindHeight: string;
    iconSize: number;
    setTriggerElement?: Dispatch<SetStateAction<boolean>>;
    playlistImage?: string;
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
                props.playlistImage ? <img src={props.playlistImage} alt="Playlist image" /> : (
                    <DefaultPlaylistImage
                        isHovered={isHovered}
                        iconSize={props.iconSize}
                    />
                )
            }
            {isHovered && (
                <p className="text-sm font-semibold text-center text-gray-300">Edit playlist</p>
            )}
        </div>
    );
}