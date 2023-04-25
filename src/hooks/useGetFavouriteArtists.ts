import { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import { User } from "firebase/auth";


import { Query, where, DocumentData, getDocs, query, collection } from "firebase/firestore";

import { FirebaseUsersSelectorInterface } from "../store/reducers/firebaseUsers";
import { UserAuthSelector } from "../store/reducers/auth";

import { firebaseDatabase } from "../firebase/firebaseConfig";
import { UserDoc } from "../utils/getUsers";


export const useGetFavouriteArtists = async () => {
    const favouriteArtistsCollection = collection(firebaseDatabase, 'users_favourite_artist');

    const [favouriteArtists, setFavouriteArtists] = useState<DocumentData[] | null>(null);

    const { firebaseUsers: users } = useSelector((state: FirebaseUsersSelectorInterface) => state.firebaseUsers);

    const { user: userData } = useSelector((state: UserAuthSelector) => state.userAuth);
    const user: User = JSON.parse(userData as string);


    const [firebaseUser, setFirebaseUser] = useState<UserDoc>(users.find(usr => usr.data.email === user?.email));

    useEffect(() => {
        const favouriteArtistsQuery: Query<DocumentData> = query(favouriteArtistsCollection, where('uid', '==', firebaseUser?.id));
        const favouriteUsersSnapshot = getDocs(favouriteArtistsQuery).then(snapshot => {
            setFavouriteArtists(snapshot.docs.map(doc => doc.data()));
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            //console.log(favouriteArtists[0]?.artists[0]?.artistData?.data[0]);
        });
    }, [firebaseUser?.id, favouriteArtistsCollection]);

    return [favouriteArtists, setFavouriteArtists];

};