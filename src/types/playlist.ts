import { SongRootObject } from "../API/types";

export interface Playlist {
    title: string;
    playlist_id: string;
    description: string;
    songs: SongRootObject[];
}

export interface SelectedPlaylist extends Playlist {
    selected: boolean;
}
