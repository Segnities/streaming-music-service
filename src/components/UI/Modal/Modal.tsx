import React from "react";

import { GrClose } from "react-icons/gr";
import LineDivider from "../LineDivider";
import { createPortal } from "react-dom";

export interface DefaultModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    overscroll?: boolean;
    children: React.ReactNode;
}

export default function Modal(props: DefaultModalProps) {
    const { open, setOpen, children } = props;
    const containerModalClass = `${!open && "hidden"} fixed inset-0 bg-[rgba(0,0,0,0.5)] ${open && "flex justify-center items-center"} z-[1000]`;
    const escapePress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.keyCode === 27) {
            setOpen(false);
        }
    };

    return (
        <>
            {
                createPortal((
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
                                <GrClose
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
                ), document.body)
            }
        </>
    );
}


