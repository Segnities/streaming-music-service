import { useState } from "react";

import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { AuthContext } from "./context";

import AppRouter from "./components/AppRouter";

import Searchbar from "./components/UI/Searchbar";
import Sidebar from "./components/UI/Sidebar";

import MusicPlayer from "./components/MusicPlayer";
import TopCharts from "./components/TopCharts";

import { SelectorPlayerState } from "./API/types";

function App() {
  const { activeSong } = useSelector(
    (state: SelectorPlayerState) => state.player
  );
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AuthContext.Provider value={{isAuth, setIsAuth, isLoading}}>
    <BrowserRouter>
    <div className="relative flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col  bg-gradient-to-br from-black to-[#121286]">
        <Searchbar />
        <div className="px-6 py-8 h-[calc(100vh- 2px)] flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <AppRouter />
          </div>
          <div className="xl:sticky relative top-0 h-fit">
            <TopCharts />
          </div>
        </div>
      </div>
      {activeSong?.title && <MusicPlayer />}
    </div>
    </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
