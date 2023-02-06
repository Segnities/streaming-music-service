import { useSelector } from "react-redux";
import { Routes, Route } from "react-router";

import Sidebar from "../components/UI/Sidebar";
import Searchbar from "../components/UI/Searchbar";
import TopCharts from "../pages/TopCharts";
import MusicPlayer from "../components/MusicPlayer";

import { publicRoutes } from "../routes";

import { SelectorPlayerState } from "../API/types";


function AppTemplate() {
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

export default AppTemplate;