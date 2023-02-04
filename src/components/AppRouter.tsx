import { Route, Routes } from "react-router";

import { privateRoutes, publicRoutes } from "../routes";

function AppRouter() {
    return (
        <Routes>
            {publicRoutes.map((route) => (
                <Route key={route.id} path={route.path} element={<route.element />} />
            ))}
            {privateRoutes.map((route) => (
                <Route key={route.id} path={route.path} element={<route.element />} />
            ))}
        </Routes>
    );
}

export default AppRouter