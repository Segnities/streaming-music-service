import React from "react";

import { User } from "firebase/auth";

import { BsThreeDots } from "react-icons/bs";

type OptionIcon = {
    title: string;
    icon: JSX.Element;
}

interface MoreOptionProps {
    options: { key: string, title: string, href?: string, icons?: OptionIcon[] | undefined, onClickCallback: () => void }[]
    visible: boolean;
}

interface MoreOptionsIconProps {
    user: User | null;

    setShowMore: React.Dispatch<React.SetStateAction<boolean>>;
    showMore: boolean;

}

export function MoreOptionsIcon({user, setShowMore, showMore}:MoreOptionsIconProps) {
    return (
        <div className="absolute hidden md:block top-3 right-20 cursor-pointer z-30">
            {
                user?.uid && (
                    <BsThreeDots size={32} color="white" onClick={() => setShowMore(!showMore)} />
                )
            }

        </div>
    );
}


export default function MoreOptions(props: MoreOptionProps) {
    return (
        <>
            {
                props.visible && (
                    <div className="absolute duration-200 ease-linear transition-all md:flex justify-center rounded-lg p-3 min-h-[150px] max-w-[200px]  bg-[#21106e] top-10 right-16  z-50">
                        {
                            props.options.map((option) => (
                                <p
                                    key={option.key}
                                    onClick={() => option.onClickCallback()}
                                    className="flex items-end font-semibold  uppercase pb-2 cursor-pointer text-xs  max-h-12 justify-center border-dashed border-white border-b-2  hover:border-[#7b64e2] hover:text-[#7b64e2]  my-2 text-white">
                                    {option.title}
                                </p>
                            ))
                        }
                    </div>
                )}
        </>

    );
}