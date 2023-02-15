import { useLocation } from "react-router";

import AppTemplate from "../templates/AppTemplate";
import AuthenticationTemplate from "../templates/AuthenticationTemplate";
import { authenticationRoutes } from "../routes"
import { AuthContext } from "../context";
import { useContext } from "react";

function AppRouter() {
    const location = useLocation();
    const pathname = location.pathname;
    const authContext = useContext(AuthContext);
    const uid = JSON.parse(localStorage.getItem("x-remember-user"))?.uid;



    const isAuthPath = authenticationRoutes.filter(route => route.path === pathname).length > 0;

    console.log(isAuthPath && !uid);

    return (
        <div className="relative flex min-h-screen">
            {
                isAuthPath && !uid ?
                    <AuthenticationTemplate /> : <AppTemplate />
            }
        </div>

    );
}

export default AppRouter