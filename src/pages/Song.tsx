import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import Loader from "../components/UI/Loader";

import { setActiveSong, playPause } from "../store/reducers/player";
import { useGetSongDetailsQuery } from "../API/shazamCore";

import { SelectorPlayerState } from "../API/types";

function Song() {
  const dispath = useDispatch();
  const { songid } = useParams();

  const { activeSong, isPlaying } = useSelector(
    (state: SelectorPlayerState) => state.player
  );

  const { data, isFetching } = useGetSongDetailsQuery({ songid });

  return (
    <div className="flex flex-col ">
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Song:</h2>
        <div className="mt-5">
          {data?.sections[1].type === "LYRICS" ? (
            data?.sections[1].text.map((line, index) => (
              <p key={index} className="text-gray-400 text-base my-1">
                {line}
              </p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">
              Sorry, no lyricks found!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Song;
