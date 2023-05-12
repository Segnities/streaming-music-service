import { Dispatch, SetStateAction } from "react";
import { query, where, Query, DocumentData, getDocs, QuerySnapshot, CollectionReference } from "firebase/firestore";

export async function getPlaylistTitle(
    uid: string,
    playlists_collection: CollectionReference<DocumentData>,
    setPlaylistTitle: Dispatch<SetStateAction<string>>
): Promise<void> {
    const q: Query<DocumentData> = query(playlists_collection, where("uid", "==", uid));
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

    if (querySnapshot.empty) {
        setPlaylistTitle("My playlist #1");
    } else {
        setPlaylistTitle("My playlist #" + (querySnapshot.size + 1));
    }
};