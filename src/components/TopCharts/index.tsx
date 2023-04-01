import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import TopSongsWidget from "./SongsWidget";
import TopArtistsWidget from "./ArtistsWidget";
import Loader from "../UI/Loader";
import Error from "../UI/Error";

import { playPause, setActiveSong } from "../../store/reducers/player";

import { useGetTopChartsQuery } from "../../API/shazamCore";
import { SongRootObject, SelectorPlayerState } from "../../API/types";

function TopChartsWidget() {
  const { data, isFetching, error } = useGetTopChartsQuery(null);
  const [topCharts, setTopCharts] = useState<[] | SongRootObject[]>([]);
  const { activeSong, isPlaying } = useSelector(
    (state: SelectorPlayerState) => state.player
  );
  const containerRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const dispatch = useDispatch();

  const handlePlayClick = (song: SongRootObject, index: number) => {
    dispatch(setActiveSong({ song, data, index }));
    dispatch(playPause(true));
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  if (isFetching) {
    return <Loader title="Top charts is loading..." />
  }

  if (error) {
    return <Error />
  }

  return (
    <div
      ref={containerRef}
      className="flex flex-1 flex-col xl:ml-6 ml-0 xl:mb-0 mb-6 xl:max-w-[400px] max-w-full"
    >
      <TopSongsWidget
        activeSong={activeSong}
        topCharts={[...data].slice(0, 10)}
        isPlaying={isPlaying}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />

      <TopArtistsWidget topCharts={[...data].slice(0, 10)} />
    </div>
  );
}

export default TopChartsWidget;
