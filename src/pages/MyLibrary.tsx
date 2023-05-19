import { useEffect, useState } from "react";

import PlaylistCard from "../components/PlaylistCard";
import { getPlaylists } from "../helpers/getPlaylists";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";
import { Playlist } from "../types/playlist";
import MyLibraryList from "../components/MyLibraryList";

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
            <MyLibraryList 
                playlists={playlists} 
            />
        </div>
    );
}