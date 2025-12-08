import { Outlet } from "react-router";

export default function AdminLayout() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <main>
                <Outlet />
            </main>
        </div>
    )
}