import { DocumentData, Query, QuerySnapshot, collection, getDocs, query, where } from "firebase/firestore";

import { firebaseDatabase } from "../firebase/firebaseConfig";
import { Dispatch, SetStateAction } from "react";

export async function getPlaylistTitle(
    uid: string | undefined,
    setPlaylistTitle: Dispatch<SetStateAction<string>>

): Promise<void> {
    
    const playlists_collection = collection(firebaseDatabase, "users_playlists");

    const q: Query<DocumentData> = query(playlists_collection, where("uid", "==", uid));
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

    if (querySnapshot.empty) {
        setPlaylistTitle("My playlist #1");
    } else {
        setPlaylistTitle("My playlist #" + querySnapshot.docs[0].data().playlists.length);
    }
}