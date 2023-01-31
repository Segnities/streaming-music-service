import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import TopSongsWidget from "./SongsWidget";
import TopArtistsWidget from "./ArtistsWidget";

import { playPause, setActiveSong } from "../../store/reducers/player";

import { useGetTopChartsQuery } from "../../API/shazamCore";
import { SongRootObject, SelectorPlayerState } from "../../API/types";

function TopCharts() {
  const { data, isFetching } = useGetTopChartsQuery(null);
  const topCharts: SongRootObject[] = isFetching
    ? []
    : data
        .slice()
        .filter((tChart: SongRootObject) => tChart?.artists)
        .slice(0, 10);

  const { activeSong, isPlaying } = useSelector(
    (state: SelectorPlayerState) => state.player
  );
  const containerRef = useRef(null);

  const dispatch = useDispatch();

  const handlePlayClick = (song: SongRootObject, index: number) => {
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

      <TopArtistsWidget topCharts={topCharts} />
    </div>
  );
}

export default TopCharts;
