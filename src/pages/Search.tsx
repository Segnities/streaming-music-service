import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import SongCard from "../components/SongCard";
import Loader from "../components/UI/Loader";
import Error from "../components/UI/Error";

import { useGetSongsBySearchQuery } from "../API/shazamCore";

import { SelectorPlayerState } from "../API/types";


function Search() {
    const { query } = useParams();
    const {
        data,
        isFetching: isFetchingSongs,
        error: songsError,
    } = useGetSongsBySearchQuery(query);

    const { activeSong, isPlaying } = useSelector(
        (state: SelectorPlayerState) => state.player
    );

    const songs = data?.tracks?.hits?.map((song) => song?.track);

    if (isFetchingSongs) {
        return <Loader title="Searching songs..." />;
    }

    if (songsError) {
        return <Error />;
    }

    return (
        <div className="flex flex-col" data-testid='search-page'>
            <h2 className="text-3xl text-white font-bold text-left mt-4 mb-10">
                Showing results of <span className="font-black">{query}</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-8 sm:justify-start sm:gap-5">

                {
                    songs.map((song, index) => (
                        <SongCard
                            key={song?.key}
                            activeSong={activeSong}
                            song={song}
                            data={songs}
                            index={index}
                            isPlaying={isPlaying}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default Search;
