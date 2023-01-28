import { Link } from "react-router-dom";

import { TrackRootObject } from "../../../API/types";

interface Props {
  songData?: TrackRootObject;
}

function SongDetailsHeader(props: Props) {
  const { songData } = props;
  const songImagePath = songData?.images?.coverart;

  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full h-28 bg-gradient-to-l from-transparent to-black sm:h-52"></div>
      <div className="absolute inset-0 flex items-center">
        <img
          src={songImagePath}
          alt="art"
          className="w-28 sm:w-48 h-28 sm:h-48 rounded-full object-cover border-2 shadow-xl shadow-black"
          onDragStart={(e) => e.preventDefault()}
        />
        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {songData?.title}
          </p>
          <p className="text-base text-gray-400 mt-2">
            {songData?.genres?.primary}
          </p>
        </div>
      </div>
      <div className="w-full h-24 sm:h-24"></div>
    </div>
  );
}

export default SongDetailsHeader;
