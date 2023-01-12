import { useSelector } from "react-redux";
import { SelectorPlayerState } from "../../API/types";
import Track from "./Track";

function MusicPlayer() {
    const {isActive, isPlaying, activeSong, currentSongs, currentIndex} = useSelector((state:SelectorPlayerState) => state.player);
    return (
      <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
        <div className="relative w-full flex items-center justify-between sm:px-12 px-8">
          <Track isActive={isActive} isPlaying={isPlaying} activeSong={activeSong}/>
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="controls"></div>
            <div className="seekbar"></div>
            <div className="player"></div>
          </div>
          <div className="volume"></div>
        </div>
      </div>
    );
}

export default MusicPlayer;