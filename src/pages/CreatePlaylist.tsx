import { useState, useEffect } from "react";
import { useFormik } from "formik";

import { collection } from "firebase/firestore";

import BgDivider from "../components/UI/BgDivider/BgDivider";
import MoreOptions, { MoreOptionsIcon, MoreActionsList } from "../components/UI/MoreOptions";
import LineDivider from "../components/UI/LineDivider";

import { IoMdMusicalNotes } from "react-icons/io";
import { BsFillPencilFill } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";

import { useGetCurrentUser } from "../hooks/useGetCurrentUser";
import { useHover } from "../hooks/useHover";

import { createPlaylistValidationSchema } from "../validation";
import { SupportSearchbar } from "../components/UI/Searchbar";

import { firebaseDatabase } from "../firebase/firebaseConfig";



export default function CreatePlaylist() {
    const [user, firebaseUser] = useGetCurrentUser();
    const [showMore, setShowMore] = useState<boolean>(false);
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
                    <div className="flex flex-col w-24 h-16 sm:48  sm:h-36 md:w-52 drop-shadow-xl shadow-slate-700 justify-center rounded-xl items-center bg-gray-800" ref={hoverRef}>
                        {
                            isHovered ? <BsFillPencilFill size={48} color="gray" className="animate-fastfade cursor-pointer" /> : <IoMdMusicalNotes size={48} color="gray" className="animate-fastfade cursor-pointer" />
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

            <div className="relative flex flex-col my-5">
                <MoreOptionsIcon
                    user={user}
                    showMore={showMore}
                    setShowMore={setShowMore}
                />
                {
                    user?.uid && (
                        <MoreOptions
                            options={[
                                {
                                    key: "create-playlist",
                                    title: "Create playlist",
                                    onClickCallback: () => console.log("Create Playlist")
                                },
                                {
                                    key: "delete-playlist",
                                    title: "Delete playlist",
                                    onClickCallback: () => console.log("Delete Playlist")
                                }
                            ]}
                            visible={showMore}
                        />)
                }
                <LineDivider />
            </div>
            {
                user?.uid && (
                    <>
                        <MoreActionsList options={[
                            {
                                key: "create-playlist",
                                title: "Create playlist",
                                onClickCallback: () => console.log("Create Playlist")
                            }
                        ]}
                        />
                    </>
                )
            }

            <section className="flex items-center justify-between w-full">
                <div className="flex flex-col gap-6">
                    <h1 className="text-gray-300 text-2xl font-semibold">Let&apos;s pick some tracks for your playlist</h1>
                    <SupportSearchbar
                        bgVariant="gray"
                        placeholder="Search songs..."
                    />
                </div>
                <MdOutlineClose size={34} color="gray" className="cursor-pointer" />
            </section>

        </div>
    );
}