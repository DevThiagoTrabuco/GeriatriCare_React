import { useState } from "react";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <aside className={`bg-white shadow transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
                <nav className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <button onClick={toggleSidebar}>{isOpen ? 'Fechar' : 'Abrir'}</button>
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    );
}
