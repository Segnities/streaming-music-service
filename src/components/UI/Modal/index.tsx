import React from "react";

import { AiOutlineClose } from "react-icons/ai";
import LineDivider from "../LineDivider";

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    overscroll?: boolean;
    children: React.ReactNode;
}

function Modal(props: Props) {
    const { open, setOpen, children } = props;
    const containerModalClass = `${!open && "hidden"} fixed inset-0 bg-[rgba(0,0,0,0.5)] ${open && "flex justify-center items-center"} z-[1000]`;
    const escapePress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.keyCode === 27) {
            setOpen(false);
        }
    };

    return (
        <div
            className={containerModalClass}
            onKeyUp={escapePress}
            onClick={(e) => {
                setOpen(false);
                e.stopPropagation();
            }}
        >
            <div className="w-5/6 md:w-4/5 h-4/5 p-3 xs:p-2 md:p-3 lg:p-6 bg-white rounded-2xl animate-fastfade"
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
                <div className={`w-full h-5/6 ${props.overscroll ? "snap-mandatory overflow-y-scroll" : ""}  p-3`}>
                    {children}
                </div>
            </div>
        </div>
    );
}


export function ModalSm(props: Props) {
    const { open, setOpen, children } = props;
    const containerModalClass = `${!open && "hidden"} fixed inset-0 bg-[rgba(0,0,0,0.5)] ${open && "flex justify-center items-center"} z-[1000]`;
    const escapePress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "escape") {
            setOpen(false);
        }
    };

    return (
        <div
            className={containerModalClass}
            onKeyUp={escapePress}
            onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
            }}
        >
            <div className="w-3/5 sm:2/5 h-auto p-3 xs:p-2 md:p-3 lg:p-6 bg-white rounded-lg animate-fastfade"
                onClick={(e) => e.stopPropagation()}>
                <div className="flex w-full justify-end items-center">
                    <AiOutlineClose
                        fill="black"
                        size={24}
                        className='cursor-pointer'
                        onClick={() => setOpen(false)}
                    />
                </div>
                <LineDivider />
                <div className={`w-full h-5/6  p-3 ${props.overscroll ? "snap-mandatory overflow-y-scroll" : ""}`}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;