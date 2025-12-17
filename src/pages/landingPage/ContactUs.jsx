import { useState } from "react";
import { Email, Phone, LocationOn, Send } from "@mui/icons-material";

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">

            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Fale Conosco
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Estamos aqui para ajudar. Envie sua dúvida ou solicite
                        uma demonstração.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                Nossos Contatos
                            </h2>

                            <div className="flex items-start mb-6">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4 shrink-0">
                                    <Phone />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800">
                                        Telefone
                                    </h3>
                                    <p className="text-gray-600">
                                        (11) 3333-4444
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                        Seg-Sex, 9h às 18h
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start mb-6">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4 shrink-0">
                                    <Email />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800">
                                        Email
                                    </h3>
                                    <p className="text-gray-600">
                                        contato@geriatricare.com.br
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                        Resposta em até 24h
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4 shrink-0">
                                    <LocationOn />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800">
                                        Endereço
                                    </h3>
                                    <p className="text-gray-600">
                                        Av. Paulista, 1000 - Bela Vista
                                    </p>
                                    <p className="text-gray-600">
                                        São Paulo - SP, 01310-100
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Envie uma Mensagem
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="name"
                                >
                                    Nome
                                </label>
                                <input
                                    className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Seu nome"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="seu@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="subject"
                                >
                                    Assunto
                                </label>
                                <input
                                    className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    placeholder="Assunto da mensagem"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="message"
                                >
                                    Mensagem
                                </label>
                                <textarea
                                    className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 transition"
                                    id="message"
                                    name="message"
                                    placeholder="Como podemos ajudar?"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 flex items-center justify-center"
                            >
                                <Send className="mr-2" fontSize="small" />
                                Enviar Mensagem
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
