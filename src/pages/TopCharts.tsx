import { useSelector } from "react-redux";

import Loader from "../components/UI/Loader";
import Error from "../components/UI/Error";

import { useGetTopChartsQuery } from "../API/shazamCore";

import { SelectorPlayerState, SongRootObject } from "../API/types";

import SongCard from "../components/SongCard";

function TopCharts() {
  const {
    data: topCharts,
    isFetching: isFetchingTopCharts,
    error: topChartsError,
  } = useGetTopChartsQuery(null);

  const { activeSong, isPlaying } = useSelector(
    (state: SelectorPlayerState) => state.player
  );

  if (isFetchingTopCharts) {
    return <Loader title="Loading songs around you..." />;
  }

  if (topChartsError) {
    return <Error />;
  }

  return (
    <div className="flex flex-col" data-testid="top-charts-page">
      <h2 className="text-3xl text-white font-bold text-left mt-4 mb-10">
        Top Charts
      </h2>
      <div className="flex flex-wrap justify-center sm:justify-start gap-8">
        {topCharts?.filter((chart: SongRootObject) => {
          if (chart?.artists && chart?.hub?.actions) {
            return chart;
          }
        }).map((song, index) => (
          <SongCard
            key={song?.key}
            song={song}
            activeSong={activeSong}
            songs={topCharts}
            index={index}
            isPlaying={isPlaying}
          />
        ))}
      </div>
    </div>
  );
}

export default TopCharts;
