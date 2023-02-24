import { useParams } from "react-router";

import Loader from "../components/UI/Loader";
import Error from "../components/UI/Error";

import { useGetArtistsDetailsQuery } from "../API/shazamCore";
import { MainDatum, PurpleAttributes, FeaturedAlbumsDatum } from "../API/types";

import NoImage from "../assets/no_artist.jpg";
import ArtistPlaylist from "../components/UI/ArtistPlaylist";

interface ArtistDetailHeaderProps {
  artistImage: string | undefined;
  attributes: PurpleAttributes;
}

interface ArtistBioProps {
  artistBio: string;
}

function ArtistDetailHeader(props: ArtistDetailHeaderProps) {
  const { artistImage, attributes } = props;

  return (
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
  );
}

function ArtistBio(props: ArtistBioProps) {
  const { artistBio } = props;
  return (
    <div className="mt-8 w-full text-2xl">
      <h3 className="text-gray-100 my-3">Bio</h3>
      <p
        className="text-base text-gray-500"
        dangerouslySetInnerHTML={{ __html: artistBio }}
      />
    </div>
  );
}

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
  const playlist: FeaturedAlbumsDatum[] = artist?.views?.playlists?.data;

  console.dir(artist);

  const artistImage =
    artist?.avatar ||
    attributes?.editorialArtwork?.originalFlowcaseBrick?.url ||
    attributes?.editorialArtwork?.bannerUber?.url ||
    attributes?.editorialArtwork?.subscriptionHero?.url ||
    attributes?.editorialArtwork?.storeFlowcase?.url ||
    NoImage;

  if (error) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <ArtistDetailHeader artistImage={artistImage} attributes={attributes} />
      <ArtistPlaylist playlist={playlist} />
      <ArtistBio artistBio={attributes.artistBio} />
    </div>
  );
}

export default Artist;
