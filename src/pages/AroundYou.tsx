import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Loader from "../components/UI/Loader";
import Error from "../components/UI/Error";

import { useGetSongsByCountryQuery } from "../API/shazamCore";

import { GeoIpifyCountry, SelectorPlayerState } from "../API/types";
import { GeoIpify } from "../API/geoIpify";
import SongCard from "../components/SongCard";

function AroundYou() {
  const [country, setCountry] = useState("");
  const [isGeoLoading, setIsGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState("");

  const {
    data: countrySongs,
    isFetching: isFetchingCountrySongs,
    error: countrySongsError,
  } = useGetSongsByCountryQuery(country);

  const { activeSong, isPlaying } = useSelector(
    (state: SelectorPlayerState) => state.player
  );

  useEffect(() => {
    GeoIpify.getGeoIpifyData()
      .then((res: GeoIpifyCountry) => setCountry(res?.data?.location?.country))
      .catch((error) => setGeoError(error.message))
      .finally(() => setIsGeoLoading(true));
  }, [country]);

  if (isGeoLoading && isFetchingCountrySongs) {
    return <Loader title="Loading songs around you..." />;
  }

  if (countrySongsError && geoError) {
    return <Error />;
  }

  return (
    <div className="flex flex-col" data-testid="around-you-page">
      <h2 className="text-3xl text-white font-bold text-left mt-4 mb-10">
        Around you
        <span className="font-black ml-3">{country}</span>
      </h2>
      <div className="flex flex-wrap justify-center sm:justify-start gap-8">
        {countrySongs?.map((song, index) => (
          <SongCard
            key={song?.key}
            song={song}
            activeSong={activeSong}
            data={countrySongs}
            index={index}
            isPlaying={isPlaying}
          />
        ))}
      </div>
    </div>
  );
}

export default AroundYou;
