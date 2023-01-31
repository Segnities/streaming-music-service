import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Loader from "../components/UI/Loader";
import Error from "../components/UI/Error";

import { GeoIpifyCountry, SelectorPlayerState } from "../API/types";
import { GeoIpify } from "../API/geoIpify";

function AroundYou() {
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { activeSong, isPlaying } = useSelector(
    (state: SelectorPlayerState) => state.player
  );

  console.log(country);

  useEffect(() => {
    GeoIpify.getGeoIpifyData()
      .then((res: GeoIpifyCountry) => setCountry(res?.data?.location?.country))
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(true));
  }, [country]);

  return <div>Around you</div>;
}

export default AroundYou;
