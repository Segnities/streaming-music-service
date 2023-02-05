import { Route, Routes, useLocation } from "react-router";

import { useSelector } from "react-redux";

import { privateRoutes, publicRoutes, authenticationRoutes } from "../routes";

import Logo from "../assets/logo.svg";

import Sidebar from "./UI/Sidebar";
import Searchbar from "./UI/Searchbar";
import TopCharts from "./TopCharts";
import MusicPlayer from "./MusicPlayer";

import { SelectorPlayerState } from "../API/types";


function Content() {
    const { activeSong } = useSelector(
        (state: SelectorPlayerState) => state.player
    );
    return (<>
        <Sidebar />
        <div className="flex flex-1 flex-col  bg-gradient-to-br from-black to-[#121286]">
            <Searchbar />
            <div className="px-6 py-8 h-[calc(100vh- 2px)] flex xl:flex-row flex-col-reverse">
                <div className="flex-1 h-fit pb-40">
                    <Routes>
                        {publicRoutes.map((route) => (
                            <Route key={route.id} path={route.path} element={<route.element />} />
                        ))}
                    </Routes>
                </div>
                <div className="xl:sticky relative top-0 h-fit">
                    <TopCharts />
                </div>
            </div>
        </div>
        {activeSong?.title && <MusicPlayer />}
    </>)
}

function Authentication() {
    return <div className="flex flex-1 flex-col overflow-x-hidden h-screen">
        <div className="py-6 mb-14 border-b-2 border-gray-500">
            <div className="flex justify-center items-center pt-5">
                <img src={Logo} alt="vite" className="w-24 h-14" onDragStart={(e) => e.preventDefault()} />
                <h2 className="text-3xl font-bold">Vite</h2>
            </div>
        </div>
        <Routes>
            {authenticationRoutes.map((route) => (<Route key={route.id} path={route.path} element={<route.element />} />))}
        </Routes>
    </div>
}

function AppRouter() {
    const location = useLocation();
    const isAuthPath = location.pathname === "/login" || location.pathname === "/sign-up"

    return (
        <div className="relative flex min-h-screen">
            {
                isAuthPath ?
                    <Authentication /> : <Content />
            }

        </div>

    );
}

export default AppRouter