import { useEffect, useRef, useState } from "react";
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
  isPlaying: boolean;
  activeSong: RootObject;
  handlePauseClick: () => void;
  handlePlayClick: (song: RootObject, index: number) => void;
}

function TopChartCard(props: TopChartCardProps) {
  const {
    song,
    index,
    isPlaying,
    activeSong,
    handlePauseClick,
    handlePlayClick,
  } = props;
  return (
    <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
      <p className="font-bold text-base text-white mr-3">{index + 1}.</p>
      <div className="flex flex-1 flex-wrap flex-row justify-between items-center">
        <img
          src={song?.images?.coverart}
          alt={`${song?.title}`}
          className="w-[50px] h-[50px] rounded-lg"
        />
        <div className="flex flex-1 flex-col justify-center mx-3">
          <Link to={`songs/${song?.key}`}>
            <h3 className="text-base font-bold text-white">{song?.title}</h3>
          </Link>
          <Link to={`artists/${song?.artists[0].adamid}`}>
            <h3 className="text-sm text-gray-400 mt-1 hover:underline">
              {song?.subtitle}
            </h3>
          </Link>
        </div>
      </div>
      <PlayPause
        song={song}
        activeSong={activeSong}
        isPlaying={isPlaying}
        handlePlayClick={() => handlePlayClick(song, index)}
        handlePauseClick={handlePauseClick}
      />
    </div>
  );
}

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

      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to={"/top-artists"}>
            <p className="text-gray-300 text-base cursor-pointer hover:underline">
              See more
            </p>
          </Link>
        </div>

        <Swiper
          slidesPerView={"auto"}
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topCharts.map((song: RootObject, index) => (
            <SwiperSlide
              key={song?.key}
              className="w-1/5 h-1/5 shadow-lg rounded-full animate-slideright"
            >
              <Link to={`artists/${song?.artists[0]?.adamid}`}>
                <img
                  src={song?.images?.background}
                  alt="artist"
                  className="rounded-full w-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default TopCharts;
