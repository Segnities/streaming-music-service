import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import SongDetailsHeader from "../components/UI/SongDetailsHeader";
import RelatedSongs from "../components/UI/RelatedSongs";
import Loader from "../components/UI/Loader";

import { setActiveSong, playPause } from "../store/reducers/player";

import {
  useGetRelatedSongsQuery,
  useGetSongDetailsQuery,
} from "../API/shazamCore";

import { SelectorPlayerState } from "../API/types";
import Error from "../components/UI/Error";

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
  const {
    data: relatedSongs,
    isFetching: isFetchingRelatedSongs,
    error: relatedSongsError,
  } = useGetRelatedSongsQuery(songid);

  const handlePlayClick = (song, index) => {
    dispatch(setActiveSong({ song, relatedSongs, index }));
    dispatch(playPause(true));
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  if (isFetchingSongs || isFetchingRelatedSongs) {
    return <Loader title="Searching songs..." />;
  }

  if (relatedSongsError || songsError) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <SongDetailsHeader songData={songData} artistid={""} />
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
      <RelatedSongs
        relatedSongs={relatedSongs}
        isPlaying={isPlaying}
        artistid={""}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
}

export default Song;
