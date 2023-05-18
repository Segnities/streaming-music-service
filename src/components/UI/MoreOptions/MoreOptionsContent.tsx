import { Option } from "./MoreActionsGroup";

import { useHover } from "../../../hooks/useHover";

import { AiFillCaretRight } from "react-icons/ai";

interface MoreOptionProps {
    options: Option[];
    visible: boolean;
}

export default function MoreOptionsContent(props: MoreOptionProps) {
    const [ref, isHovered] = useHover<HTMLLIElement>();

    return (
        <div className="w-96 flex items-between flex-auto">
            {
                props.visible && (
                    <>
                        <div className="hidden absolute top-10 duration-200 ease-linear transition-all md:flex flex-col items-start justify-start rounded-sm p-1 min-h-[150px] w-64 bg-[#21106e] z-50">

                            <ul className="w-full h-full">
                                {
                                    props.options.map((option) => (
                                        <li
                                            key={option.key}
                                            onClick={() => option.onClickCallback()}
                                            ref={ref}
                                            className="w-full text-start flex items-center font-semibold first-letter:uppercase cursor-default text-sm max-h-12 justify-between px-4 py-2 hover:rounded-sm  hover:border-[#7b64e2] hover:text-[#7b64e2] hover:bg-[#110642] my-1 text-white">
                                            {option.title}
                                            {option?.nested} && <AiFillCaretRight size={18} />
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </>
                )}
        </div>

    );
}