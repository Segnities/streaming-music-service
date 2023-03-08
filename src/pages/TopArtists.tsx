import ArtistCard from "../components/ArtistCard";
import Loader from "../components/UI/Loader";
import Error from "../components/UI/Error";

import { useGetTopChartsQuery } from "../API/shazamCore";
import { SongRootObject } from "../API/types";

function TopArtists() {
  const {
    data: topArtists,
    isFetching: isTopArtistsFetching,
    error: topArtistsError,
  } = useGetTopChartsQuery(null);

  const filledTopArtists = isTopArtistsFetching ? [] : topArtists.filter((tArtist: SongRootObject) => tArtist?.artists)

  if (isTopArtistsFetching || filledTopArtists.length === 0) {
    return <Loader title="Artists is loading..." />;
  }
  if (topArtistsError) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <h2 className="text-3xl text-white font-bold text-left mt-4 mb-10">
        Top Artists
      </h2>
      <div className="flex flex-wrap justify-center sm:justify-start gap-8">
        {filledTopArtists?.map((track) => (
          <ArtistCard key={track?.key} track={track} />
        ))}
      </div>
    </div>
  );
}

export default TopArtists;
