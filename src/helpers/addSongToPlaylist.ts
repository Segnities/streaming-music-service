import {collection, query , Query, DocumentData, where, doc, getDocs, updateDoc} from "firebase/firestore";

import { firebaseDatabase } from "../firebase/firebaseConfig";

import { getPlaylistPosition } from "./getPlaylistPosition";

export default async function addSongToPlaylist(
    uid:string,
    playlistId:string,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
    ):Promise<void> {
    const playlist_collection = collection(firebaseDatabase, "users_playlists");

    try {
        const q: Query<DocumentData> = query(playlist_collection, where("uid", "==", uid));
        const playlistsSnapshot = await getDocs(q);
        const playlistsDocId = playlistsSnapshot.docs[0].id;

        const playlistPosition: number | undefined = getPlaylistPosition(playlistsSnapshot, playlistId);
        console.log(playlistPosition);

        const _playlistDoc = doc(firebaseDatabase, "users_playlists", playlistsDocId);
        const _playlists = playlistsSnapshot.docs[0].data().playlists;

        _playlists.songs = [..._playlists.songs, playlistPosition]

        await updateDoc(_playlistDoc, {
            playlists: _playlists,
        });
    } catch (error) {
        console.log(error);
    }

    setOpen(false);
}