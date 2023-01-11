import { useSelector } from "react-redux";

import SongCard from "../components/SongCard";
import Loader from "../components/UI/Loader";
import Error from "../components/UI/Error";

import { genres } from "../data/genres";

import { useGetTopChartsQuery } from "../API/shazamCore";
import { SelectorPlayerState } from "../API/types";

type Genre = {
  title: string;
  value: string;
};

function Discover() {
  const { data, isFetching, error } = useGetTopChartsQuery(null);
  const { activeSong, isPlaying } = useSelector(
    (state: SelectorPlayerState) => state.player
  );

  if (isFetching) {
    return <Loader title="Loading songs..." />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-col justify-between items-center mt-4 mb-10 sm:flex-row">
        <h2 className="font-bold text-3xl text-white text-left">Discover</h2>
        <select className="bg-black text-gray-300 p-3  text-sm rounded-lg outline-none mt-0 sm:mt-5">
          {genres.map((genre: Genre) => (
            <option key={genre.title} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap justify-center gap-8 sm:justify-start sm:gap-5">
        {data?.map((song, idx) => (
          <SongCard
            key={song.key}
            index={idx}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
          />
        ))}
      </div>
    </div>
  );
}

export default Discover;
