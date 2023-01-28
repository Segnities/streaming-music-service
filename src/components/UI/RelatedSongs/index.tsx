import SongBar from "../../SongBar";

import { SongRootObject } from "../../../API/types";

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
        {relatedSongs?.map((song, index) => (
          <SongBar
            key={`${song.key}-${artistid}`}
            index={index}
            song={song}
            artistid={artistid}
            activeSong={activeSong}
            isPlaying={isPlaying}
            handlePlayClick={() => handlePlayClick(song, index)}
            handlePauseClick={handlePauseClick}
          />
        ))}
      </div>
    </div>
  );
}

export default RelatedSongs;
