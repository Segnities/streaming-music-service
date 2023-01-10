import { Route, Routes } from "react-router";

import { routes } from "../routes";

function AppRouter() {
    return (
      <Routes>
        {routes.map((route) => (
          <Route key={route.id} path={route.path} element={<route.element />} />
        ))}
      </Routes>
    );
}

export default AppRouter;