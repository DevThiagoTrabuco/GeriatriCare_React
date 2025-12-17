export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <span className="text-xl font-bold">GeriatriCare</span>
                        <p className="text-gray-400 text-sm mt-1">
                            © 2024 Todos os direitos reservados.
                        </p>
                    </div>
                    <div className="flex space-x-6">
                        <a
                            href="#"
                            className="text-gray-400 hover:text-white transition"
                        >
                            Sobre
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-white transition"
                        >
                            Privacidade
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-white transition"
                        >
                            Termos
                        </a>
                    </div>
                </div>
            </footer>
    );
}