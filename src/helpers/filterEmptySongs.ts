import { SongRootObject } from "../API/types";

export function filterEmptySongs(songs: SongRootObject[]) {
    return [...songs].filter((chart: SongRootObject) => {
        if (chart?.artists && chart?.hub?.actions) {
            return chart;
        }
    });
}