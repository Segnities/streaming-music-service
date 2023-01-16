import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { playPause, setActiveSong } from "../store/reducers/player";

import { useGetTopChartsQuery } from "../API/shazamCore";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import PlayPause from "./UI/PlayPause";

import { RootObject, SelectorPlayerState } from "../API/types";

import "swiper/css";
import "swiper/css/free-mode";

interface TopChartCardProps {
  song: RootObject;
  index: number;
}

function TopChartCard(props: TopChartCardProps) {
  const { song, index } = props;
  return (
    <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
      {song.title}
    </div>
  );
}

function TopCharts() {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector(
    (state: SelectorPlayerState) => state.player
  );
  const containerRef = useRef(null);
  const { data } = useGetTopChartsQuery(null);

  const topCharts = data.map((item) => item).slice(0, 5);

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
      className="flex flex-1 flex-col xl:ml-6 ml-0 xl:mb-0 mb-6 xl:max-w-[500px] max-w-full"
    >
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
          {topCharts.map((song, index) => (
            <TopChartCard key={song.key} song={song} index={index} />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to={"/top-artists"}>
            <p className="text-gray-300 text-base cursor-pointer hover:underline">
              See more
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TopCharts;
