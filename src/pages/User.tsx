import { useState, lazy, Suspense, useEffect } from "react";
import { useNavigate } from "react-router";

import { signOut, getAuth } from "firebase/auth";
import { firebaseApp } from "../firebase/firebaseConfig";

import FavouriteArtistCards from "../components/FavouriteArtistCards";

import BlockSpace from "../components/UI/BlockSpace/BlockSpace";

const EditProfileModal = lazy(() => import("../components/EditProfileModal"));

import Loader from "../components/UI/Loader";

import NoImage from "../assets/no_artist.jpg";
import { setUserSignOut } from "../store/reducers/auth";
import { ConfirmModal } from "../components/UI/Confirm/Confirm";
import { MainDatum } from "../API/types";
import { removeFromFavouriteArtists } from "../helpers/removeFromFavouriteArtists";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";

function User() {
    const auth = getAuth(firebaseApp);
    const navigate = useNavigate();
    const [openEditProfile, setOpenEditProfile] = useState<boolean>(false);
    const { firebaseUser, user, setFirebaseUser } = useGetCurrentUser();

    const [photoURL, setPhotoURL] = useState<string>('');

    const [removeFavouriteArtistModal, setRemoveFavouriteArtistModal] = useState<boolean>(false);

    const [selectedFavouriteArtistInfo, setSelectedFavouriteArtistInfo] = useState<MainDatum | null>(null);

    //[]->artists->[]->artistData->data[0]->
    const userSignOut = () => {
        signOut(auth);
        setUserSignOut();
        navigate("/");
    };

    useEffect(() => {
        try {
            const userProfileImage: string | undefined | null = auth?.currentUser?.photoURL as string;
            setPhotoURL(userProfileImage !== null && !userProfileImage?.includes('undefined') ? userProfileImage : NoImage);
        } catch (error) {
            console.log(error);
        }
    }, [auth.currentUser?.photoURL]);


    return (
        <div className="flex flex-col w-full">
            <ConfirmModal
                isOpen={removeFavouriteArtistModal}
                setIsOpen={setRemoveFavouriteArtistModal}
                confirmCallback={() => {
                    removeFromFavouriteArtists(firebaseUser?.id, selectedFavouriteArtistInfo?.id as string);
                    setRemoveFavouriteArtistModal(false);
                }}
                confirmTitle="Remove favourite artist"
                cancelCallback={() => {
                    setRemoveFavouriteArtistModal(false);
                }}
            />
            {
                openEditProfile && (
                    <Suspense fallback={<Loader title={'Profile is loading...'} />}>
                        <EditProfileModal
                            photoURL={photoURL}
                            firebaseUser={firebaseUser}
                            openEditModal={openEditProfile}
                            setOpenEditModal={setOpenEditProfile}
                            setFirebaseUser={setFirebaseUser}
                            setPhotoURL={setPhotoURL}
                        />
                    </Suspense>
                )
            }
            <h1 className="text-2xl sm:text-3xl text-white font-semibold my-5">Account overview</h1>
            <section className="relative w-full flex flex-col">
                <h2 className="text-xl sm:text-2xl text-white font-medium my-4">Profile</h2>
                <div className="w-full h-28 bg-gradient-to-l from-transparent to-black sm:h-52"></div>
                <section className="absolute inset-0 flex flex-row items-center">
                    <img
                        src={photoURL}
                        alt="art"
                        className="w-28 sm:w-48 h-28 sm:h-48 rounded-full object-cover border-2 shadow-xl shadow-black cursor-pointer"
                        onDragStart={(e) => e.preventDefault()}
                        title="Click to edit profile"
                    />

                    <h3 className="text-3xl sm:text-xl md:text-2xl text-white mb-5 ml-5">
                        {user?.displayName ?? firebaseUser?.data?.username}
                    </h3>
                </section>
                <BlockSpace />
            </section>

            <FavouriteArtistCards
                selectedFavouriteArtistInfo={selectedFavouriteArtistInfo}
                setSelectedFavouriteArtistInfo={setSelectedFavouriteArtistInfo}
                setOpenRemoveModal={setRemoveFavouriteArtistModal}
            />

            <div className="flex flex-col">
                <table className="w-full">
                    <colgroup>
                        <col className="w-1/2" />
                        <col className="w-1/2" />
                    </colgroup>
                    <tbody>
                        <tr className="border-b-2 border-[#dedede]">
                            <td className="py-5 text-gray-500 text-lg">Username</td>
                            <td className="py-5 text-white text-lg">{firebaseUser?.data?.username ?? user?.displayName}</td>
                        </tr>
                        <tr className="border-b-2 border-[#dedede]">
                            <td className="py-5 text-gray-500 text-lg">Email</td>
                            <td className="py-5 text-white text-lg">{firebaseUser?.data?.email ?? user?.email}</td>
                        </tr>
                        <tr className="border-b-2 border-[#dedede]">
                            <td className="py-5 text-gray-500 text-lg">Date of birth</td>
                            <td className="py-5 text-white text-lg">{firebaseUser?.data?.birthday || "Unknown"}</td>
                        </tr>
                        <tr className="border-b-2 border-[#dedede]">
                            <td className="py-5 text-gray-500 text-lg">Gender</td>
                            <td className="py-5 text-white text-lg">{firebaseUser?.data?.gender || "Unknown"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between mt-12">
                <button onClick={() => setOpenEditProfile(true)}
                    className="flex items-center bg-white text-black cursor-pointer rounded-md text-lg border-2 px-6 py-3 z-10 hover:bg-transparent hover:text-white ease-in duration-200">Edit
                    profile
                </button>
                <button
                    className="flex items-center bg-transparent hover:border-gray-400 cursor-pointer rounded-md text-white hover:text-gray-500 text-lg border-2 px-6 py-3 z-10"
                    onClick={userSignOut}>Logout
                </button>
            </div>
        </div>
    );
}

export default User;

