import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Searchbar from "./components/UI/Searchbar";
import Sidebar from "./components/UI/Sidebar";

function App() {
  return (
    <div className="relative flex">
      <Sidebar />
      <div className="flex flex-1 flex-col  bg-gradient-to-br from-black to-[#121286]">
        <Searchbar />
        <div className="px-6 h-[calc(100vh- 2px)] flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <BrowserRouter>
              <AppRouter />
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
