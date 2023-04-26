import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import RelatedSongs from "../components/RelatedSongs";
import Loader from "../components/UI/Loader";

import { setActiveSong, playPause } from "../store/reducers/player";

import {
  useGetRelatedSongsQuery,
  useGetSongDetailsQuery,
  useGetTrackYoutubeVideoQuery,
} from "../API/shazamCore";

import { SelectorPlayerState } from "../API/types";
import Error from "../components/UI/Error";
import YoutubeTrackVideo from "../components/YoutubeTrackVideo";
import BgDivider from "../components/UI/BgDivider/BgDivider";

function Song() {
  const dispatch = useDispatch();
  const { songid } = useParams();

  const { activeSong, isPlaying } = useSelector(
    (state: SelectorPlayerState) => state.player
  );

  const {
    data: songData,
    isFetching: isFetchingSongs,
    error: songsError,
  } = useGetSongDetailsQuery(songid);

  const songImagePath = songData?.images?.coverart;

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

  if (isFetchingSongs || isFetchingRelatedSongs || isYoutubeTrackDataFetching) {
    return <Loader title="Searching songs..." />;
  }

  if (relatedSongsError || songsError) {
    return <Error />;
  }

  return (
    <div className="flex flex-col" data-testid='song-page'>
      <div className="relative w-full flex flex-col">
        <BgDivider />

        <div className="absolute inset-0 flex items-center">
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
        </div>
        <div className="w-full h-24 sm:h-24"></div>
      </div>
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
        youtubeTrackDataError ? <p>Something went wrong with track...</p> : (
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
