import { Outlet } from "react-router";
import Sidebar from "../components/dashboard/sidebar";

export default function DashboardLayout() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
}
