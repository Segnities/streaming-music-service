import { Dispatch, SetStateAction } from "react"; 

import { SupportSearchbar } from "./UI/Searchbar";

import { MdOutlineClose } from "react-icons/md";


interface FindMoreSongsProps {
    showRecommended: boolean;
    setShowRecommended: Dispatch<SetStateAction<boolean>>;
}

export default function FindMoreSongs(props:FindMoreSongsProps ) {
    const { showRecommended, setShowRecommended } = props;

    return (
        <>
            {
                !showRecommended && (
                    <section className="flex items-center justify-between w-full">
                        <div className="flex flex-col gap-6">
                            <h1 className="text-gray-300 text-2xl font-semibold">Let&apos;s pick some tracks for your
                                playlist</h1>
                            <SupportSearchbar
                                bgVariant="gray"
                                placeholder="Search songs..."
                            />
                        </div>
                        <MdOutlineClose size={34} color="gray" className="cursor-pointer"
                            onClick={() => setShowRecommended(true)} />
                    </section>
                )
            }

        </>
    );
}