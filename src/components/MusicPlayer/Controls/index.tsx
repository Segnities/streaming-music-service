import { MdSkipNext, MdSkipPrevious } from "react-icons/md";


import {
  BsArrowRepeat,
  BsFillPauseFill,
  BsFillPlayFill,
  BsShuffle,
} from "react-icons/bs";

interface ControlProps {
  isPlaying: boolean;
  isActive: boolean;
  repeat: boolean;
  setRepeat: React.Dispatch<React.SetStateAction<boolean>>;
  shuffle: boolean;
  setShuffle: React.Dispatch<React.SetStateAction<boolean>>;
  currentSongs: [];
  handlePlayPause: () => void;
  handlePrevSong: () => void;
  handleNextSong: () => void;
}

function Controls(props: ControlProps) {
  const {
    isPlaying,
    repeat,
    setRepeat,
    shuffle,
    setShuffle,
    currentSongs,
    handlePlayPause,
    handlePrevSong,
    handleNextSong,
  } = props;
  return (
    <div className="w-full flex items-center justify-around md:w-36 lg:w-52 2xl:w-80">
      <BsArrowRepeat
        size={20}
        color={repeat ? "red" : "white"}
        onClick={() => setRepeat((prev) => !prev)}
        className="hidden sm:block cursor-pointer"
      />
      {currentSongs?.length && (
        <MdSkipPrevious
          size={30}
          color="#FFF"
          className="cursor-pointer"
          onClick={handlePrevSong}
        />
      )}
      {isPlaying ? (
        <BsFillPauseFill
          size={45}
          color="#FFF"
          onClick={handlePlayPause}
          className="cursor-pointer"
        />
      ) : (
        <BsFillPlayFill
          size={45}
          color="#FFF"
          onClick={handlePlayPause}
          className="cursor-pointer"
        />
      )}
      {currentSongs?.length && (
        <MdSkipNext
          size={30}
          color="#FFF"
          className="cursor-pointer"
          onClick={handleNextSong}
        />
      )}
      <BsShuffle
        size={20}
        color={shuffle ? "red" : "white"}
        onClick={() => setShuffle((prev) => !prev)}
        className="hidden sm:block cursor-pointer"
      />
    </div>
  );
}

export default Controls;
