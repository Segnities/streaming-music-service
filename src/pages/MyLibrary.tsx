import { useEffect, useState } from "react";

import { isUndefined as _isUndefined } from "lodash";

import MyLibraryList from "../components/MyLibraryList";


import { getPlaylists } from "../helpers/getPlaylists";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";
import { Playlist } from "../types/playlist";
import { Link } from "react-router-dom";

export default function MyLibrary() {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const { firebaseUser } = useGetCurrentUser();

    const getUserPlaylistsList = async (): Promise<void> => {
        const playlistsList = await getPlaylists({ uid: firebaseUser?.id });
        setPlaylists(playlistsList?.docs[0]?.data()?.playlists as Playlist[]);
    };

    useEffect(() => {
        getUserPlaylistsList();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center gap-5">
            <h1 className="text-3xl mb-9 text-white font-bold underline-offset-8 underline">My Library</h1>
            {_isUndefined(playlists) ? <p className="text-xl text-white font-semibold">No playlists found. Create one by inviting page <Link className="font-bold text-2xl underline underline-offset-8" to="/create-playlist">Create playlist</Link></p> : <MyLibraryList
                playlists={playlists}
            />}

        </div>
    );
}