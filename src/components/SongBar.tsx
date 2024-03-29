import { Link } from "react-router-dom";

import PlayPause from "./PlayPause";

import { SongRootObject } from "../API/types";

import NoImage from "../assets/no_song.jpg";

interface Props {
  key: string;
  song: SongRootObject;
  index: number;
  artistid?: number | string;
  isPlaying: boolean;
  activeSong: SongRootObject;
  handlePauseClick: () => void;
  handlePlayClick: () => void;
}

function SongBar(props: Props) {
  const {
    song,
    index,
    artistid,
    isPlaying,
    activeSong,
    handlePauseClick,
    handlePlayClick,
  } = props;

  const songImage =
    (artistid
      ? song?.attributes?.artwork?.url
          .replace("{w}", "125")
          .replace("{h}", "125")
      : song?.images?.coverart) || NoImage;

  return (
    <div
      className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
        activeSong?.title === song?.title ? "bg-[#4c426e]" : "bg-transparent"
      } py-2 p-4 rounded-lg cursor-pointer mb-2`}
    >
      <h3 className="font-bold text-base text-white mr-3">{index + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-lg"
          src={songImage}
          alt={song?.title}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          {!artistid ? (
            <Link to={`/songs/${song.key}`}>
              <p className="text-xl font-bold text-white">{song?.title}</p>
            </Link>
          ) : (
            <p className="text-xl font-bold text-white">
              {song?.attributes?.name}
            </p>
          )}
          <p className="text-base text-gray-300 mt-1">
            {artistid ? song?.attributes?.albumName : song?.subtitle}
          </p>
        </div>
      </div>
      {!artistid ? (
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
        />
      ) : null}
    </div>
  );
}

export default SongBar;
