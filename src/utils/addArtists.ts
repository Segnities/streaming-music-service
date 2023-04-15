import { DocumentData, collection, doc, getDocs, setDoc } from "firebase/firestore";

import { firebaseDatabase } from "../firebase/firebaseConfig";
import { SongRootObject } from "../API/types";


export async function addArtists(artists_collection: SongRootObject[]) {

    const artistsRef = collection(firebaseDatabase, "artists");
    const artists: DocumentData[] = [];
    const artistsSnap = await getDocs(artistsRef);

    artistsSnap.forEach((doc) => {
        artists.push({
            id: doc.id,
            data: doc.data()
        });
    });

    if (artists_collection instanceof Array) {
        let uniqueArtists: DocumentData[] = [];
        if (artists.length > 0) {
            uniqueArtists = artists.filter(art => {
                if (artists_collection.find(ar => ar?.artists![0]?.adamid === art?.data?.artists[0]?.adamid) === undefined) {
                    return art;
                }
            });
            uniqueArtists.forEach(artist => {
                setDoc(doc(artistsRef), {
                    ...artist
                });
            });
        } else {
            artists_collection.forEach(artist => {
                setDoc(doc(artistsRef), {
                    ...artist
                });
            });
        }
    }
}