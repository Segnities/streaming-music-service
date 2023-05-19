import { collection, query, Query, DocumentData, where, doc, getDocs, updateDoc } from "firebase/firestore";

import { firebaseDatabase } from "../firebase/firebaseConfig";

import { getPlaylistPosition } from "./getPlaylistPosition";

import { SongRootObject } from "../API/types";

export default async function addSongToPlaylist(
    uid: string | undefined,
    playlistId: string,
    song: SongRootObject
): Promise<void> {
    const playlist_collection = collection(firebaseDatabase, "users_playlists");

    try {
        const q: Query<DocumentData> = query(playlist_collection, where("uid", "==", uid));
        const playlistsSnapshot = await getDocs(q);
        const playlistsDocId = playlistsSnapshot.docs[0].id;

        const playlistPosition: number = getPlaylistPosition(playlistsSnapshot, playlistId) ?? -1;
        console.log(playlistPosition);

        const _playlistDoc = doc(firebaseDatabase, "users_playlists", playlistsDocId);
        const _playlists = playlistsSnapshot.docs[0].data().playlists;

        if (_playlists[playlistPosition]?.songs) {
            console.info('Edit to existing songs array!');
            _playlists[playlistPosition].songs = [..._playlists[playlistPosition].songs, song];
        } else {
            console.info('Create new songs array!');
            _playlists[playlistPosition].songs = [song];
        }

        console.info(_playlists)

        await updateDoc(_playlistDoc, {
            playlists: _playlists,
        });
    } catch (error) {
        console.log(error);
    }

}