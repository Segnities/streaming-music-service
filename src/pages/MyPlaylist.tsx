import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import getMyPlaylistById from "../helpers/getMyPlaylistById";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";
import { Playlist } from "../types/playlist";

import BgDivider from "../components/UI/BgDivider/BgDivider";
import SongCard from "../components/SongCard";
import PlaylistImage from "../components/UI/Img/PlaylistImage";
import AbsoluteFlexWrapper from "../components/UI/Wrapper/AbsoluteFlexWrapper";
import BlockSpace from "../components/UI/BlockSpace/BlockSpace";

import { SelectorPlayerState } from "../API/types";
import PlaylistDetailsModal from "../components/PlaylistDetailsModal";
import { MoreActionsGroup } from "../components/UI/MoreOptions/MoreActionsGroup";

export default function MyPlaylist() {
    const { playlist_id } = useParams();
    const { firebaseUser, user } = useGetCurrentUser();

    const [playlist, setPlaylist] = useState<Playlist | undefined>(undefined);

    const [playlistTitle, setPlaylistTitle] = useState<string>("");
    const [playlistDescription, setPlaylistDescription] = useState<string>("");

    const [openEditPlaylistModal, setOpenEditPlaylistModal] = useState<boolean>(false);
    const [showMore, setShowMore] = useState<boolean>(false);

    const { activeSong, isPlaying } = useSelector(
        (state: SelectorPlayerState) => state.player
    );

    useEffect(() => {
        getMyPlaylistById(playlist_id, firebaseUser?.id).then((plst) => {
            setPlaylist(plst);
            setPlaylistTitle(plst?.title ?? "");
            setPlaylistDescription(plst?.description ?? "");

        });
    }, []);

    return (
        <div className="grid grid-flow-row">
            <PlaylistDetailsModal
                open={openEditPlaylistModal}
                setOpen={setOpenEditPlaylistModal}
                description={playlistDescription}
                setPlaylistDescription={setPlaylistDescription}
                playlistId={playlist_id ?? ""}
                title={playlistTitle}
                setPlaylistTitle={setPlaylistTitle}

            />
            <div className="relative w-full flex flex-col">
                <BgDivider />
                <AbsoluteFlexWrapper>
                    <PlaylistImage
                        iconColor="white"
                        iconSize={42}
                        tailwindWidth="w-28 sm:w-48"
                        tailwindHeight="h-28 sm:h-48"
                        tailwindBg="bg-gradient-to-br from-violet-500 to-[#121286] bg-opacity bg-opacity-80 backdrop-blur-md"
                        preventHoverEffect />
                    <div className="ml-5">
                        <h1 className="text-white text-3xl font-bold text-underline" onClick={() => setOpenEditPlaylistModal(true)} role="button">
                            {playlist?.title ?? "My Playlist"}
                        </h1>
                        <p className="text-white text-sm">{playlist?.description ?? "No description"}</p>
                    </div>
                </AbsoluteFlexWrapper>
            </div>
            <div className="my-8">
                <MoreActionsGroup optionsList={[
                    {
                        key: "open-edit-playlist-modal",
                        title: "Edit Playlist",
                        onClickCallback: () => setOpenEditPlaylistModal(true),
                        nested: false
                    }
                ]}
                    showMore={showMore}
                    setShowMore={setShowMore}
                    user={user}

                />
            </div>
            <BlockSpace />
            <div className="flex flex-row flex-wrap gap-5">
                {
                    playlist?.songs.map((song, index) => (
                        <SongCard
                            key={song.key}
                            index={index}
                            activeSong={activeSong}
                            song={song}
                            isPlaying={isPlaying}
                            songs={playlist.songs}
                        />
                    ))
                }
            </div>
        </div>
    );
}