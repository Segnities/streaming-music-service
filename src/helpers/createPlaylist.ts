import { addDoc, updateDoc, arrayUnion, CollectionReference, DocumentData, doc } from "firebase/firestore";

import { nanoid } from "nanoid";

import { firebaseDatabase } from "../firebase/firebaseConfig";

interface ManagePlaylistOptions {
    playlists_collection: CollectionReference<DocumentData>;
    uid: string;
    playlistTitle: string;
    snapshotId?: string;
    isEmpty?: boolean;
}

export const createPlaylist = async (qSnapData: ManagePlaylistOptions | undefined): Promise<void> => {
    debugger;
    if (qSnapData?.isEmpty) {
        try {
            await addDoc(qSnapData?.playlists_collection, {
                uid: qSnapData?.uid,
                playlists: [
                    {
                        title: qSnapData?.playlistTitle,
                        playlist_id: nanoid(),
                    }
                ],
            });
        }
        catch (error) {
            console.log("Create error");
        }
    } else {
        try {
            const _playlistDocRef = doc(firebaseDatabase, "users_playlists", `${qSnapData?.snapshotId}`);
            await updateDoc(_playlistDocRef, {
                playlists: arrayUnion({
                    title: qSnapData?.playlistTitle,
                    playlist_id: nanoid(),
                })
            })
        } catch (error) {
            console.log("Update error");
            console.log(error);
        }

    }
}