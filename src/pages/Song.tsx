import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import RelatedSongs from "../components/RelatedSongs";
import Loader from "../components/UI/Loader";
import AbsoluteFlexWrapper from "../components/UI/Wrapper/AbsoluteFlexWrapper";

import { CgPlayListAdd } from "react-icons/cg";

import { isUndefined as _isUndefined } from "lodash";


import { playPause, setActiveSong } from "../store/reducers/player";

import {
  useGetRelatedSongsQuery,
  useGetSongDetailsQuery,
  useGetTrackYoutubeVideoQuery,
} from "../API/shazamCore";

import { SelectorPlayerState } from "../API/types";

import { useGetCurrentUser } from "../hooks/useGetCurrentUser";

import { MoreActionsGroup } from "../components/UI/MoreOptions/MoreActionsGroup";

import SongToPlaylistModal from "../components/SongToPlaylistModal";
import BgDivider from "../components/UI/BgDivider/BgDivider";
import BlockSpace from "../components/UI/BlockSpace/BlockSpace";
import Error from "../components/UI/Error";
import YoutubeTrackVideo from "../components/YoutubeTrackVideo";

import { getPlaylists } from "../helpers/getPlaylists";

import { Playlist } from "../types/playlist";

function Song() {
  const dispatch = useDispatch();
  const { songid } = useParams();

  const [showMore, setShowMore] = useState(false);
  const [addToPlaylistModal, setToPlaylistModal] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const [playlistTitle, setPlaylistTitle] = useState("");

  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const { activeSong, isPlaying } = useSelector(
    (state: SelectorPlayerState) => state.player
  );

  const {
    data: songData,
    isFetching: isFetchingSongs,
    error: songsError,
  } = useGetSongDetailsQuery(songid);

  const songImagePath = songData?.images?.coverart;

  const [isPlaylistLoading, setIsPlaylistLoading] = useState<boolean>(true);

  const { user, firebaseUser } = useGetCurrentUser();

  const {
    data: relatedSongs,
    isFetching: isFetchingRelatedSongs,
    error: relatedSongsError,
  } = useGetRelatedSongsQuery(songid);

  const song = { songid, songtitle: songData?.title };

  const { data: youtubeTrackData, isFetching: isYoutubeTrackDataFetching, error: youtubeTrackDataError } = useGetTrackYoutubeVideoQuery(song);

  const handlePlayClick = (song, index) => {
    dispatch(setActiveSong({ song, relatedSongs, index }));
    dispatch(playPause(true));
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const openShowMore = () => {
    setShowMore(true);
  };

  const getUserPlaylistsQuery = async (): Promise<void> => {
    const data = await getPlaylists({ uid: firebaseUser?.id });
    const userPlaylists = data?.docs[0]?.data()?.playlists;

    setPlaylists(userPlaylists);
  };

  useEffect(() => {
    getUserPlaylistsQuery().finally(() => {
      setIsPlaylistLoading(false);
    });
  }, [])

  if (isFetchingSongs || isFetchingRelatedSongs || isYoutubeTrackDataFetching || isPlaylistLoading) {
    return <Loader title="Searching songs..." />;
  }

  if (relatedSongsError || songsError) {
    return <Error />;
  }

  return (
    <div className="flex flex-col" data-testid='song-page'>
      {
        !_isUndefined(playlists) ? null : (
          <SongToPlaylistModal
            open={addToPlaylistModal}
            setOpen={setToPlaylistModal}
            playlists={playlists}
            song={songData}
          />
        )
      }

      <div className="relative w-full flex flex-col">
        <BgDivider />

        {user?.uid && (
          <div className="absolute hidden md:block top-10 right-20 cursor-pointer z-30">
            <button
              className="flex flex-1 flex-row items-center justify-around text-white text-sm border-2 py-2 px-3 border-white rounded-full"
              onClick={() => setToPlaylistModal(true)}
            >
              Add to playlist
              <CgPlayListAdd size={21} className="ml-2" />
            </button>
          </div>
        )}

        <AbsoluteFlexWrapper>
          <img
            src={songImagePath}
            alt="art"
            className="w-28 sm:w-48 h-28 sm:h-48 rounded-full object-cover border-2 shadow-xl shadow-black"
            onDragStart={(e) => e.preventDefault()}
          />
          <div className="ml-5">
            <p className="font-bold sm:text-3xl text-xl text-white">
              {songData?.title}
            </p>
            <p className="text-base text-gray-400 mt-2">
              {songData?.genres?.primary}
            </p>
          </div>
        </AbsoluteFlexWrapper>
        <BlockSpace />
      </div>
      {
        user?.uid && (
          <MoreActionsGroup
            user={user}
            showMore={showMore}
            setShowMore={setShowMore}
            optionsList={[
              {
                key: "add-to-playlist",
                title: "Add to playlist",
                onClickCallback: () => {
                  openShowMore()
                  console.log('Clicked add to playlist');
                },
                nested: true,
              }
            ]}
          />)
      }


      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Song:</h2>
        <div className="mt-5">
          {songData?.sections[1].type === "LYRICS" ? (
            songData?.sections[1].text.map((line, index) => (
              <p key={index} className="text-gray-400 text-base my-1">
                {line}
              </p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">
              Sorry, no lyricks found!
            </p>
          )}
        </div>
      </div>
      {
        youtubeTrackDataError ? <p className="text-white text-xl my-5 text-center">Sorry, youtube track is not found...</p> : (
          <YoutubeTrackVideo youtubeData={youtubeTrackData} />
        )
      }
      {
        relatedSongsError ? <p>Something went wrong with related songs...</p> : (
          <RelatedSongs
            relatedSongs={relatedSongs}
            isPlaying={isPlaying}
            artistid={""}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
          />
        )
      }
    </div>
  );
}

export default Song;
