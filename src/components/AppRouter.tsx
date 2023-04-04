import { useLocation } from "react-router";

import AppLayout from "../layouts/AppLayout";
import AuthenticationLayout from "../layouts/AuthenticationLayout";
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

    if (isAuthPath && !authContext?.isAuth) {
        return (
            <div className="relative flex min-h-screen" data-testid='templateId'>
                <AuthenticationLayout />
            </div>
        );
    } else {
        return (
            <div className="relative flex min-h-screen" data-testid='templateId'>
                <AppLayout />
            </div>
        );
    }

}

export default AppRouter