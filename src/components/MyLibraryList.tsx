import { Playlist } from "../types/playlist";
import PlaylistCard from "./PlaylistCard";

interface MyLibraryListProps {
    playlists: Playlist[];
}

export default function MyLibraryList({playlists}: MyLibraryListProps) {
    return (
        <div className="flex flex-row flex-wrap items-center justify-center gap-5">
            {
                playlists.map((playlist) => (
                    <PlaylistCard playlist={playlist} key={playlist.playlist_id} />
                ))
            }
        </div>
    );
}