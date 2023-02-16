import { FormEvent } from "react";

import { getTime } from "../../../utils/getTime";

import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai"

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
    <div className="hidden sm:flex flex-row justify-center cursor-pointer">
      <button
        type="button"
        onClick={() => setSeekTime(appTime - 5)}
        className="hidden lg:mr-4 lg:block text-white"
      >
        <AiFillMinusCircle size={18} />
      </button>
      <p className="text-white">{appTime === 0 ? "0:00" : getTime(appTime)}</p>
      <input
        type="range"
        step={"any"}
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        className="md:block mt-3 w-24 md:w-56 2xl:w-96 h-1 mx-4 2xl:mx-6 rounded-lg"
      />
      <p className="text-white">{max === 0 ? "0:00" : getTime(max)}</p>
      <button
        type="button"
        onClick={() => setSeekTime(appTime + 5)}
        className="hidden lg:ml-4 lg:block text-white"
      >
        <AiFillPlusCircle size={18} />
      </button>
    </div>
  );
}

export default Seekbar;
