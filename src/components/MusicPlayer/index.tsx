import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Controls from "./Controls";
import Track from "./Track";

import { playPause, nextSong, prevSong } from "../../store/reducers/player";

import { SelectorPlayerState } from "../../API/types";

function MusicPlayer() {
  const { isActive, isPlaying, activeSong, currentSongs, currentIndex } =
    useSelector((state: SelectorPlayerState) => state.player);
  const dispatch = useDispatch();
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const handlePlayPause = () => {
    if (!isActive) {
      return;
    }

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  const handlePrevSong = () => {
    dispatch(playPause(false));

    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
    }
  };

  const handleNextSong = () => {
    if (currentIndex === 0) {
      dispatch(prevSong(currentSongs.length - 1));
    } else if (shuffle) {
      dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
    } else {
      dispatch(prevSong(currentIndex - 1));
    }
  };

  return (
    <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
      <div className="relative w-full flex items-center justify-between sm:px-12 px-8">
        <Track
          isActive={isActive}
          isPlaying={isPlaying}
          activeSong={activeSong}
        />
        <div className="flex flex-1 flex-col items-center justify-center">
          <Controls
            isPlaying={isPlaying}
            isActive={isActive}
            repeat={repeat}
            setRepeat={setRepeat}
            shuffle={shuffle}
            setShuffle={setShuffle}
            currentSongs={currentSongs}
            handlePlayPause={handlePlayPause}
            handlePrevSong={handlePrevSong}
            handleNextSong={handleNextSong}
          />
          <div className="seekbar"></div>
          <div className="player"></div>
        </div>
        <div className="volume"></div>
      </div>
    </div>
  );
}

export default MusicPlayer;
