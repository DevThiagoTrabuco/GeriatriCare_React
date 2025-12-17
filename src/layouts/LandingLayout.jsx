import { Outlet } from "react-router";

export default function LandingLayout() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <main>
                <Outlet />
            </main>
        </div>
    );
}
