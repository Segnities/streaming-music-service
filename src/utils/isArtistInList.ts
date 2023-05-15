import { DocumentData, CollectionReference, QueryDocumentSnapshot, query, getDocs, where } from "firebase/firestore";


interface ArtistInListOptions {
    favouriteArtistsCollection: CollectionReference<DocumentData>;
    uid:string | undefined;
    artistid:string | undefined;
}

export const isArtistInList = async (options: ArtistInListOptions): Promise<boolean> => {
    //artists[0].artistData.data[0].id
    const {favouriteArtistsCollection, artistid: id, uid} = options;
    try {
        const q = query(favouriteArtistsCollection, where("uid", "==", uid));
        const querySnapshot = await getDocs(q);

        let isInList = false;

        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
                const fArtists: DocumentData = doc.data();

                for (const fArtist of fArtists.artists) {
                    if (fArtist?.artistData?.data[0]?.id === id) {
                        console.log("Artist is in list");
                        isInList = true;
                    }
                }
            });
        }
        return isInList;

    } catch (error) {
        console.log(error);
        return true;
    }
};