import { useFormik } from "formik";
import { useEffect, useState } from "react";

import { collection } from "firebase/firestore";

import { firebaseDatabase } from "../firebase/firebaseConfig";

import BgDivider from "../components/UI/BgDivider/BgDivider";
import { MoreActionsGroup } from "../components/UI/MoreOptions";

import { useGetCurrentUser } from "../hooks/useGetCurrentUser";

import { createPlaylistValidationSchema } from "../utils/validation";

import FindMoreSongs from "../components/FindMoreSongs";
import RecommendedSongs from "../components/RecommendedSongs";
import { getPlaylists } from "../helpers/getPlaylists";
import { createPlaylist } from "../helpers/createPlaylist";
import PlaylistImage from "../components/UI/Img/PlaylistImage";


export default function CreatePlaylist() {
    const [user, firebaseUser] = useGetCurrentUser();
    const [showMore, setShowMore] = useState<boolean>(false);
    const [showRecommended, setShowRecommended] = useState<boolean>(false);

    const [playlistTitle, setPlaylistTitle] = useState<string>("");

    const playlists_collection = collection(firebaseDatabase, "users_playlists");

    const formik = useFormik({
        initialValues: {
            playlistTitle: playlistTitle
        },
        onSubmit: values => {
            console.log("Submit!");
        },
        validationSchema: createPlaylistValidationSchema
    });

    useEffect(() => {
        /* getPlaylists({ playlists_collection, setPlaylistTitle, uid: firebaseUser.id })
            .then(data => {
                createPlaylist({
                    playlists_collection,
                    playlistTitle,
                    uid: firebaseUser.id,
                    snapshotId: data?.snapshotId,
                    isEmpty: data?.isEmpty
                });
            }); */
    }, []);

    return (
        <div className="flex flex-col">
            <div className="flex flex-col relative">
                <BgDivider />
                <div className="absolute flex inset-0 sm:inset-5 p-12 items-center gap-4">
                    <PlaylistImage />
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
                            placeholder={playlistTitle}
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