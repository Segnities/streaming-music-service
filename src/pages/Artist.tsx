import { useParams } from "react-router";

import Loader from "../components/UI/Loader";
import Error from "../components/UI/Error";
import ArtistPlaylist from "../components/UI/ArtistPlaylist";

import ArtistHeader from "../components/ArtistHeader";
import ArtistBio from "../components/ArtistBio";

import { useGetArtistsDetailsQuery } from "../API/shazamCore";
import { MainDatum, PurpleAttributes, FeaturedAlbumsDatum } from "../API/types";

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
      <ArtistHeader artistImage={artistImage} attributes={attributes} />
      <ArtistPlaylist playlist={playlist} />
      <ArtistBio artistBio={attributes.artistBio} />
    </div>
  );
}

export default Artist;
