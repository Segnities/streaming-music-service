import { Link } from "react-router-dom";

import PlayPause from "./PlayPause";

import { SongRootObject } from "../API/types";
import { useDispatch } from "react-redux";
import { playPause, setActiveSong } from "../store/reducers/player";

import NoImage from "../assets/no_song.jpg";

interface Props {
  song: SongRootObject;
  index: number;
  activeSong: SongRootObject;
  isPlaying: boolean;
  songs: [] | SongRootObject[];
  children?: JSX.Element;
}

function SongCard(props: Props) {
  const { song, index, activeSong, isPlaying, songs } = props;
  const dispatch = useDispatch();
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data: songs, index }));
    dispatch(playPause(true));
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };


  return (
    <div className="flex flex-col w-[150px] h-[240px] sm:w-[220px] lg:w-[230px] lg:h-[300px] p-4 bg-white/5 bg-opacity bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group bg-transparent z-10">
        <div
          className={`absolute  inset-0 justify-center items-center bg-black/20 rounded-lg bg-opacity-50 group-hover:flex ${activeSong?.title === song.title
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
        <p className="font-semibold text-lg text-white truncate text-center">
          <Link to={`/songs/${song?.key}`}>{song.title}</Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1 text-center">
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