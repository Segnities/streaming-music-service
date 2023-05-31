import { useEffect, useState } from "react";

import BgDivider from "../components/UI/BgDivider/BgDivider";
import { MoreActionsGroup } from "../components/UI/MoreOptions/MoreActionsGroup";

import { useGetCurrentUser } from "../hooks/useGetCurrentUser";

import FindMoreSongs from "../components/FindMoreSongs";
import PlaylistDetailsModal from "../components/PlaylistDetailsModal";
import RecommendedSongs from "../components/RecommendedSongs";
import PlaylistImage from "../components/UI/Img/PlaylistImage";

import { createPlaylist } from "../helpers/createPlaylist";
import { getPlaylistTitle } from "../helpers/getPlaylistTitle";
import { getPlaylists } from "../helpers/getPlaylists";

export default function CreatePlaylist() {
    const { firebaseUser, user } = useGetCurrentUser();
    const [showMore, setShowMore] = useState<boolean>(false);
    const [showRecommended, setShowRecommended] = useState<boolean>(false);

    const [isPlaylistCreated, setIsPlaylistCreated] = useState<boolean>(false);

    const [openEditPlaylist, setOpenEditPlaylist] = useState<boolean>(false);

    const [playlistTitle, setPlaylistTitle] = useState<string>("");
    const [playlistDescription, setPlaylistDescription] = useState<string>("");

    const [createdPlaylistId, setCreatedPlaylistId] = useState<string>("");

    useEffect(() => {
        const managePlaylistCreation = async (): Promise<void> => {
            await getPlaylistTitle(firebaseUser?.id, setPlaylistTitle);

            const userPlaylists = await getPlaylists({ uid: firebaseUser?.id });

            const createdPlaylist = await createPlaylist({
                uid: firebaseUser?.id,
            }).finally(()=> setIsPlaylistCreated(true));
            setCreatedPlaylistId(createdPlaylist?.playlist_id as string);
        };
        if (isPlaylistCreated == false) {
            console.log(isPlaylistCreated);
            managePlaylistCreation();
            setIsPlaylistCreated(true);
        }
    }, [isPlaylistCreated]);


    console.log('Playlist created!');

    return (
        <div className="flex flex-col">
            <PlaylistDetailsModal
                open={openEditPlaylist}
                setOpen={setOpenEditPlaylist}
                title={playlistTitle}
                description={playlistDescription}
                setPlaylistDescription={setPlaylistDescription}
                setPlaylistTitle={setPlaylistTitle}
                playlistId={createdPlaylistId}
            />
            <div className="flex flex-col relative">
                <BgDivider />
                <div className="absolute flex inset-0 sm:inset-5 p-12 items-center gap-4">
                    <PlaylistImage
                        tailwindWidth="w-24 sm:w-48 md:w-52"
                        tailwindHeight="h-16 sm:h-36"
                        tailwindBg="bg-gray-800"
                        iconColor="gray"
                        iconSize={46}
                    />
                    <div
                        className="w-full grid grid-flow-row gap-3"
                    >
                        <p className="text-gray-300 text-xs font-semibold">Playlist</p>
                        <input
                            type="text"
                            name="playlistTitle"
                            id="playlistTitle"
                            onClick={() => setOpenEditPlaylist(true)}
                            value={playlistTitle}
                            onChange={(e) => setPlaylistTitle(e.target.value)}
                            className="w-full font-bold  text-3xl sm:text-[3rem] md:text-[3.5rem] outline-none px-4 rounded-xl bg-transparent text-white curs"
                            placeholder={playlistTitle}
                            required={true}
                            autoComplete="off"
                        />
                        <p className="text-gray-300 text-sm font-semibold">{firebaseUser?.data.username ?? user?.displayName}</p>
                    </div>
                </div>
            </div>

            <MoreActionsGroup
                showMore={showMore}
                setShowMore={setShowMore}
                user={user}
                optionsList={[
                    {
                        key: "change-details",
                        title: "Change details",
                        onClickCallback: () => console.log("Change playlist details!"),
                    },
                    {
                        key: "delete-playlist",
                        title: "Delete playlist",
                        onClickCallback: () => console.log("Delete playlist!"),
                    },
                    {
                        key: "hover-playlist",
                        title: "Hover playlist",
                        onClickCallback: () => console.log("Hover playlist!"),
                    }
                ]}
            />

            <RecommendedSongs
                showRecommended={showRecommended}
                setShowRecommended={setShowRecommended}
            />
            <FindMoreSongs
                showRecommended={showRecommended}
                setShowRecommended={setShowRecommended}
            />
        </div>
    );
}
