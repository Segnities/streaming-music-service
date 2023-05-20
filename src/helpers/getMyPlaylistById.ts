import { Playlist } from "../types/playlist";
import { getPlaylists } from "./getPlaylists";

export default async function getMyPlaylistById(playlist_id: string | undefined, uid: string | undefined): Promise<Playlist | undefined> {
    const playlistsData = await getPlaylists({ uid });

    const playlist = playlistsData?.docs[0].data().playlists.find((p: Playlist) => p.playlist_id === playlist_id);

    return playlist;
}