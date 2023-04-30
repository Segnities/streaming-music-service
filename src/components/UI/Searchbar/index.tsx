import { useState, FormEvent } from "react";

import { useNavigate } from "react-router-dom";

import { FiSearch } from "react-icons/fi";
import classNames from "classnames";

interface SupportSearchbar {
    bgVariant?: "gray";
    placeholder: string;
}


export function SupportSearchbar(props: SupportSearchbar) {
    const formClassName = classNames(
        'rounded-md',
        {
            "bg-gray-800 text-gray-300": props.bgVariant === "gray",
        }
    );

    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`/search/${query}`);
    };

    return (
        <form autoComplete="off" className={formClassName} onSubmit={handleSubmit}>
            <label htmlFor="search-field" className="sr-only">
                Search all Songs
            </label>
            <div className="relative flex flex-row  rounded-sm h-10 justify-start items-center">
                <FiSearch className="ml-2" />
                <input
                    type="text"
                    name="search-field"
                    id="search-field"
                    placeholder={props.placeholder}
                    autoComplete="off"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); }}
                    className={`flex-1 text-base border-none rounded-md outline-none placeholder-gray-400 py-1 px-4 font-semibold appearance-none bg-transparent`}
                />
            </div>
        </form>
    );
}

export default function Searchbar() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`/search/${query}`);
    };

    return (
        <form
            autoComplete="off"
            className="p-2 text-gray-400 focus-within:text-gray-600"
            onSubmit={handleSubmit}
        >
            <label htmlFor="search-field" className="sr-only">
                Search all Songs
            </label>
            <div className="flex flex-row justify-start items-center">
                <FiSearch className="w-5 h-5 ml-4" />
                <input
                    type="text"
                    name="search-field"
                    id="search-field"
                    placeholder="Search..."
                    autoComplete="off"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); }}
                    className="flex-1 text-base text-white bg-transparent border-none outline-none placeholder-gray-400 p-5 appearance-none"
                />
            </div>
        </form>
    );
}
