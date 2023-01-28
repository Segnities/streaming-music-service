import { Link } from "react-router-dom";

import PlayPause from "./UI/PlayPause";

import { SongRootObject } from "../API/types";
import { useDispatch } from "react-redux";
import { playPause, setActiveSong } from "../store/reducers/player";

import NoImage from "../assets/no_song.jpg";

interface Props {
  song: SongRootObject;
  index: number;
  activeSong: SongRootObject;
  isPlaying: boolean;
  data: [];
  children?: JSX.Element;
}

function SongCard(props: Props) {
  const { song, index, activeSong, isPlaying, data } = props;
  const dispatch = useDispatch();

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, index }));
    dispatch(playPause(true));
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  return (
    <div className="flex flex-col w-[235px] p-4 bg-white/5 bg-opacity bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.title === song.title
              ? "flex bg-black bg-opacity-70"
              : "hidden"
          }`}
        >
          <PlayPause
            song={song}
            activeSong={activeSong}
            isPlaying={isPlaying}
            handlePlayClick={handlePlayClick}
            handlePauseClick={handlePauseClick}
          />
        </div>
        <img
          src={song?.images?.coverart || NoImage}
          alt="song-img"
          className="w-[203px] h-[203px]"
        />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.key}`}>{song.title}</Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link
            to={
              song?.artists
                ? `/artists/${song.artists[0]?.adamid}`
                : "/top-artists"
            }
          >
            {song.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SongCard;
