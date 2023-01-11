import { RootObject } from "../../../API/types";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";

interface Props {
  song: RootObject;
  isPlaying: boolean;
  activeSong: RootObject;
  handlePlayClick: () => void;
  handlePauseClick: () => void;
}

function PlayPause(props: Props) {
  const { song, isPlaying, activeSong, handlePlayClick, handlePauseClick } = props;
  return (
    <>
      {isPlaying && activeSong?.title === song?.title ? (
        <FaPauseCircle
          size={36}
          className={"text-gray-300"}
          onClick={handlePauseClick}
        />
      ) : (
        <FaPlayCircle
          size={36}
          className={"text-gray-300"}
          onClick={handlePlayClick}
        />
      )}
    </>
  );
}

export default PlayPause;
