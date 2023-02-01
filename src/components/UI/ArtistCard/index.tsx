import { useNavigate } from "react-router-dom";

import { SongRootObject } from "../../../API/types";

import NoImage from "../../../assets/no_artist.jpg";

interface Props {
  track: SongRootObject;
}

function ArtistCard(props: Props) {
  const { track } = props;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-[250px] lg:w-[240px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer" onClick={() => navigate(`/artists/${track?.artists[0]?.adamid}`)}>
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

export default ArtistCard;
