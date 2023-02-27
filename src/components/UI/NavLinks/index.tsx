import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { AuthContext } from "../../../context";
import { privateLinks, publicLinks } from "../../../routes";



function NavLinks() {
    const authContext = useContext(AuthContext);
    const { pathname } = useLocation();

    const isActiveLink = (key: string): boolean => {
        return pathname === key;
    }

    return (
        <div className="mt-10">
            {authContext?.user?.uid ? privateLinks.map((link) => (
                <NavLink
                    to={link.to}
                    key={link.to}
                    className={`flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400 ${isActiveLink(link.to) && `text-cyan-400`} ${isActiveLink(link.to) && "border-r-indigo-600 border-r-4"}`}
                >
                    <link.icon className="w-6 h-6 mr-2" />
                    {link.name}
                </NavLink>
            )) : publicLinks.map((link) => (
                <NavLink
                    to={link.to}
                    key={link.to}
                    className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
                >
                    <link.icon className="w-6 h-6 mr-2" />
                    {link.name}
                </NavLink>
            ))}
        </div>
    );
}

export default NavLinks;