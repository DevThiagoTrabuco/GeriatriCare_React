import { createBrowserRouter } from "react-router";
import LandingLayout from "../layouts/LandingLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminLayout from "../layouts/AdminLayout";

import * as Landing from '../routes/landing.routes'
import * as Auth from '../routes/auth.routes'
import * as Dash from '../routes/dashboard.routes'
import * as Admin from '../routes/admin.routes'

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
        element: <DashboardLayout />,
        children: Dash.routes,
    },
    {
        element: <AdminLayout />,
        children: Admin.routes,
    },
]);