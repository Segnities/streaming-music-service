import { DocumentData, collection, doc, getDocs, setDoc } from "firebase/firestore";

import { firebaseDatabase } from "../firebase/firebaseConfig";
import { SongRootObject } from "../API/types";


export async function addArtistsToFirestore(artists_collection: SongRootObject[]) {

    const artistsRef = collection(firebaseDatabase, "artists");
    const artists: DocumentData[] = [];
    const artistsSnap = await getDocs(artistsRef);

    artistsSnap.forEach((doc) => {
        artists.push({
            id: doc.id,
            data: doc.data()
        });
    });


    if (artists.length > 1 && artists_collection) {
        const uniqueArtists = artists_collection.filter(artist => {
            if (artists.find(art => (art?.data?.artists[0].adamid === artist?.artists![0]?.adamid) === undefined)) {
                return artist;
            }
        });
        uniqueArtists.forEach(artist => {
            setDoc(doc(artistsRef), {
                ...artist
            });
        });
    } else if (artists.length === 0 && artists_collection) {
        artists_collection?.forEach(artist => {
            setDoc(doc(artistsRef), {
                ...artist
            });
        });
    }
}