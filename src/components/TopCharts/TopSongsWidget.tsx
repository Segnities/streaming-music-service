import { Link } from "react-router-dom";

import TopChartCard from "./TopChartCard";

import { RootObject } from "../../API/types";

interface TopSongsWidgetProps {
  topCharts: RootObject[];
  isPlaying: boolean;
  activeSong: RootObject;
  handlePauseClick: () => void;
  handlePlayClick: (song: RootObject, index: number) => void;
}

function TopSongsWidget(props: TopSongsWidgetProps) {
  const {
    topCharts,
    isPlaying,
    activeSong,
    handlePauseClick,
    handlePlayClick,
  } = props;

  return (
    <div className={"w-full flex flex-col"}>
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-white font-bold text-2xl">Top Charts</h2>
        <Link to={"/top-charts"}>
          <p className="text-gray-300 text-base cursor-pointer hover:underline">
            See more
          </p>
        </Link>
      </div>
      <div className="flex flex-col gap-1 mt-4">
        {topCharts
          .map((song, index) => (
            <TopChartCard
              key={song?.key}
              song={song}
              index={index}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}
            />
          ))
          .slice(0, 5)}
      </div>
    </div>
  );
}

export default TopSongsWidget;
