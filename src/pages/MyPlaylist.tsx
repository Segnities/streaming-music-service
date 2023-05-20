import { useEffect, useState } from "react";

import { useParams } from "react-router";

import BgDivider from "../components/UI/BgDivider/BgDivider";

import { useGetCurrentUser } from "../hooks/useGetCurrentUser";
import getMyPlaylistById from "../helpers/getMyPlaylistById";
import { Playlist } from "../types/playlist";

export default function MyPlaylist() {
    const { playlist_id } = useParams();
    const { firebaseUser } = useGetCurrentUser();

    const [playlist, setPlaylist] = useState<Playlist | undefined>(undefined);

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
                <BgDivider/>
                
                <h1 className="text-white text-3xl font-bold text-underline">
                    {playlist?.title ?? "My Playlist"}
                </h1>
                <p className="text-white text-xl">{playlist?.description ?? "No description"}</p>
            </div>
           
        </div>
    );
}