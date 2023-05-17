import { DocumentData, QuerySnapshot, getDocs, query, where, collection } from "firebase/firestore";

import { firebaseDatabase } from "../firebase/firebaseConfig";

interface GetPlaylistOptions {
    uid: string | undefined;
}


export const getPlaylists = async (queryOptions: GetPlaylistOptions): Promise<QuerySnapshot<DocumentData> | undefined> => {
    const { uid } = queryOptions;

    const playlists_collection = collection(firebaseDatabase, "users_playlists");

    console.log("getPlaylist works!");

    try {
        const q = query(playlists_collection, where("uid", "==", uid));
        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

        if (querySnapshot.empty) {
            console.log("No playlists found!");
        } else {
            const playlistsLength = querySnapshot.docs[0].get("playlists").length + 1;

            console.log("Playlists found! There are " + playlistsLength + " playlists");
        }
        return querySnapshot;
    } catch (error) {
        console.log(error);

    }
};
