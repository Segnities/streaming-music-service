import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import { privateLinks, publicLinks } from "../../../routes";

import { RiCloseLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";
import Logo from "../../../assets/logo.svg";
import { AuthContext } from "../../../context";

function NavLinks() {
  const authContext = useContext(AuthContext);
  return (
    <div className="mt-10">
      {authContext?.user?.uid ? privateLinks.map((link) => (
        <NavLink
          to={link.to}
          key={link.to}
          className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
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

function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#09061a]">
        <NavLink to={"/"} onDragStart={(event) => event?.preventDefault()}>
          <img src={Logo} alt="logo" className="w-full h-14 object-contain" />
        </NavLink>
        <NavLinks />
      </div>

      <div className="absolute md:hidden block top-6 right-3">
        {isMobileMenuOpen ? (
          <RiCloseLine
            className={"w-6 h-6 text-white mr-2 cursor-pointer"}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        ) : (
          <HiOutlineMenu
            className={"w-6 h-6 text-white mr-2 cursor-pointer"}
            onClick={() => setIsMobileMenuOpen(true)}
          />
        )}
      </div>

      <div
        className={`absolute w-2/3 top-0 min-h-full bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${isMobileMenuOpen ? "left-0" : "-left-full"
          }`}
      >
        <img src={Logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks />
      </div>
    </>
  );
}

export default Sidebar;
