import { getDocs, CollectionReference, DocumentData } from "firebase/firestore";

import { updateUserFavouriteArtists } from "./updateUserFavouriteArtists";
import { addUserFavouriteArtist } from "./addUserFavouirteArtist";

export const manageFavouriteArtists = async (
    favouriteArtistsCollection: CollectionReference<DocumentData>,
    artistData: any,
    uid: string,
    artistid: string | undefined
): Promise<void> => {
    const querySnapshot = await getDocs(favouriteArtistsCollection);

    let isUserHaveFavouriteArtist = false;

    console.log("Manage favourite artists...");

    querySnapshot.forEach((doc) => {
        if (doc.data().uid === uid) {
            isUserHaveFavouriteArtist = true;
        }
    });

    if (isUserHaveFavouriteArtist) {
        console.log('Update favourite artists');
        await updateUserFavouriteArtists(favouriteArtistsCollection, uid, artistData, artistid);
    } else {
        console.log('Add favourite artists');
        await addUserFavouriteArtist(favouriteArtistsCollection, uid, artistData);
    }
};
