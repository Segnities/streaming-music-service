import { useParams } from "react-router";

import Loader from "../components/UI/Loader";
import Error from "../components/UI/Error";

import { useGetArtistsDetailsQuery } from "../API/shazamCore";
import { MainDatum, PurpleAttributes, AlbumsDatum } from "../API/types";

import NoImage from "../assets/no_artist.jpg";

function Artist() {
  const { id: artistid } = useParams();

  const {
    data: artistData,
    isFetching: isFetchingArtistData,
    error,
  } = useGetArtistsDetailsQuery(artistid);

  if (isFetchingArtistData) {
    return <Loader title="Searching artist..." />;
  }

  const artist: MainDatum = artistData?.data[0];
  const attributes: PurpleAttributes = artist?.attributes;

  if (error) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <div className="relative w-full flex flex-col">
        <div className="w-full h-28 bg-gradient-to-l from-transparent to-black sm:h-52"></div>
        <div className="absolute inset-0 flex flex-row items-center">
          <img
            src={
              attributes?.editorialArtwork?.originalFlowcaseBrick?.url ||
              attributes?.editorialArtwork?.bannerUber?.url ||
              attributes?.editorialArtwork?.subscriptionHero?.url ||
              attributes?.editorialArtwork?.storeFlowcase?.url ||
              NoImage
            }
            alt="art"
            className="w-28 sm:w-48 h-28 sm:h-48 rounded-xl object-cover border-2 shadow-xl shadow-black"
            onDragStart={(e) => e.preventDefault()}
          />
          <div className="ml-5">
            <p className="text-3xl sm:text-2xl text-white">
              {attributes?.name}
            </p>
            <p className="text-2xl sm:text-base text-gray-400 mt-1">
              {attributes?.bornOrFormed}
            </p>
            <ul className="flex flex-row text-gray-500 list-none">
              {attributes.genreNames.map((genre) => (
                <li key={genre} className="first:mx-0 last:mx-0 mx-2">
                  {genre}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full h-24 sm:h-24"></div>
      </div>
      <div className="mt-5 w-full">
        <p className="text-base text-gray-500">{attributes.artistBio}</p>
      </div>
      <div></div>
    </div>
  );
}

export default Artist;
