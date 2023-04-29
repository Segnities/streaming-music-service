import { ModalSm } from "./UI/Modal";

import { IoMdAdd } from "react-icons/io";

interface Props {
    openPlaylistModal: boolean;
    setOpenPlaylistModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PlaylistsModal({ openPlaylistModal, setOpenPlaylistModal, ...props }: Props) {
    return (
        <>
            {
                openPlaylistModal && (
                    <ModalSm
                        open={openPlaylistModal}
                        setOpen={setOpenPlaylistModal}
                        overscroll={false}
                    >
                        <form onSubmit={(e) => e.preventDefault()} className="w-full flex flex-row flex-auto justify-between items-center">
                            <input type="text" className="w-full p-3 border-black border-b-2 focus:outline-none" />
                            <IoMdAdd className="cursor-pointer" role="button" size={24} />
                        </form>
                    </ModalSm>
                )
            }
        </>
    );
}