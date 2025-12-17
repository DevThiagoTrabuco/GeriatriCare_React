import { Outlet } from "react-router";
import Navbar from "../components/landingPage/Navbar";
import Footer from "../components/landingPage/Footer";

export default function LandingLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
