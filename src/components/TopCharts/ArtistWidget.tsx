import { NavLink } from "react-router-dom";

import { FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { SongRootObject } from "../../API/types";

import "swiper/css";
import "swiper/css/free-mode";

import NoImage from "../../assets/no_artist.jpg";

interface Props {
  topCharts: SongRootObject[];
}

function TopArtistsWidget(props: Props) {
  const { topCharts } = props;



  return (
    <div className="w-full flex flex-col mt-8">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-white font-bold text-2xl">Top Artists</h2>
        <NavLink to={"/top-artists"}>
          <p className="text-gray-300 text-base cursor-pointer hover:underline">
            See more
          </p>
        </NavLink>
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
        {topCharts?.map((chart: SongRootObject, index) => (
          <SwiperSlide
            key={chart?.key}
            className="w-1/5 h-1/5 shadow-lg rounded-full animate-slideright"
          >

            <NavLink to={`artists/${chart?.artists![0]?.adamid}`}>
              <img
                src={chart?.images?.background || NoImage}
                alt="artist"
                className="rounded-full w-full object-cover border-transparent border-2  hover:border-white ease-out duration-300"
              />
            </NavLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default TopArtistsWidget;
