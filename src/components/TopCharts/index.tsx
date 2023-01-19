import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import TopSongsWidget from "./TopSongsWidget";
import TopArtistsWidget from "./TopArtistsWidget";

import { playPause, setActiveSong } from "../../store/reducers/player";

import { useGetTopChartsQuery } from "../../API/shazamCore";
import { RootObject, SelectorPlayerState } from "../../API/types";



function TopCharts() {
  const { data, isFetching } = useGetTopChartsQuery(null);
  const topCharts = isFetching ? [] : [...data].slice(0, 5);
  const { activeSong, isPlaying } = useSelector(
    (state: SelectorPlayerState) => state.player
  );
  const containerRef = useRef(null);

  const dispatch = useDispatch();

  const handlePlayClick = (song: RootObject, index: number) => {
    dispatch(setActiveSong({ song, data, index }));
    dispatch(playPause(true));
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  useEffect(() => {
    containerRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-1 flex-col xl:ml-6 ml-0 xl:mb-0 mb-6 xl:max-w-[400px] max-w-full"
    >
      <TopSongsWidget
        activeSong={activeSong}
        topCharts={topCharts}
        isPlaying={isPlaying}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />

      <TopArtistsWidget topCharts={topCharts}/>
    </div>
  );
}

export default TopCharts;