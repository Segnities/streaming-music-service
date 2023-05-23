import { addDoc, arrayUnion, collection, doc, updateDoc, where, getDocs, Query, DocumentData, QuerySnapshot, query } from "firebase/firestore";

import { nanoid } from "nanoid";

import { firebaseDatabase } from "../firebase/firebaseConfig";

import { isUndefined } from "lodash";

import { getPlaylists } from "./getPlaylists";

interface CreatePlaylist {
    uid: string | undefined;
}

interface CreatedPlaylist {
   playlist_id: string
}

export const createPlaylist = async (data: CreatePlaylist | undefined): Promise<CreatedPlaylist | undefined> => {
    const playlists_collection = collection(firebaseDatabase, "users_playlists");

    const q: Query<DocumentData> = query(playlists_collection, where("uid", "==", data?.uid));
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

    const userPlaylists = await getPlaylists({ uid: data?.uid });
    const userPlaylistsId = userPlaylists?.docs[0]?.id;

    let playlistTitle:string = "";

    if (querySnapshot?.empty) {
        playlistTitle = "My Playlist #1";
    } else {
        playlistTitle = "My playlist #" + querySnapshot.docs[0].data().playlists.length;
    }

    const playlist_id = nanoid();

    if (userPlaylists?.empty || isUndefined(userPlaylistsId)) {
        try {
            await addDoc(playlists_collection, {
                uid: data?.uid,
                playlists: [
                    {
                        title: playlistTitle,
                        playlist_id,
                    }
                ],
            });
            return { playlist_id };
        }
        catch (error) {
            console.log("Create error");
            console.log(error);

        }
    } else {
        debugger;
        console.log('List exists and updating...');
        try {
            const _playlistDocRef = doc(firebaseDatabase, "users_playlists", `${userPlaylistsId}`);
            await updateDoc(_playlistDocRef, {
                playlists: arrayUnion({
                    title: playlistTitle,
                    playlist_id,
                })
            });
            return { playlist_id };
        } catch (error) {
            console.log("Update error");
            console.log(error);
        }

    }
}