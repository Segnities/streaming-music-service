import { MutableRefObject, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Error from "../UI/Error";
import Loader from "../UI/Loader";
import TopArtistsWidget from "./ArtistWidget";
import TopSongsWidget from "./SongWidget";

import { playPause, setActiveSong } from "../../store/reducers/player";

import { useGetTopChartsQuery } from "../../API/shazamCore";
import { SelectorPlayerState, SongRootObject } from "../../API/types";

function TopChartsWidget() {
  const { data, isFetching, error } = useGetTopChartsQuery(null);
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
    return <Loader title="Top charts is loading..." />;
  }

  if (error) {
    return <Error />;
  }


  return (
    <div
      ref={containerRef}
      className="flex flex-1 flex-col xl:ml-6 ml-0 xl:mb-0 mb-6 xl:max-w-[400px] max-w-full"
    >
      <TopSongsWidget
        activeSong={activeSong}
        topCharts={[...data].filter(chart => {
          if (chart?.artists && chart?.hub?.actions) {
            return chart;
          }
        }).slice(0, 5)}
        isPlaying={isPlaying}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />

      <TopArtistsWidget topCharts={[...data].filter(chart => chart?.artists).slice(0, 10)} />
    </div>
  );
}

export default TopChartsWidget;
