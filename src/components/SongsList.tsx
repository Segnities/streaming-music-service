import { SongRootObject } from "../API/types";
import SongBar from "./SongBar";

interface SongsListProps {
    songs: SongRootObject[];
    artistid: string | undefined;
    activeSong: SongRootObject;
    isPlaying: boolean;
    handlePauseClick: () => void;
    handlePlayClick: (song, index) => void;
}

export default function SongsList(props: SongsListProps) {
    return (
        <div className="mt-6 w-full flex flex-col">
            {props.songs.filter((song) => {
                if (song?.artists && song?.hub?.actions) {
                    return song;
                }
            })?.map((song, index) => (
                <SongBar
                    key={`${song.key}-${index}-${props?.artistid}`}
                    index={index}
                    song={song}
                    artistid={props?.artistid}
                    activeSong={props.activeSong}
                    isPlaying={props?.isPlaying}
                    handlePlayClick={() => props.handlePlayClick(song, index)}
                    handlePauseClick={() => props.handlePauseClick()}
                />
            ))}
        </div>
    );
}
