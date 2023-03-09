import {
  MutableRefObject,
  ReactEventHandler,
  useEffect,
  useRef,
} from "react";

import { SongAction, SongHub, SongRootObject } from "../../../API/types";

interface Props {
  activeSong: SongRootObject;
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
  const ref: MutableRefObject<HTMLAudioElement | null> = useRef(null);

  const hub: SongHub = activeSong?.hub;
  const actions: SongAction[] | undefined = hub?.actions;
  const action: SongAction | undefined = actions![1];
  const uri: string | undefined = action?.uri;

  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    ref.current!.volume = volume ?? 0;
  }, [volume]);

  useEffect(() => {
    ref.current!.currentTime = seekTime;
  }, [seekTime]);

  return (
    <audio
      src={uri}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdated}
      onLoadedData={onLoadedData}
    />
  );
}

export default Player;
