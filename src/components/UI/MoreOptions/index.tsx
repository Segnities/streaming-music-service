import React from "react";

import { User } from "firebase/auth";

import { BsThreeDots } from "react-icons/bs";

type OptionIcon = {
    title: string;
    icon: JSX.Element;
}

type Option = {
    key: string,
    title: string,
    href?: string,
    icons?: OptionIcon[] | undefined,
    onClickCallback: () => void
}

interface MoreOptionProps {
    options: Option[];
    visible: boolean;
}

interface MoreOptionsIconProps {
    user: User | null;
    setShowMore: React.Dispatch<React.SetStateAction<boolean>>;
    showMore: boolean;
}

interface MoreActionsListProps {
    options: Option[];
}

export function MoreActionsList(props: MoreActionsListProps) {
    return (
        <section className="block md:hidden my-5">
            <h5 className="text-white font-bold my-3 text-2xl">Actions:</h5>
            <ul className="flex flex-col items-start justify-center">
                {
                    props.options.map((option) => (
                        <li
                            key={option.key}
                            className="w-full h-12 flex items-center justify-center my-2 bg-[#4c426e] rounded-md focus-within:bg-transparent border-2 border-transparent focus-within:border-white focus-within:transition-colors focus-within:ease-out focus-within:duration-100">
                            <button className="text-white w-full h-full uppercase font-bold text-sm rounded-xl"
                                onClick={() => option.onClickCallback()}
                            >{option.title}</button>
                        </li>
                    ))
                }
            </ul>
        </section>
    );
}

export function MoreOptionsIcon({ user, setShowMore, showMore }: MoreOptionsIconProps) {
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
                    <div className="hidden absolute duration-200 ease-linear transition-all md:flex justify-center rounded-lg p-3 min-h-[150px] min-w-[175px]  bg-[#21106e] top-10 right-16  z-50">
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