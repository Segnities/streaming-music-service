import { Link } from "react-router-dom"
import { Playlist } from "../types/playlist"
import PlaylistImage from "./UI/Img/PlaylistImage";

interface PlaylistCardProps {
    playlist: Playlist;
}

export default function PlaylistCard(props: PlaylistCardProps) {
    const { playlist } = props;
    return (
        <div className="flex flex-col w-[150px] h-[240px] sm:w-[220px] lg:w-[230px] lg:h-[300px] p-4 bg-white/5 bg-opacity bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
            <div className="relative w-full h-56 group">
                <div
                    className={`absolute inset-0 justify-center items-center bg-black/20 rounded-lg bg-opacity-50 group-hover:flex`}
                >

                </div>
                <PlaylistImage
                    iconSize={48}
                    tailwindWidth="w-full"
                    tailwindHeight="h-full"
                    preventHoverEffect
                    iconColor="white"
                    tailwindBg="bg-gradient-to-br from-red-500 to-[#121286] bg-opacity bg-opacity-80 backdrop-blur-sm"
                />
            </div>
            <section className="mt-4 flex flex-col">
                <h3 className="font-semibold text-lg text-white truncate text-center">
                    <Link to={`/my-playlist/${playlist.playlist_id}`}>
                        {playlist.title}
                    </Link>
                </h3>
            </section>
        </div>
    )
}