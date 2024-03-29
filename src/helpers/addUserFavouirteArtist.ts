import { addDoc, CollectionReference, DocumentData } from 'firebase/firestore';

interface AddFavouriteArtistsOption {
    favouriteArtistsCollection: CollectionReference<DocumentData>;
    uid: string | undefined;
    artistData: any;
}

export const addUserFavouriteArtist = async (
    favouriteArtistsCollection: CollectionReference<DocumentData>,
    uid: string | undefined,
    artistData: any
): Promise<void> => {
    try {
        await addDoc(favouriteArtistsCollection, {
            uid,
            artists: [{ artistData }]
        });
    } catch (error) {
        console.log(error);
    }
};