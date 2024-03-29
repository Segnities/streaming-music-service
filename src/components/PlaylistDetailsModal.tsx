import { Dispatch, MouseEvent, MutableRefObject, SetStateAction, useEffect, useRef, useState } from "react";

import { Field, Form, Formik } from "formik";

import * as Yup from "yup";

import PlaylistImage from "./UI/Img/PlaylistImage";
import FitModal from "./UI/Modal/FitModal";

import { useGetCurrentUser } from "../hooks/useGetCurrentUser";

import { updatePlaylist } from "../helpers/updatePlaylist";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseApp } from "../firebase/firebaseConfig";
import { isUndefined } from "lodash";
import { isImageFile } from "../utils/isImageFile";

interface PlaylistDetailsModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    title: string;
    setPlaylistTitle: Dispatch<SetStateAction<string>>;
    description: string;
    setPlaylistDescription: Dispatch<SetStateAction<string>>;
    playlistId: string;
}

const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required").min(1, 'Minimum symbols for playlist title is 1'),
    description: Yup.string(),
});

export default function PlaylistDetailsModal(props: PlaylistDetailsModalProps) {
    const [playlistImage, setPlaylistImage] = useState<File | undefined>(undefined);
    const [triggerFileInput, setTriggerFileInput] = useState<boolean>(false);

    const [playlistImageUrl, setPlaylistImageUrl] = useState<string>("");

    console.log('Playlist id: ', props.playlistId);


    const { firebaseUser } = useGetCurrentUser();
    console.log(firebaseUser?.id);

    const fileInputRef: MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement | null>(null);

    const handleClickFileInput = (e: MouseEvent<HTMLInputElement>): void => {
        setPlaylistImage(e.currentTarget.files![0]);
        setTriggerFileInput(false);
    };

    const updatePlaylistImage = async (): Promise<void> => {
        const storage = getStorage(firebaseApp);
        const playlistPathRef = ref(storage, 'playlists/users-playlists-images/' + playlistImage?.name);

        if (isImageFile(playlistImage?.name as string)) {
            try {
                await uploadBytes(playlistPathRef, playlistImage!);
                console.log('Update playlist image success!');

                const profileImageUrl = await getDownloadURL(playlistPathRef);
                console.log('Profile image url: ', ' profileImageUrl');

                setPlaylistImageUrl(profileImageUrl);

            } catch (err) {
                console.log('Update playlist image error!');
            }
        }

    };

    const handleSubmit = async (values: { title: string; description: string }) => {
        await updatePlaylist(props.playlistId, firebaseUser?.id, values);

        props.setPlaylistTitle(values.title);
        props.setPlaylistDescription(values.description);

        if (triggerFileInput && !isUndefined(playlistImage)) {
            await updatePlaylistImage();
        }

        props.setOpen(false);
    };

    useEffect(() => {
        if (triggerFileInput) {
            fileInputRef.current?.click();
        }
    }, [triggerFileInput]);

    return (
        <FitModal open={props.open} setOpen={props.setOpen} overscroll={false}>
            <div className='h-full flex flex-col justify-between'>
                <h3 className='text-3xl text-black font-bold my-4 text-center sm:text-left'>Change details</h3>
                <Formik
                    initialValues={{
                        title: props.title,
                        description: "",
                    }}
                    onSubmit={(values) => {
                        console.log("Submitting!");
                    }}
                    validationSchema={validationSchema}
                    enableReinitialize={true}
                >
                    {({ values }) => (
                        <Form className="flex flex-col">
                            <div className="w-full items-center md:items-between md:justify-between h-full flex flex-col md:flex-row gap-3">
                                <div className="relative">
                                    <input
                                        type="file"
                                        name="image"
                                        multiple={false}
                                        className="top-5 absolute h-36 opacity-100 w-48"
                                        ref={fileInputRef}
                                        onClick={handleClickFileInput}
                                    />
                                    <PlaylistImage
                                        tailwindWidth="w-48"
                                        tailwindHeight="h-36"
                                        iconColor="gray"
                                        tailwindBg="bg-slate-700"
                                        iconSize={48}
                                        setTriggerElement={setTriggerFileInput}
                                        playlistImage={playlistImageUrl}
                                    />
                                </div>
                                <div className="flex flex-col flex-1 justify-between">
                                    <Field
                                        type="text"
                                        name="title"
                                        className="w-full my-1 p-1 outline outline-1 rounded-sm"
                                        placeholder="Playlist title"
                                        onChange={(e) => {
                                            console.log(e.target.value);

                                            props.setPlaylistTitle(e.target.value)
                                        }}
                                        minLength={1}
                                        maxLength={50}
                                    />
                                    <Field
                                        as="textarea"
                                        name="description"
                                        placeholder="Add description"
                                        className="h-24 resize-none my-2 outline outline-1 p-2 rounded-sm"
                                    />
                                </div>

                            </div>
                            <button onClick={() => handleSubmit(values)} type="submit" className="self-center md:self-end mt-3 z-40 bg-[#1ED760] disabled:bg-[#7c7272] rounded-3xl w-4/6 md:w-1/3 text-2xl p-2 text-black font-medium">
                                Save
                            </button>
                        </Form>
                    )}

                </Formik>
            </div>
        </FitModal>
    );
}