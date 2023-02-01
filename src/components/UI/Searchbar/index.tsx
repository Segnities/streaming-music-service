import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { FiSearch } from "react-icons/fi";

function Searchbar() {
    const [query, setQuery] = useState('');
    return (
        <form autoComplete="off" className="p-2 text-gray-400 focus-within:text-gray-600">
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
                    onChange={(e) => { setQuery(e.target.value) }}
                    className="flex-1 text-base text-white bg-transparent border-none outline-none placeholder-gray-400 p-5 appearance-none"
                />
            </div>
        </form>
    )
}

export default Searchbar;