import { Dispatch, SetStateAction } from "react";
import { FitModal } from "./UI/Modal";

interface SongToPlaylistModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>; 
}

export default function SongToPlaylistModal(props: SongToPlaylistModalProps) {
    const { open, setOpen } = props;


    return (
        <FitModal open={open} setOpen={setOpen} overscroll={true}>

        </FitModal>
    );
}