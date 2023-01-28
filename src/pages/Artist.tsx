import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import Loader from "../components/UI/Loader";

import { playPause } from "../store/reducers/player";
import { setActiveSong } from "../store/reducers/player";

import { useGetArtistsDetailsQuery } from "../API/shazamCore";

import { SelectorPlayerState } from "../API/types";
import Error from "../components/UI/Error";

function Artist() {
  const dispatch = useDispatch();
  const { id: artistid } = useParams();

  const {
    data: artistData,
    isFetching: isFetchingArtistData,
    error,
  } = useGetArtistsDetailsQuery(artistid);

  console.dir(artistData);

  if (isFetchingArtistData) {
    return <Loader title="Searching artist..." />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
        
    </div>
  );
}

export default Artist;
