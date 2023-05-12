import { useState, useRef, useEffect, MutableRefObject, MouseEvent } from "react";

import { Dispatch, SetStateAction } from "react";

import { FitModal } from "./UI/Modal";
import PlaylistImage from "./UI/Img/PlaylistImage";

interface PlaylistDetailsModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    title: string;
    setPlaylistTitle: Dispatch<SetStateAction<string>>;
}

export default function PlaylistDetailsModal(props: PlaylistDetailsModalProps) {
    const [file, setFile] = useState<File | string>("");
    const [triggerFileInput, setTriggerFileInput] = useState<boolean>(false);

    const fileInputRef: MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement | null>(null);

    const handleClickFileInput = (e: MouseEvent<HTMLInputElement>): void => {
        setFile(e.currentTarget.files![0]);
        setTriggerFileInput(false);
    };

    //Fix problems in code in this file

    useEffect(() => {
        if (triggerFileInput) {
            fileInputRef.current?.click();
        }
    }, [triggerFileInput]);

    return (
        <FitModal open={props.open} setOpen={props.setOpen} overscroll={false}>
            <div className='h-full flex flex-col justify-between'>
                <h3 className='text-3xl text-black font-bold my-4 text-center sm:text-left'>Change details</h3>
                <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
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
                                iconSize={48}
                                setTriggerElement={setTriggerFileInput}
                            />
                        </div>
                        <div className="flex flex-col flex-1 justify-between">
                            <input
                                type="text"
                                name="title"
                                className="w-full my-1 p-1 outline outline-1 rounded-sm"
                                value={props.title}
                                onChange={(e) => props.setPlaylistTitle(e.target.value)} placeholder="Add title"
                                minLength={1}
                                maxLength={50}
                            />
                            <textarea
                                name="description"
                                placeholder="Add description"
                                className="h-24 resize-none my-2 outline outline-1 p-2 rounded-sm"
                            />
                        </div>

                    </div>
                    <button className="self-center md:self-end mt-3 z-40 bg-[#1ED760] disabled:bg-[#7c7272] rounded-3xl w-4/6 md:w-1/3 text-2xl p-2 text-black font-medium">
                        Save
                    </button>
                </form>
            </div>
        </FitModal>
    );
}