import React from "react";

import { AiOutlineClose } from "react-icons/ai";
import LineDivider from "../LineDivider";

interface Props {
    open: boolean;
    setOpen: (visibility: boolean) => void;
    children: React.ReactNode;
}

function Modal(props: Props) {
    const { open, setOpen, children } = props;
    const containerModalClass: string = `${!open && "hidden"} fixed inset-0 bg-[rgba(0,0,0,0.5)] ${open && "flex justify-center items-center"} z-[1000]`;
    const escapePress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "escape") {
            setOpen(false);
        }
    }


    return (
        <div
            className={containerModalClass}
            onKeyUp={escapePress}
        >
            <div className="w-full xs:w-5/6 md:w-4/5 h-4/5 p-3 xs:p-2 md:p-3 lg:p-6 bg-white rounded-2xl animate-fastfade"
                onClick={(e) => e.stopPropagation()}>
                <div className="flex scroll-smooth w-full justify-end items-center">
                    <AiOutlineClose
                        fill="black"
                        size={24}
                        className='cursor-pointer'
                        onClick={() => setOpen(false)}
                    />
                </div>
                <LineDivider />
                <div className='w-full h-5/6  snap-mandatory overflow-y-scroll p-3'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal;