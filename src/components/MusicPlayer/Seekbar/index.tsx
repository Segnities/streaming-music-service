import { FormEvent } from "react";

import { getTime } from "../../../utils/getTime";

interface Props {
  value: number;
  min: number;
  max: number;
  onInput: (event: FormEvent<HTMLInputElement>) => void;
  setSeekTime: React.Dispatch<React.SetStateAction<number>>;
  appTime: number;
}

function Seekbar(props: Props) {
  const { value, min, max, onInput, setSeekTime, appTime } = props;
  return (
    <div className="hidden sm:flex flex-row justify-center">
      <button
        type="button"
        onClick={() => setSeekTime(appTime - 5)}
        className="hidden lg:mr-4 lg:block text-white"
      >
        -
      </button>
      <p className="text-white">{max === 0 ? "0:00" : getTime(max)}</p>
      <input
        type="range"
        step={"any"}
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        className="md:block w-24 md:w-56 2xl:w-96 h-1 mx-4 2xl:mx-6 rounded-lg"
      />
      <p className="text-white">{max === 0 ? "0:00" : getTime(max)}</p>
      <button
        type="button"
        onClick={() => setSeekTime(appTime + 5)}
        className="hidden lg:ml-4 lg:block text-white"
      >
        +
      </button>
    </div>
  );
}

export default Seekbar;
