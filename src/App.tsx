import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { routes } from "./routes";

function App() {
  return (
    <div className="relative flex h-screen bg-blue-800">
      <div className="sidebar"></div>
      <div className="flex flex-1 flex-col  bg-gradient-to-br from-black to-[#121286]">
        <div className="searchbar"></div>
        <div className="px-6 h-[calc(100vh- 2px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <BrowserRouter>
              <AppRouter/>
            </BrowserRouter>
          </div>
          <div className="xl:sticky relative top-0 h-fit">
            <div className="top-play"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
