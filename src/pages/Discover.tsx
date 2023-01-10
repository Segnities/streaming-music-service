import SongCard from "../components/SongCard";

import { genres } from "../data/genres";

type Genre = {
  title: string;
  value: string;
};

function Discover() {
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
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((song) => (
          <SongCard key={song}>Song Card</SongCard>
        ))}
      </div>
    </div>
  );
}

export default Discover;
