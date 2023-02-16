import { useSelector, useDispatch } from "react-redux";

import SongCard from "../components/SongCard";
import Loader from "../components/UI/Loader";
import Error from "../components/UI/Error";

import { genres } from "../data/genres";

import { useGetSongsByGenreQuery } from "../API/shazamCore";
import { SelectorPlayerState, SongRootObject } from "../API/types";
import { selectGenreListId } from "../store/reducers/player";

type Genre = {
  title: string;
  value: string;
};

function Discover() {
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state: SelectorPlayerState) => state.player
  );
  const dispatch = useDispatch();
  const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || "POP");


  const filledData = isFetching ? [] : data.filter((chart: SongRootObject) => chart?.artists);

  if (isFetching || filledData.length === 0) {
    return <Loader title="Loading songs..." />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-col justify-between items-center mt-4 mb-10 sm:flex-row">
        <h2 className="font-bold text-3xl text-white text-left">Discover</h2>
        <select className="bg-black text-gray-300 p-3  text-sm rounded-lg outline-none mt-8 w-full  sm:mt-5 sm:w-auto" value={genreListId || "POP"} onChange={(e) => {
          dispatch(selectGenreListId(e.target.value))
        }}>
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
            data={filledData}
          />
        ))}
      </div>
    </div>
  );
}

export default Discover;
