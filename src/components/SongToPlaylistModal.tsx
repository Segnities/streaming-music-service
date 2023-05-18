import { FitModal } from "./UI/Modal";

interface SongToPlaylistModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SongToPlaylistModal({ open, setOpen }: SongToPlaylistModalProps) {
    return (
        <FitModal open={open} setOpen={setOpen} overscroll={true}>
            
        </FitModal>
    );
}