import { useFormik } from "formik";
import { useState } from "react";

import { collection } from "firebase/firestore";

import BgDivider from "../components/UI/BgDivider/BgDivider";
import { MoreActionsGroup } from "../components/UI/MoreOptions";

import { BsFillPencilFill } from "react-icons/bs";
import { IoMdMusicalNotes } from "react-icons/io";


import { useGetCurrentUser } from "../hooks/useGetCurrentUser";
import { useHover } from "../hooks/useHover";

import { createPlaylistValidationSchema } from "../validation";

import FindMoreSongs from "../components/FindMoreSongs";
import { firebaseDatabase } from "../firebase/firebaseConfig";
import RecommendedSongs from "../components/RecommendedSongs";


export default function CreatePlaylist() {
    const [user, firebaseUser] = useGetCurrentUser();
    const [showMore, setShowMore] = useState<boolean>(false);
    const [showRecommended, setShowRecommended] = useState<boolean>(false);

    const [hoverRef, isHovered] = useHover<HTMLDivElement>();

    const playlists_collection = collection(firebaseDatabase, "users_playlists");

    const formik = useFormik({
        initialValues: {
            playlistTitle: ""
        },
        onSubmit: values => {
            console.log("Submit!");
        },
        validationSchema: createPlaylistValidationSchema
    });

    return (
        <div className="flex flex-col">
            <div className="flex flex-col relative">
                <BgDivider />
                <div className="absolute flex inset-0 sm:inset-5 p-12 items-center gap-4">
                    <div
                        className="flex flex-col w-24 h-16 sm:48  sm:h-36 md:w-52 drop-shadow-xl shadow-slate-700 justify-center rounded-xl items-center bg-gray-800"
                        ref={hoverRef}>
                        {
                            isHovered ?
                                <BsFillPencilFill size={48} color="gray" className="animate-fastfade cursor-pointer" /> :
                                <IoMdMusicalNotes size={48} color="gray" className="animate-fastfade cursor-pointer" />
                        }
                    </div>
                    <form
                        onSubmit={formik.handleSubmit}
                        className="w-full grid grid-flow-row gap-3"
                    >
                        <p className="text-gray-300 text-xs font-semibold">Playlist</p>
                        <input
                            type="text"
                            name="playlistTitle"
                            id="playlistTitle"
                            value={formik.values.playlistTitle}
                            onChange={formik.handleChange}
                            className="w-full font-bold  text-3xl sm:text-[3rem] md:text-[3.5rem] outline-none px-4 rounded-xl bg-transparent text-white"
                            placeholder="My Playlist"
                            required={true}
                            autoComplete="off"
                        />
                        <p className="text-gray-300 text-sm font-semibold">{firebaseUser?.data.username ?? user?.displayName}</p>
                    </form>
                </div>
            </div>

            <MoreActionsGroup
                showMore={showMore}
                setShowMore={setShowMore}
                user={user}
                optionsList={[
                    {
                        key: "change-details",
                        title: "Change details",
                        onClickCallback: () => console.log("Change playlist details!"),
                    },
                    {
                        key: "delete-playlist",
                        title: "Delete playlist",
                        onClickCallback: () => console.log("Delete playlist!"),
                    },
                    {
                        key: "hover-playlist",
                        title: "Hover playlist",
                        onClickCallback: () => console.log("Hover playlist!"),
                    }
                ]}
            />

            <RecommendedSongs
                showRecommended={showRecommended}
                setShowRecommended={setShowRecommended}
            />
            <FindMoreSongs
                showRecommended={showRecommended}
                setShowRecommended={setShowRecommended}
            />
        </div>
    );
}