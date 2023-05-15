import { Dispatch, SetStateAction } from "react";
import { doc, query, collection, DocumentData, getDocs, Query, updateDoc, where } from "firebase/firestore";

import { firebaseDatabase } from "../firebase/firebaseConfig";

import { getPlaylistPosition } from "./getPlaylistPosition";

export async function updatePlaylist(
    playlistId: string,
    uid: string | undefined,
    setOpen: Dispatch<SetStateAction<boolean>>,
    values: {
        title: string,
        description: string,
    }
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

        _playlists[playlistPosition!].title = values.title;
        _playlists[playlistPosition!].description = values.description;

        await updateDoc(_playlistDoc, {
            playlists: _playlists,
        });
        setOpen(false);
    } catch (error) {
        console.log(error);
    }

}