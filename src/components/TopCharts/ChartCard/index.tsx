import { Link } from "react-router-dom";

import PlayPause from "../../PlayPause";

import { SongRootObject } from "../../../API/types";

interface Props {
  song: SongRootObject;
  index: number;
  isPlaying: boolean;
  activeSong: SongRootObject;
  handlePauseClick: () => void;
  handlePlayClick: (song: SongRootObject, index: number) => void;
}

function TopChartCard(props: Props) {
  const {
    song,
    index,
    isPlaying,
    activeSong,
    handlePauseClick,
    handlePlayClick,
  } = props;
  return (
    <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
      <p className="font-bold text-base text-white mr-3">{index + 1}.</p>
      <div className="flex flex-1 flex-wrap flex-row justify-between items-center">
        <img
          src={song?.images?.coverart}
          alt={`${song?.title}`}
          className="w-[50px] h-[50px] rounded-lg"
        />
        <div className="flex flex-1 flex-col justify-center mx-3">
          <Link to={`songs/${song?.key}`}>
            <h3 className="text-base font-bold text-white">{song?.title}</h3>
          </Link>
          <Link to={`artists/${song?.artists![0].adamid}`}>
            <h3 className="text-sm text-gray-400 mt-1 hover:underline">
              {song?.subtitle}
            </h3>
          </Link>
        </div>
      </div>
      <PlayPause
        song={song}
        activeSong={activeSong}
        isPlaying={isPlaying}
        handlePlayClick={() => handlePlayClick(song, index)}
        handlePauseClick={handlePauseClick}
      />
    </div>
  );
}

export default TopChartCard;
