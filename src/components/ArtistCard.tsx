import React from "react";
import { useNavigate } from "react-router-dom";

import { SongArtist, SongRootObject } from "../API/types";

import NoImage from "../assets/no_artist.jpg";

interface Props {
  track: SongRootObject;
}

function ArtistCard(props: Props) {
  const { track } = props;
  const navigate = useNavigate();
  const level = 0;
  const artists: SongArtist[] | undefined = track?.artists;
  const artist: SongArtist | undefined = artists!.length > 0 ? artists![level] : undefined;
  const adamid: string | undefined = artist?.adamid;


  return (
    <div className="flex flex-col w-[250px] lg:w-[240px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer" onClick={() => navigate(`/artists/${adamid}`)}>
      <img
        src={track?.images?.coverart || NoImage}
        alt="artist"
        className="w-full h-56 rounded-lg"
      />
      <p className="mt-4 font-semibold text-lg text-center text-white truncate">
        {track?.subtitle}
      </p>
    </div>
  );
}

export default React.memo(ArtistCard);
