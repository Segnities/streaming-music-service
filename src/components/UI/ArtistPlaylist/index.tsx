import { FeaturedAlbumsDatum } from "../../../API/types";

interface Props {
  playlist: FeaturedAlbumsDatum[];
}

function ArtistPlaylist(props: Props) {
  const { playlist } = props;

  return (
    <div className="flex flex-wrap mt-10">
      <h2 className="text-3xl text-white my-7">Playlist</h2>
      {playlist?.map((card) => (
        <div
          key={card?.id}
          className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2"
        >
          <div className="flex-1 flex flex-row justify-between items-center">
            <img
              src={
                card?.attributes?.editorialArtwork?.subscriptionCover?.url ||
                card?.attributes?.artwork?.url
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
  );
}

export default ArtistPlaylist;
