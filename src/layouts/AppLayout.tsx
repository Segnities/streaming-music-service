import { useSelector } from "react-redux";
import { Routes, Route } from "react-router";

import Sidebar from "../components/UI/Sidebar";
import Searchbar from "../components/UI/Searchbar";
import TopChartsWidget from "../components/TopCharts";
import MusicPlayer from "../components/MusicPlayer";

import { privateRoutes, publicRoutes } from "../routes";

import { SelectorPlayerState } from "../API/types";
import { UserAuthSelector } from "../store/reducers/auth";
import { User } from "firebase/auth";


function AppLayout() {
    const { activeSong } = useSelector(
        (state: SelectorPlayerState) => state.player
    );
    const { user: userData } = useSelector((state: UserAuthSelector) => state.userAuth);
    const user: User = JSON.parse(userData as string) as User;
    console.log('User data');
    console.log(user);


    return (
        <>
            <Sidebar />
            <div className="flex flex-1 flex-col bg-gradient-to-br from-black to-[#121286]">
                <Searchbar />
                <div className="px-6 py-8 h-[calc(100vh- 2px)] flex xl:flex-row flex-col-reverse">
                    <div className="flex-1 h-fit pb-40" data-testid="routes-id">
                        <Routes>
                            {user?.uid ? privateRoutes.map((route) => (
                                <Route key={route.id} path={route.path} element={<route.element />} />
                            )) : publicRoutes.map((route) => (
                                <Route key={route.id} path={route.path} element={<route.element />} />
                            ))}
                        </Routes>
                    </div>
                    <div className="xl:sticky relative top-0 h-fit">
                        <TopChartsWidget />
                    </div>
                </div>
            </div>
            {activeSong?.title && <MusicPlayer />}
        </>
    )
}

export default AppLayout;