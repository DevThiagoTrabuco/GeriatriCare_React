import { createBrowserRouter } from "react-router";
import LandingLayout from "../layouts/LandingLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import { SecurityRoute } from "../components/common/SecurityRoutes";

import * as Landing from './landing.routes';
import * as Auth from './auth.routes';
import * as Dash from './dashboard.routes';

export const router = createBrowserRouter([
    {
        element: <LandingLayout />,
        children: Landing.routes,
    },
    {
        element: <AuthLayout />,
        children: Auth.routes,
    },
    {
        element: <SecurityRoute />,
        children: [
            {
                element: <DashboardLayout />,
                children: Dash.routes,
            }
        ]
    },
    {
        path: "*",
        element: <div>Página não encontrada</div>,
    }
]);