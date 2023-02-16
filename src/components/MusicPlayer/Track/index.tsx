import { SongRootObject } from "../../../API/types";

interface Props {
  isActive: boolean;
  isPlaying: boolean;
  activeSong: SongRootObject;
}

function Track(props: Props) {
  const { isActive, isPlaying, activeSong } = props;
  return (
    <div className="flex flex-1 md:flex-initial  items-center justify-start">
      <div
        className={`w-16 h-16 mr-4 hidden sm:block ${isPlaying && isActive ? "animate-[spin_3s_linear_infinite]" : ""
          }`}
      >
        <img
          src={activeSong?.images?.coverart}
          alt="art"
          className="rounded-full"
        />
      </div>
      <div className="w-[50%]">
        <p className="truncate text-white font-bold text-lg">
          {activeSong?.title ? activeSong?.title : "No active song"}
        </p>
        <p className="truncate text-gray-300">
          {activeSong?.subtitle ? activeSong?.subtitle : "No active song"}
        </p>
      </div>
    </div>
  );
}

export default Track;
