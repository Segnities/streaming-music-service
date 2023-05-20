import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import BgDivider from "../components/UI/BgDivider/BgDivider";

import { useGetCurrentUser } from "../hooks/useGetCurrentUser";
import getMyPlaylistById from "../helpers/getMyPlaylistById";
import { Playlist } from "../types/playlist";

import AbsoluteFlexWrapper from "../components/UI/Wrapper/AbsoluteFlexWrapper";
import PlaylistImage from "../components/UI/Img/PlaylistImage";
import SongCard from "../components/SongCard";

import { SelectorPlayerState } from "../API/types";
import BlockSpace from "../components/UI/BlockSpace/BlockSpace";

export default function MyPlaylist() {
    const { playlist_id } = useParams();
    const { firebaseUser } = useGetCurrentUser();

    const dispatch = useDispatch();

    const [playlist, setPlaylist] = useState<Playlist | undefined>(undefined);

    const { activeSong, isPlaying, genreListId } = useSelector(
        (state: SelectorPlayerState) => state.player
    );

    useEffect(() => {
        getMyPlaylistById(playlist_id, firebaseUser?.id).then((plst) => {
            console.log(plst);
            setPlaylist(plst);
        });
    }, []);

    console.log(playlist_id);

    return (
        <div className="grid grid-flow-row">
            <div className="relative w-full flex flex-col">
                <BgDivider />
                <AbsoluteFlexWrapper>
                    <PlaylistImage
                        iconColor="white"
                        iconSize={42}
                        tailwindWidth="w-28 sm:w-48"
                        tailwindHeight="h-28 sm:h-48"
                        tailwindBg="bg-gradient-to-br from-violet-500 to-[#121286] bg-opacity bg-opacity-80 backdrop-blur-md"
                        preventHoverEffect />
                    <div className="ml-5">
                        <h1 className="text-white text-3xl font-bold text-underline">
                            {playlist?.title ?? "My Playlist"}
                        </h1>
                        <p className="text-white text-sm">{playlist?.description ?? "No description"}</p>
                    </div>
                </AbsoluteFlexWrapper>
            </div>
            <BlockSpace />
            <div className="flex flex-row flex-wrap gap-5">
                {
                    playlist?.songs.map((song, index) => (
                        <SongCard
                            key={song.key}
                            index={index}
                            activeSong={activeSong}
                            song={song}
                            isPlaying={isPlaying}
                            songs={playlist.songs}
                        />
                    ))
                }
            </div>
        </div>
    );
}