import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";

import { nanoid } from "nanoid";

import { firebaseDatabase } from "../firebase/firebaseConfig";

import { isUndefined } from "lodash";

interface CreatePlaylist {
    uid: string | undefined;
    playlistTitle: string;
    snapshotId?: string | undefined;
    isEmpty?: boolean;
}

export const createPlaylist = async (data: CreatePlaylist | undefined): Promise<{ playlist_id: string } | undefined> => {
    const playlists_collection = collection(firebaseDatabase, "users_playlists");

    const playlist_id = nanoid();

    if (data?.isEmpty) {
        try {
            await addDoc(playlists_collection, {
                uid: data?.uid,
                playlists: [
                    {
                        title: data?.playlistTitle,
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
    } else if (isUndefined(data?.snapshotId)) {
        await addDoc(playlists_collection, {
            uid: data?.uid,
            playlists: [
                {
                    title: data?.playlistTitle,
                    playlist_id,
                }
            ],
        });
        return { playlist_id };


    }
    else {
        try {
            const _playlistDocRef = doc(firebaseDatabase, "users_playlists", `${data?.snapshotId}`);
            await updateDoc(_playlistDocRef, {
                playlists: arrayUnion({
                    title: data?.playlistTitle,
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