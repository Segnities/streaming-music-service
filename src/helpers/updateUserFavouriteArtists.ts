import { query, where, arrayUnion, updateDoc, doc, getDocs, CollectionReference, DocumentData } from "firebase/firestore";

import { firebaseDatabase } from "../firebase/firebaseConfig";

import { isArtistInList } from "../utils/isArtistInList";


export const updateUserFavouriteArtists = async (
    favouriteArtistsCollection: CollectionReference<DocumentData>,
    uid:string,
    artistData: any,
    artistid: string | undefined
): Promise<void> => {
    try {
        const q = query(favouriteArtistsCollection, where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        const fvListRef = doc(firebaseDatabase, "users_favourite_artist", querySnapshot.docs[0].id);

        const isInList: boolean = await isArtistInList({
            favouriteArtistsCollection,
            artistid,
            uid
        });

        if (!querySnapshot.empty && isInList === false) {
            console.log("Starting update...");

            await updateDoc(fvListRef, {
                artists: arrayUnion({ artistData })
            });
        }
    }
    catch (error) {
        console.log(error);
    } finally {
        console.log('Succesufully updated!');

    }
};
