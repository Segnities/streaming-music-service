import { useLocation } from "react-router";

import AppTemplate from "../templates/AppTemplate";
import AuthenticationTemplate from "../templates/AuthenticationTemplate";

function AppRouter() {
    const location = useLocation();
    const isAuthPath = location.pathname === "/login" || location.pathname === "/sign-up"

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