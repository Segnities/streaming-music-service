import { useState, useEffect } from "react";

import { useFormik } from "formik";

import { createPlaylistValidationSchema } from "../validation";

import { ModalSm } from "./UI/Modal";

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
    const [playlists, setPlaylists] = useState<DocumentData[] | null>(null);
    const [user, firebaseUser] = useGetCurrentUser();

    const playlists_collection = collection(firebaseDatabase, "users_playlists");

    const formik = useFormik({
        initialValues: {
            playlistTitle: ""
        },
        onSubmit: values => {
            managePlayslistsSongs(values.playlistTitle, "");
        },
        validationSchema: createPlaylistValidationSchema
    });

    const getPlaylists = async () => {
        const q = query(playlists_collection, where("uid", "==", firebaseUser.id));
        const querySnapshot = await getDocs(q);
        const _playlists: DocumentData[] = [];

        querySnapshot.forEach((doc) => {
            _playlists.push(doc.data().playlists);
        });

        setPlaylists(_playlists);
    };

    useEffect(() => {
        getPlaylists();
    }, [playlists_collection]);


    return (
        <>
            {

                openPlaylistModal && (
                    <ModalSm
                        open={openPlaylistModal}
                        setOpen={setOpenPlaylistModal}
                        overscroll={false}
                    >

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
                    </ModalSm>
                )
            }
        </>
    );
}