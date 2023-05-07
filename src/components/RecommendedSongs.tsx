import { Dispatch, SetStateAction, useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useGetTopChartsQuery } from "../API/shazamCore";

import { shuffle } from "../utils/shuffle";

import { SelectorPlayerState, SongRootObject } from "../API/types";

import { setActiveSong, playPause } from "../store/reducers/player";

import { nanoid } from "@reduxjs/toolkit";

import Error from "./UI/Error";
import SongsList from "./SongsList";

interface RecommendedSongsProps {
    showRecommended: boolean;
    setShowRecommended: Dispatch<SetStateAction<boolean>>;
}

export default function RecommendedSongs(props: RecommendedSongsProps) {
    const { showRecommended, setShowRecommended } = props;
    const dispatch = useDispatch();

    const [shuffleError, setShuffleError] = useState<any>(null);

    const [playlistRecomendations, setPlaylistRecomandations] = useState<any[]>([]);

    const [triggerRecomendations, setTriggerRecomendations] = useState<string>("");

    const {
        data: recommendedCharts,
        isFetching: isFetchingRecommendedCharts,
        error: recommendedChartsError,
    } = useGetTopChartsQuery(triggerRecomendations);

    const { activeSong, isPlaying } = useSelector(
        (state: SelectorPlayerState) => state.player
    );


    const handlePlayClick = (song: SongRootObject, index: number) => {
        dispatch(setActiveSong({ song, playlistRecomendations, index }));
        dispatch(playPause(true));
    };

    const handlePauseClick = () => {
        dispatch(playPause(false));
    };

    const handleUpdateRecommendSongs = () => {
        setTriggerRecomendations(nanoid());
    };


    useEffect(() => {
        if (!isFetchingRecommendedCharts) {
            try {
                setPlaylistRecomandations(shuffle(recommendedCharts.filter((chart: SongRootObject) => {
                    if (chart?.artists && chart?.hub?.actions) {
                        return chart;
                    }
                }).slice(0, 20)));
            } catch (e) {
                setShuffleError(e);
            }
        }
    }, [isFetchingRecommendedCharts, recommendedCharts]);

    return (
        <>
            {
                showRecommended && (
                    <section className="flex flex-col items-center w-full">
                        <p role="button" className="text-white w-full text-right text-sm font-semibold" onClick={() => setShowRecommended(false)}>Find more</p>
                        <div>
                            <h1 className="text-white text-xl font-semibold">Recommended songs</h1>
                            {
                                (recommendedChartsError || shuffleError) ? <Error /> : (
                                    <SongsList
                                        activeSong={activeSong}
                                        isPlaying={isPlaying}
                                        songs={playlistRecomendations}
                                        artistid=""
                                        handlePauseClick={handlePauseClick}
                                        handlePlayClick={handlePlayClick}
                                    />
                                )
                            }
                        </div>
                        <p role="button" className="text-gray-400 font-bold w-full text-right hover:text-white hover:scale-y-110" onClick={handleUpdateRecommendSongs}>Update songs</p>
                    </section>
                )
            }
        </>
    );

}