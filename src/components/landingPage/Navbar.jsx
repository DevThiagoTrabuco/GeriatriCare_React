import { Link, useNavigate } from "react-router";

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <span className="text-2xl font-bold text-blue-600">
                                GeriatriCare
                            </span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => navigate("/")}
                                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition"
                            >
                                Home
                            </button>
                            <button
                                onClick={() => navigate("/contact")}
                                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition"
                            >
                                Contato
                            </button>
                            <Link
                                to="/login"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition shadow-md"
                            >
                                Entrar
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
    );
}