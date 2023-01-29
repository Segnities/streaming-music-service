import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import { FeaturedAlbumsDatum } from "../../../API/types";

import "swiper/css";
import "swiper/css/free-mode";
import { useResizeObserver } from "../../../hooks/useResizeObserver";

interface Props {
  playlist: FeaturedAlbumsDatum[];
}

function ArtistPlaylist(props: Props) {
  const { playlist } = props;

  const device: {
    xs: boolean;
    sm: boolean;
    md: boolean;
    lg: boolean;
    xl: boolean;
    "2xl": boolean;
  } = useResizeObserver();

  return (
    <div className="w-full flex flex-col mt-8">
      <div className="flex flex-row justify-between items-center">
        <h3 className="text-white font-bold text-2xl">Artist Playlists</h3>
      </div>
      {device.sm && (
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={10}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-8"
        >
          {playlist.map((card) => (
            <SwiperSlide
              key={card?.id}
              className="w-1/2 h-[140px] sm:h-[250px] shadow-lg rounded-full animate-slideright"
            >
              <div className="flex w-full h-full  flex-row items-center bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
                <div className="flex-1 flex flex-col justify-center mx-3">
                  <p className="text-xl font-bold text-white">
                    {card?.attributes?.name}
                  </p>
                  <p className="text-lg text-gray-300 mt-1">
                    {card?.attributes?.description?.short}
                  </p>
                  <p className="text-base text-gray-400 mt-2">
                    {card?.attributes?.curatorName}
                  </p>
                </div>
                <div className="flex-1 flex flex-row justify-around items-center">
                  <img
                    src={
                      card?.attributes?.editorialArtwork?.subscriptionCover
                        ?.url || card?.attributes?.artwork?.url
                    }
                    alt="artist"
                    className="w-[108px] h-[108px] sm:w-[168px] sm:h-[168px] rounded-lg shadow-sm shadow-black object-cover"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {device.xs && (
        <div className="mt-5">
          {playlist?.map((card) => (
            <div
              key={card?.id}
              className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2"
            >
              <div className="flex-1 flex flex-row justify-between items-center">
                <img
                  src={
                    card?.attributes?.editorialArtwork?.subscriptionCover
                      ?.url || card?.attributes?.artwork?.url
                  }
                  alt="playlist_img"
                  className="w-24 h-24 rounded-lg shadow-sm shadow-black"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center mx-3">
                <p className="text-base font-bold text-white">
                  {card?.attributes?.name}
                </p>
                <p className="text-sm text-gray-300 mt-1">
                  {card?.attributes?.description?.short}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {card?.attributes?.curatorName}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ArtistPlaylist;
