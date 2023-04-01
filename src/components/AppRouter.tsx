import { useLocation } from "react-router";

import AppTemplate from "../templates/AppTemplate";
import AuthenticationTemplate from "../templates/AuthenticationTemplate";
import { authenticationRoutes } from "../routes"
import { AuthContext } from "../context";
import { useContext, useEffect } from "react";

function AppRouter() {
    const location = useLocation();
    const pathname = location.pathname;
    const authContext = useContext(AuthContext);

    const isAuthPath = authenticationRoutes.filter(route => route.path === pathname).length > 0;

    useEffect(() => {
        authContext?.setIsAuth(authContext?.user ? true : false);
    });


    return (
        <div className="relative flex min-h-screen" data-testid='templateId'>
            {
                isAuthPath && !authContext?.isAuth ?
                    <AuthenticationTemplate /> : <AppTemplate />
            }
        </div>

    );
}

export default AppRouter