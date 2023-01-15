import { MutableRefObject, ReactElement, ReactEventHandler, useEffect, useRef } from "react";

import { RootObject } from "../../../API/types";

interface Props {
  activeSong: RootObject | undefined;
  volume: number | null;
  isPlaying: boolean;
  seekTime: number;
  repeat: boolean;
  onEnded: () => void;
  onTimeUpdated: ReactEventHandler<HTMLAudioElement>;
  onLoadedData: ReactEventHandler<HTMLAudioElement>;
}

function Player(props: Props) {
  const {
    activeSong,
    volume,
    isPlaying,
    seekTime,
    repeat,
    onEnded,
    onTimeUpdated,
    onLoadedData,
  } = props;
  const ref:MutableRefObject<HTMLAudioElement|null> = useRef(null);

  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    ref.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    ref.current.currentTime = seekTime;
  }, [seekTime]);

  return (
    <audio
      src={activeSong?.hub?.actions[1]?.uri}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdated}
      onLoadedData={onLoadedData}
    />
  );
}

export default Player;
