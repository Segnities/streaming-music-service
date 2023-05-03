import { SongRootObject } from "../API/types";
import SongsList from "./SongsList";

interface Props {
  relatedSongs: SongRootObject[];
  isPlaying: boolean;
  artistid: string | undefined;
  activeSong: SongRootObject;
  handlePauseClick: () => void;
  handlePlayClick: (song, index) => void;
}

function RelatedSongs(props: Props) {
  const {
    relatedSongs,
    activeSong,
    isPlaying,
    artistid,
    handlePauseClick,
    handlePlayClick,
  } = props;
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-white">Related Songs:</h1>
      <div className="mt-6 w-full flex flex-col">
        <SongsList
          activeSong={activeSong}
          artistid={artistid}
          songs={relatedSongs}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
          isPlaying={isPlaying} />
      </div>
    </div>
  );
}

export default RelatedSongs;
