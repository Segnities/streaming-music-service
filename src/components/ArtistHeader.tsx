import { PurpleAttributes } from "../API/types";

interface Props {
    artistImage: string | undefined;
    attributes: PurpleAttributes;
}


function ArtistHeader(props: Props) {
    const { artistImage, attributes } = props;

    return (
        <div className="relative w-full flex flex-col">
            <div className="w-full h-28 bg-gradient-to-l from-transparent to-black sm:h-52"></div>
            <div className="absolute inset-0 flex flex-row items-center">
                <img
                    src={artistImage}
                    alt="art"
                    className="w-28 sm:w-48 h-28 sm:h-48 rounded-full object-cover border-2 shadow-xl shadow-black"
                    onDragStart={(e) => e.preventDefault()}
                />
                <div className="ml-5 mb-3">
                    <p className="text-3xl sm:text-2xl text-white mb-2">
                        {attributes?.name}
                    </p>
                    <ul className="flex flex-row text-gray-500 list-none">
                        {attributes.genreNames.map((genre) => (
                            <li key={genre} className="text-xl first:mx-0 last:mx-0 mx-2">
                                {genre}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="w-full h-24 sm:h-24"></div>
        </div>
    );
}
export default ArtistHeader;