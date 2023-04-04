import YouTube from "react-youtube";

import { useGetTrackYoutubeVideoQuery } from "../API/shazamCore";
import { YoutubeTrackData } from "../API/types";
import { getYouTubeVideoId } from "../utils/getYoutubeVideoId";


interface Props {
    youtubeData: YoutubeTrackData;
}

function YoutubeTrackVideo(props: Props) {
    const { youtubeData } = props;
    console.log(youtubeData.actions[0].uri);

    return (
        <div className="flex flex-col w-full mt-2 mb-8">
            <h3 className="text-white text-2xl my-4 font-bold">Video Track</h3>
            <div className="w-full">
                <YouTube className="w-full" videoId={getYouTubeVideoId(youtubeData?.actions[0]?.uri)} opts={
                    {
                        width: "100%",
                        height: "320px",

                    }
                } />
            </div>
        </div>
    )
}

export default YoutubeTrackVideo;