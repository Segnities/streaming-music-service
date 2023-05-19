import React from "react";

import { GrClose } from "react-icons/gr";
import LineDivider from "../LineDivider";
import { createPortal } from "react-dom";

interface DefaultModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    overscroll?: boolean;
    children: React.ReactNode;
}

interface FitModalProps extends DefaultModalProps {
    tailwindWidth?: string;
    header?: React.ReactNode;

}

function Modal(props: DefaultModalProps) {
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


export function FitModal(props: FitModalProps) {
    const { open, setOpen, tailwindWidth, children } = props;
    const containerModalClass = `${!open && "hidden"} fixed inset-0 bg-[rgba(0,0,0,0.5)] ${open && "flex justify-center items-center"} z-[1000]`;
    const escapePress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "escape") {
            setOpen(false);
        }
    };

    return (
        <>
            {
                createPortal(
                    (
                        <div
                            className={containerModalClass}
                            onKeyUp={escapePress}
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpen(false);
                            }}
                        >
                            <div className={`${tailwindWidth ? tailwindWidth : "w-4/5 sm:w-3/5 lg:w-2/5"} max-h-[512px] p-3 md:p-2 lg:p-6 bg-white rounded-lg animate-fastfade`}
                                onClick={(e) => e.stopPropagation()}>
                                <div className={`flex w-full justify-end items-center ${props.overscroll ? "my-3" : ""}`}>
                                    <GrClose
                                        size={24}
                                        className='cursor-pointer text-black self-end'
                                        onClick={() => setOpen(false)}
                                    />
                                </div>
                                <div className="flex flex-col w-full h-full">
                                    {
                                        props?.header
                                    }
                                    <div className={`w-full h-5/6  p-1 ${props.overscroll ? "max-h-[328px] snap-mandatory overflow-y-scroll" : ""}`}>
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ),
                    document.body
                )
            }

        </>
    );
}

export default Modal;