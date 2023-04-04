import { useLocation } from "react-router";

import AppLayout from "../layouts/AppLayout";
import AuthenticationLayout from "../layouts/AuthenticationLayout";
import { authenticationRoutes } from "../routes"
import { useSelector } from "react-redux";
import { UserAuthSelector } from "../store/reducers/auth";

function AppRouter() {
    const location = useLocation();
    const pathname = location.pathname;
    const { isAuth } = useSelector((state: UserAuthSelector) => state.userAuth);

    const isAuthPath = authenticationRoutes.filter(route => route.path === pathname).length > 0;

    if (isAuth == false && isAuthPath) {
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