import { Routes, Route } from "react-router";
import { NavLink } from "react-router-dom";
import { authenticationRoutes } from "../routes";
import { IoIosArrowRoundBack } from "react-icons/io";

import Logo from "../assets/logo.svg";

function AuthenticationLayout() {
    return (
        <div className="flex flex-1 flex-col overflow-x-hidden h-screen">
            <div className="m-2">
                <NavLink to={'/'} className="flex items-center text-lg"><IoIosArrowRoundBack size={24} />Back</NavLink>
            </div>
            <div className="pt-1 pb-2 mb-10 border-b-2">
                <div className="flex justify-center items-center pt-5 pb-3">
                    <img src={Logo} alt="vite" className="w-24 h-14" onDragStart={(e) => e.preventDefault()} />
                    <h2 className="text-3xl font-bold">Vite</h2>
                </div>
            </div>
            <Routes>
                {authenticationRoutes.map((route) => (<Route key={route.id} path={route.path} element={<route.element />} />))}
            </Routes>
        </div>
    )
}

export default AuthenticationLayout;