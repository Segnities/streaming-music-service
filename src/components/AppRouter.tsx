import { useLocation } from "react-router";

import AppTemplate from "../templates/AppTemplate";
import AuthenticationTemplate from "../templates/AuthenticationTemplate";
import { authenticationRoutes } from "../routes"

function AppRouter() {
    const location = useLocation();
    const pathname = location.pathname;
    const isAuthPath = authenticationRoutes.filter(route => route.path === pathname).length > 0

    return (
        <div className="relative flex min-h-screen">
            {
                isAuthPath ?
                    <AuthenticationTemplate /> : <AppTemplate />
            }

        </div>

    );
}

export default AppRouter