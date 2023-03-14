import React from "react";

import { AiOutlineClose } from "react-icons/ai";
import LineDevider from "../LineDevider";

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

    return <div
        className={containerModalClass}
        onKeyUp={escapePress}
    >
        <div className="min-w-[50%] min-h-[300px] p-6 bg-white rounded-2xl"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex w-full justify-end items-center">
                <AiOutlineClose
                    fill="black"
                    size={24}
                    className='cursor-pointer'
                    onClick={() => setOpen(false)}
                />
            </div>
            <LineDevider />
            {children}
        </div>
    </div>
}

export default Modal;