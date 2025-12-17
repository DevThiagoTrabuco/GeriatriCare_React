import { AccountBalance, ArrowDropDown, ArrowRight, Badge, CalendarMonth, CalendarViewDay, CalendarViewMonth, Elderly, ExitToApp, Home, Settings } from "@mui/icons-material";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";

export default function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAppointmentsOpen, setAppointmentsOpen] = useState(false);

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsSidebarOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsSidebarOpen(false);
            setAppointmentsOpen(false);
            timeoutRef.current = null;
        }, 50);
    };

    const toggleAppointmentsSubmenu = () => {
        setAppointmentsOpen(!isAppointmentsOpen);
    }

    const timeoutRef = useRef(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <>
            <div className="w-16 shrink-0" />
            <aside
                className={`fixed top-0 left-0 h-screen z-50 bg-white shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                    isSidebarOpen ? "w-64" : "w-16"
                }`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="flex items-center justify-center h-16 border-b font-bold text-blue-600 text-xl">
                    {isSidebarOpen ? "GeriatriCare" : "GC"}
                </div>
                <nav className="p-2 flex-1 overflow-y-hidden">
                    <ul className="space-y-2">
                        <li>
                            <Link
                                to="/dashboard"
                                className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
                            >
                                <Home/>
                                <span className="whitespace-nowrap font-medium">
                                    {isSidebarOpen && "Início"}
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/residentes"
                                className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
                            >
                                <Elderly />
                                <span className="whitespace-nowrap font-medium">
                                    {isSidebarOpen && "Residentes"}
                                </span>
                            </Link>
                        </li>
                        <li>
                            <div
                                className="cursor-pointer flex items-center gap-4 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
                                onClick={toggleAppointmentsSubmenu}
                            >
                                <CalendarMonth />
                                <span className="whitespace-nowrap font-medium flex-1 flex justify-between items-center">
                                    {isSidebarOpen && (
                                        <>
                                            Agendamentos{" "}
                                            {isAppointmentsOpen ? (
                                                <ArrowDropDown />
                                            ) : (
                                                <ArrowRight />
                                            )}
                                        </>
                                    )}
                                </span>
                            </div>
                            {isAppointmentsOpen && isSidebarOpen && (
                                <ul className="pl-12 mt-1 space-y-1">
                                    <li>
                                        <Link
                                            to="/agendamentos/hoje"
                                            className="block p-2 rounded-lg hover:bg-blue-50 text-gray-600 hover:text-blue-600 text-sm transition-colors"
                                        >                                            
                                            <CalendarViewDay />
                                            <span className="whitespace-nowrap">
                                                Hoje
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/agendamentos/mes"
                                            className="block p-2 rounded-lg hover:bg-blue-50 text-gray-600 hover:text-blue-600 text-sm transition-colors"
                                        >
                                            <CalendarViewMonth />
                                            <span className="whitespace-nowrap">
                                                Mensal
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <Link
                                to="/colaboradores"
                                className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
                            >
                                <Badge />
                                <span className="whitespace-nowrap font-medium">
                                    {isSidebarOpen && "Funcionários"}
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/financeiro"
                                className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
                            >
                                <AccountBalance />
                                <span className="whitespace-nowrap font-medium">
                                    {isSidebarOpen && "Financeiro"}
                                </span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="p-2 border-t">
                    <Link
                        to="/configuracoes"
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
                    >
                        <Settings />
                        <span className="whitespace-nowrap font-medium">
                            {isSidebarOpen && "Configurações"}
                        </span>
                    </Link>
                    <Link
                        to="/login"
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
                    >
                        <ExitToApp />
                        <span className="whitespace-nowrap font-medium">
                            {isSidebarOpen && "Sair"}
                        </span>
                    </Link>
                </div>
            </aside>
        </>
    );
}
