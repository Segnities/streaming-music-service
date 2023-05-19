import { useState } from "react";

import FitModal from "./UI/Modal/FitModal";

import { Playlist } from "../pages/Song";

import { BiCheckDouble } from "react-icons/bi";

import { SongRootObject } from "../API/types";

import addSongToPlaylist from "../helpers/addSongToPlaylist";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";

interface SongToPlaylistModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    playlists: Playlist[];
    song: SongRootObject;
}

interface SelectedPlaylist extends Playlist {
    selected: boolean;
}


const SongToPlaylistModalHeader = (
    <div className="my-2">
        <h3 className="text-2xl font-semibold text-black my-3">Choose playlist to add song to:</h3>
    </div>
);


export default function SongToPlaylistModal({ open, setOpen, playlists, song }: SongToPlaylistModalProps) {
    const [selectedPlaylists, setSelectedPlaylists] = useState<SelectedPlaylist[]>(playlists.map((playlist: Playlist) => ({ ...playlist, selected: false })));

    const { firebaseUser } = useGetCurrentUser();

    const [selectedPlaylistId, setSelectedPlaylistId] = useState<string>("");

    const choosePlaylist = (playlist: SelectedPlaylist): void => {
        setSelectedPlaylists([...selectedPlaylists].map((p: SelectedPlaylist) => {
            if (p.playlist_id === playlist.playlist_id) {
                setSelectedPlaylistId(playlist.playlist_id);
                return { ...p, selected: !p.selected };
            } else {
                return { ...p, selected: false };
            }
        }));
    };

    const handleAddToPlaylist = async (): Promise<void> => {
        await addSongToPlaylist(firebaseUser?.id, selectedPlaylistId, song);
        setOpen(false);
    }


    return (
        <FitModal
            open={open}
            setOpen={setOpen}
            overscroll={true}
            header={SongToPlaylistModalHeader}
        >
            <div className="flex flex-col gap-4 my-6">
                {
                    selectedPlaylists?.map((playlist: SelectedPlaylist) => (
                        <div
                            key={playlist?.playlist_id}
                            className={"flex font-semibold justify-between items-center p-4 rounded-lg cursor-pointer" + ` ${playlist.selected ? "animate-slidedown text-[#1ED760] bg-[#a2f6bf]" : "hover:bg-gray-100"}`}
                            onClick={() => {
                                choosePlaylist(playlist);
                            }}
                        >
                            {playlist?.title}
                            {playlist?.selected && <BiCheckDouble size={28} className="text-[#1ED760]" />}
                        </div>
                    ))
                }
                <button
                    className="z-40 my-2 bg-[#1ED760] disabled:bg-[#7c7272] rounded-3xl text-lg p-2 text-black font-medium"
                    onClick={handleAddToPlaylist}
                >
                    Add to playlist
                </button>
            </div>
        </FitModal>
    );
}