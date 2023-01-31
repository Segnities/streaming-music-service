import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Loader from "../components/UI/Loader";
import Error from "../components/UI/Error";

import { SelectorPlayerState } from "../API/types";

function AroundYou() {
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { activeSong, isPlaying } = useSelector(
    (state: SelectorPlayerState) => state.player
  );

  useEffect(() => {}, [country]);

  return <div>Around you</div>;
}

export default AroundYou;
