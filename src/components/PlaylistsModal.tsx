import { useState, useEffect } from "react";

import { useFormik } from "formik";

import { createPlaylistValidationSchema } from "../utils/validation";

import { FitModal } from "./UI/Modal";

import { IoMdAdd } from "react-icons/io";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";
import { DocumentData, collection, getDocs, query, where } from "firebase/firestore";
import { firebaseDatabase } from "../firebase/firebaseConfig";

interface Props {
    openPlaylistModal: boolean;
    setOpenPlaylistModal: React.Dispatch<React.SetStateAction<boolean>>;
    managePlayslistsSongs: (playlist_title: string, playlist_id: string) => Promise<void>;
}

export default function PlaylistsModal({ openPlaylistModal, setOpenPlaylistModal, managePlayslistsSongs, ...props }: Props) {
    const [playlistsData, setPlaylistsData] = useState<DocumentData[] | null>(null);
    const { firebaseUser } = useGetCurrentUser();

    const [selectedPlaylistId, setSelectedPlaylistId] = useState<string>("");

    const playlists_collection = collection(firebaseDatabase, "users_playlists");


    const formik = useFormik({
        initialValues: {
            playlistTitle: ""
        },
        onSubmit: values => {
            managePlayslistsSongs(values.playlistTitle, selectedPlaylistId);
        },
        validationSchema: createPlaylistValidationSchema
    });

    const getPlaylists = async () => {
        const q = query(playlists_collection, where("uid", "==", firebaseUser.id));
        const querySnapshot = await getDocs(q);
        const _playlists: DocumentData[] = [];

        querySnapshot.forEach((doc) => {
            _playlists.push(doc.data());
        });
        setPlaylistsData(_playlists);
    };

    useEffect(() => {
        getPlaylists();
    }, [playlists_collection]);


    return (
        <>
            {

                openPlaylistModal && (
                    <FitModal
                        open={openPlaylistModal}
                        setOpen={setOpenPlaylistModal}
                        overscroll={false}
                    >
                        <ul className="flex flex-col gap-2">
                            {
                                playlistsData![0]?.playlists && playlistsData![0]?.playlists.map((playlist) => (
                                    <li key={playlist?.playlist_id} className="flex flex-row items-center justify-between gap-2 p-2 rounded-md  transition-colors duration-100 ease-linear hover:bg-gray-300">
                                        <p className="text-xl">{playlist?.title}</p>
                                        <IoMdAdd size={21} role="button" onClick={() => {
                                            managePlayslistsSongs(playlist?.title, playlist?.playlist_id);
                                        }} className="cursor-pointer transition-colors duration-75 ease-linear hover:bg-gray-300 p-2 rounded-full w-11 h-11" title="Add song to playlist" />
                                    </li>
                                ))
                            }
                        </ul>
                        <form onSubmit={formik.handleSubmit} className="w-full flex flex-row flex-auto justify-between items-center">
                            <input type="text" id="playlistTitle" name="playlistTitle" value={formik.values.playlistTitle} onChange={formik.handleChange} className="w-full p-3 border-black border-b-2 focus:outline-none text-gray-600 text-xl" title={formik.errors.playlistTitle ?? "Enter playlist title"} />

                            <IoMdAdd
                                className="cursor-pointer transition-colors duration-75 ease-linear hover:bg-gray-300 p-2 rounded-full w-11 h-11"
                                role="button"
                                type="submit"
                                size={24}
                                onClick={() => formik.handleSubmit()}
                            />
                        </form>
                    </FitModal>
                )
            }
        </>
    );
}