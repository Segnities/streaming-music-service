import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

import { privateLinks, publicLinks } from "../../../routes";
import { UserAuthSelector } from "../../../store/reducers/auth";

import { User } from "firebase/auth";

function NavLinks() {
    const { user: userData, isAuth } = useSelector((state: UserAuthSelector) => state.userAuth);
    const user: User = JSON.parse(userData as string);

    const { pathname } = useLocation();

    const isActiveLink = (key: string): boolean => {
        return pathname === key;
    }

    return (
        <div className="mt-10">
            {isAuth ? privateLinks.map((link) => (
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
                    className={`flex flex-row justify-start 
                    items-center my-8 text-sm font-medium text-gray-400 
                    hover:text-cyan-400 ${isActiveLink(link.to) && `text-cyan-400`} 
                    ${isActiveLink(link.to) && "border-r-indigo-600 border-r-4"}`}
                >
                    <link.icon className="w-6 h-6 mr-2" />
                    {link.name}
                </NavLink>
            ))}
        </div>
    );
}

export default NavLinks;