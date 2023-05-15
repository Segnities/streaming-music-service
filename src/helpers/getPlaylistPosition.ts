import { QuerySnapshot, DocumentData } from "firebase/firestore";

export function getPlaylistPosition(playlistSnapshot: QuerySnapshot<DocumentData>, playlistId:string): number | undefined  {
    const playlists = playlistSnapshot.docs[0].data().playlists;
    for (let i = 0; i < playlists.length; i++) {
        if (playlists[i].playlist_id == playlistId) {
            return i;
        }
    }
}