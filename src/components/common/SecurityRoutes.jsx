import { Navigate, Outlet } from "react-router";
import { AuthService } from "../../services/AuthService";

export const SecurityRoute = () => {
    const isAuth = AuthService.isAuthenticated();

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};