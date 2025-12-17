import { VerifiedUser, Favorite, Speed } from "@mui/icons-material";

export default function LandingPage() {

    return (
        <div className="min-h-screen bg-white font-sans text-gray-800">
            <div className="bg-blue-50 py-20">
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-10 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                            Gestão Completa e Humanizada para Casas de Repouso
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Simplifique a administração, melhore o cuidado com
                            os residentes e tenha controle total financeiro e
                            operacional em um só lugar.
                        </p>
                        <div className="flex space-x-4">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition transform hover:-translate-y-1">
                                Começar Agora
                            </button>
                            <button className="bg-white hover:bg-gray-50 text-blue-600 font-bold py-3 px-6 rounded-lg shadow border border-gray-200 transition">
                                Saiba Mais
                            </button>
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <div className="w-full max-w-md h-64 bg-blue-200 rounded-xl shadow-inner flex items-center justify-center text-blue-500">
                            <span className="text-lg font-semibold">
                                Imagem Ilustrativa do Dashboard
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-16 bg-white">
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Por que escolher o GeriatriCare?
                        </h2>
                        <p className="mt-4 text-xl text-gray-600">
                            Funcionalidades pensadas para o dia a dia da sua
                            instituição.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                                <VerifiedUser />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                Gestão de Residentes
                            </h3>
                            <p className="text-gray-600">
                                Prontuários eletrônicos, histórico médico e
                                controle de medicamentos centralizados e
                                seguros.
                            </p>
                        </div>

                        <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-4">
                                <Favorite />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                Cuidado Humanizado
                            </h3>
                            <p className="text-gray-600">
                                Acompanhamento de atividades diárias,
                                agendamentos e contato facilitado com
                                familiares.
                            </p>
                        </div>

                        <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                                <Speed />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                Eficiência Operacional
                            </h3>
                            <p className="text-gray-600">
                                Controle financeiro, gestão de funcionários e
                                relatórios automáticos para tomada de decisão.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
