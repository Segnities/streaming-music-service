import React from "react";

import { User } from "firebase/auth";

import LineDivider from "../LineDivider";

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

interface MoreActionsGroupProps {
    user: User | null;
    showMore: boolean;
    setShowMore: React.Dispatch<React.SetStateAction<boolean>>;
    optionsList: Option[];

}

export function MoreActionsGroup(props: MoreActionsGroupProps) {
    const { user, showMore, setShowMore, optionsList } = props;
    return (
        <>
            <div className="relative flex flex-col my-5">
                <MoreOptionsIcon
                    user={user}
                    showMore={showMore}
                    setShowMore={setShowMore}
                />
                {
                    user?.uid && (
                        <MoreOptions
                            options={optionsList}
                            visible={showMore}
                        />)
                }
                <LineDivider />
            </div>

            {
                user?.uid && (
                    <MoreActionsList options={optionsList} />

                )
            }

        </>
    );
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
        <div className="hidden md:block z-30">
            {
                user?.uid && (
                    <BsThreeDots size={32} className="cursor-pointer" color="white" onClick={() => setShowMore(!showMore)} />
                )
            }

        </div>
    );
}


export function MoreOptions(props: MoreOptionProps) {
    return (
        <>
            {
                props.visible && (
                    <div className="hidden absolute top-10 duration-200 ease-linear transition-all md:flex flex-col items-start justify-start rounded-sm p-1 min-h-[150px] w-72 bg-[#21106e] z-50">
                        {
                            props.options.map((option) => (
                                <p
                                    key={option.key}
                                    onClick={() => option.onClickCallback()}
                                    className="w-full text-start flex items-center font-semibold first-letter:uppercase cursor-default text-sm max-h-12 justify-start px-4 py-2 hover:rounded-md  hover:border-[#7b64e2] hover:text-[#7b64e2] hover:bg-[#110642]  my-1 text-white">
                                    {option.title}
                                </p>
                            ))
                        }
                    </div>
                )}
        </>

    );
}