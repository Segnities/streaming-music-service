import { DocumentData, getDocs, where, query, collection, updateDoc, doc } from "firebase/firestore";

import { firebaseDatabase } from "../firebase/firebaseConfig";

export const removeFromFavouriteArtists = async (uid: string, artist_id: string) => {
    const favouriteArtistsCollection = collection(firebaseDatabase, 'users_favourite_artist');
    const q = query(favouriteArtistsCollection, where("uid", "==", uid));
    const f_artists: DocumentData[] = [];

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        const artists = doc.data().artists;

        for (const artist of artists) {
            if (artist.artistData.data[0].id !== artist_id) {
                f_artists.push(artist);
            }
        }
    });

    await updateDoc(doc(firebaseDatabase, 'users_favourite_artist', querySnapshot.docs[0].id), {
        artists: f_artists
    });

    console.log(f_artists);
};
