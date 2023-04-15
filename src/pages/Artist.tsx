import { useEffect } from "react";
import { useParams } from "react-router";

import Loader from "../components/UI/Loader";
import Error from "../components/UI/Error";


import { Swiper, SwiperSlide } from "swiper/react";

import { FreeMode } from "swiper";

import { useGetArtistsDetailsQuery } from "../API/shazamCore";
import { MainDatum, PurpleAttributes, FeaturedAlbumsDatum } from "../API/types";

import { useResizeObserver } from "../hooks/useResizeObserver";

import { addArtistsToFirestore } from "../utils/addArtistsToFirestore";


import NoImage from "../assets/no_artist.jpg";

import "swiper/css";
import "swiper/css/free-mode";


function Artist() {
  const { id: artistid } = useParams();

  const {
    data: artistData,
    isFetching: isFetchingArtistData,
    error,
  } = useGetArtistsDetailsQuery(artistid);



  const device: {
    xs: boolean;
    sm: boolean;
    md: boolean;
    lg: boolean;
    xl: boolean;
    "2xl": boolean;
  } = useResizeObserver();

  const artist: MainDatum = artistData?.data[0];
  const attributes: PurpleAttributes = artist?.attributes;
  const playlist: FeaturedAlbumsDatum[] = artist?.views?.playlists?.data;

  console.log(artist);


  const artistImage =
    artist?.avatar ||
    attributes?.editorialArtwork?.originalFlowcaseBrick?.url ||
    attributes?.editorialArtwork?.bannerUber?.url ||
    attributes?.editorialArtwork?.subscriptionHero?.url ||
    attributes?.editorialArtwork?.storeFlowcase?.url ||
    NoImage;



  useEffect(() => {
    if (!isFetchingArtistData) {
      /* addArtistsToFirestore(artistData).then(res => console.log('Added to firestore!')).catch(err => console.log(err)); */
    }
  }, [isFetchingArtistData]);

  if (isFetchingArtistData) {
    return <Loader title="Searching artist..." />;
  }


  if (error) {
    return <Error />;
  }

  return (
    <div className="flex flex-col" data-testid='artist-page'>
      <div className="relative w-full flex flex-col">
        <div className="w-full h-28 bg-gradient-to-l from-transparent to-black sm:h-52"></div>
        <div className="absolute inset-0 flex flex-row items-center">
          <img
            src={artistImage}
            alt="art"
            className="w-28 sm:w-48 h-28 sm:h-48 rounded-full object-cover border-2 shadow-xl shadow-black"
            onDragStart={(e) => e.preventDefault()}
          />
          <div className="ml-5 mb-3">
            <p className="text-3xl sm:text-2xl text-white mb-2">
              {attributes?.name}
            </p>
            <ul className="flex flex-row text-gray-500 list-none">
              {attributes.genreNames.map((genre) => (
                <li key={genre} className="text-xl first:mx-0 last:mx-0 mx-2">
                  {genre}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full h-24 sm:h-24"></div>
      </div>

      <div className="w-full flex flex-col mt-8 max-w-[320px] sm:max-w-[380px] md:max-w-[780px] overflow-hidden">
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


      <div className="mt-8 w-full text-2xl">
        <h3 className="text-gray-100 my-3">Bio</h3>
        <p
          className="text-base text-gray-500 text-justify"
          dangerouslySetInnerHTML={{ __html: attributes?.artistBio }}
        />
      </div>

    </div>
  );
}

export default Artist;
