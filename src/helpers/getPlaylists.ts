import { query, where, DocumentData, getDocs, QuerySnapshot, CollectionReference } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";

interface GetPlaylistOptions {
    playlists_collection: CollectionReference<DocumentData>;
    uid: string | undefined;
    setPlaylistTitle: Dispatch<SetStateAction<string>>;
}


export const getPlaylists = async (queryOptions: GetPlaylistOptions): Promise<{ snapshotId: string, isEmpty: boolean } | undefined> => {
    const { playlists_collection, uid, setPlaylistTitle } = queryOptions;

    console.log("getPlaylist works!");

    try {
        const q = query(playlists_collection, where("uid", "==", uid));
        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

        if (querySnapshot.empty) {
            console.log("No playlists found!");
            setPlaylistTitle("My playlist #1");
        } else {
            const playlistsLength = querySnapshot.docs[0].get("playlists").length + 1;

            setPlaylistTitle("My playlist #" + playlistsLength);
            console.log("Playlists found! There are " + playlistsLength + " playlists");
        }
        return { snapshotId: querySnapshot?.docs[0]?.id, isEmpty: querySnapshot.empty };
    } catch (error) {
        console.log(error);

    }
};
