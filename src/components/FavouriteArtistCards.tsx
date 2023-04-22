import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper";

import { User } from "firebase/auth";

import { DocumentData, Query, where, getDocs, query, collection } from "firebase/firestore";

import { AiFillCloseCircle } from "react-icons/ai";

import { firebaseDatabase } from "../firebase/firebaseConfig";
import { UserAuthSelector } from "../store/reducers/auth";

import { FirebaseUsersSelectorInterface } from "../store/reducers/firebaseUsers";

import { MainArtistDetails, MainDatum, PurpleAttributes } from "../API/types";
import { UserDoc } from "../utils/getUsers";

import { FavoriteArtistsDoc } from "../pages/Artist";

import 'swiper/css';
import "swiper/css/effect-cards";


interface Props {
    selectedFavouriteArtistInfo: MainDatum | null;
    setSelectedFavouriteArtistInfo: React.Dispatch<React.SetStateAction<MainDatum | null>>
    setOpenRemoveModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FavouriteArtistCards(props: Props) {
    const [favouriteArtists, setFavouriteArtists] = useState<DocumentData[]>([]);

    const { firebaseUsers: users } = useSelector((state: FirebaseUsersSelectorInterface) => state.firebaseUsers);

    const { user: userData } = useSelector((state: UserAuthSelector) => state.userAuth);
    const user: User = JSON.parse(userData as string);


    const [firebaseUser, setFirebaseUser] = useState<UserDoc>(users.find(usr => usr.data.email === user?.email));

    const [favouriteArtistsError, setFavouriteArtistsErrors] = useState<FavoriteArtistsDoc | null>(null);

    const favouriteArtistsCollection = collection(firebaseDatabase, 'users_favourite_artist');


    useEffect(() => {
        const favouriteArtistsQuery: Query<DocumentData> = query(favouriteArtistsCollection, where('uid', '==', firebaseUser?.id));
        const favouriteUsersSnapshot = getDocs(favouriteArtistsQuery).then(snapshot => {
            setFavouriteArtists(snapshot.docs.map(doc => doc.data()));
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            //console.log(favouriteArtists[0]?.artists[0]?.artistData?.data[0]);
        });

    }, [firebaseUser?.id]);


    return (
        <section className="w-full">
            <h3 className="text-2xl text-white my-8">Favourite artists</h3>
            <Swiper effect={"cards"} grabCursor={true} slidesPerView={"auto"} modules={[EffectCards]} className="max-w-[230px] h-[280px] flex flex-col items-center justify-between my-2 ">
                {

                    favouriteArtists[0]?.artists?.map((artist: { artistData: MainArtistDetails }, index) => {
                        const artst_data: MainDatum = artist?.artistData?.data[0];
                        const artst_attributes: PurpleAttributes = artist?.artistData?.data[0]?.attributes;

                        return (
                            <SwiperSlide key={artist?.artistData?.data[0]?.id + index} className="relative flex items-center justify-center rounded-2xl text-xl font-bold text-white bg-red-400 
                            even:bg-gradient-to-r even:from-blue-500 even:to-purple-500 odd:bg-gradient-to-r odd:from-gray-400 even:to-blue-gray-500">

                                <section className="flex flex-col flex-1 items-center gap-4">
                                    <img src={artst_data?.avatar} alt="" className="w-24 h-24 rounded-full cursor-pointer border-2 border-transparent hover:border-white" />
                                    <h4 className="text-xl text-white font-medium cursor-pointer">
                                        {
                                            artst_attributes?.name ?? "Unknown"
                                        }
                                    </h4>
                                    <button className="border-2 text-white border-white px-2 py-1 ease-linear transition-colors hover:duration-75 rounded-lg text-base hover:border-gray-300 hover:text-gray-300" onClick={() => {
                                        props.setOpenRemoveModal(true);
                                        props.setSelectedFavouriteArtistInfo(artst_data ?? null);
                                    }}>
                                        Remove
                                    </button>
                                </section>

                            </SwiperSlide>
                        );
                    })
                }
            </Swiper>
        </section>

    );
}