import { useState } from "react";
import { NavLink } from "react-router-dom";


import { RiCloseLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";
import Logo from "../../../assets/logo.svg";

import NavLinks from "../NavLinks";


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
