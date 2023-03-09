import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import { SongRootObject } from "../../../API/types";

import "swiper/css";
import "swiper/css/free-mode";

import NoImage from "../../../assets/no_artist.jpg";

interface Props {
  topCharts: SongRootObject[];
}

function TopArtistsWidget(props: Props) {
  const { topCharts } = props;

  return (
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
        {topCharts.map((song: SongRootObject, index) => (
          <SwiperSlide
            key={song?.key}
            className="w-1/5 h-1/5 shadow-lg rounded-full animate-slideright"
          >
            <Link to={`artists/${song?.artists![0]?.adamid}`}>
              <img
                src={song?.images?.background || NoImage}
                alt="artist"
                className="rounded-full w-full object-cover"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default TopArtistsWidget;
