import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Controls from "./Controls";
import Track from "./Track";

import { playPause, nextSong, prevSong } from "../../store/reducers/player";

import { SelectorPlayerState } from "../../API/types";
import Seekbar from "./Seekbar";
import Player from "./Player";
import VolumeBar from "./Volume";

function MusicPlayer() {
  const { isActive, isPlaying, activeSong, currentSongs, currentIndex } =
    useSelector((state: SelectorPlayerState) => state.player);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [duration, setDuration] = useState(0);

  const dispatch = useDispatch();

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
    if (currentIndex === 0) {
      dispatch(prevSong(currentSongs.length - 1));
    } else if (shuffle) {
      dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
    } else {
      dispatch(prevSong(currentIndex - 1));
    }
  };

  const handleNextSong = () => {
    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs?.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs?.length)));
    }
  };

  const onInput = (event) => {
    setSeekTime(event.target.value);
  };

  const onLoadedData = (event) => {
    setDuration(event.target.duration);
  };

  const onTimeUpdated = (event) => {
    setAppTime(event.target.currentTime);
  };

  const onVolumeBarChange = (event) => {
    setVolume(event.target.value);
  };

  return (
    <div className="fixed h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
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
          <Seekbar
            value={appTime}
            min={0}
            max={duration}
            onInput={onInput}
            setSeekTime={setSeekTime}
            appTime={appTime}
          />
          <Player
            activeSong={activeSong}
            isPlaying={isPlaying}
            repeat={repeat}
            seekTime={seekTime}
            volume={volume}
            onEnded={handleNextSong}
            onLoadedData={onLoadedData}
            onTimeUpdated={onTimeUpdated}
          />
        </div>
      </div>
      <VolumeBar
        min={0}
        max={1}
        value={volume}
        onChange={onVolumeBarChange}
        setVolume={setVolume}
      />
    </div>
  );
}

export default MusicPlayer;
