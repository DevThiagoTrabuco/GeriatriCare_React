import { useState } from "react";
import { ArrowBack, Save } from "@mui/icons-material";
import { Link, useNavigate } from "react-router";
import { FuncionarioService } from "../../../services/FuncionarioService";
import { CircularProgress, Alert } from "@mui/material";

export default function EmployeesRegister() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");

    const [formData, setFormData] = useState({
        nome: "",
        funcao: "",
        telefone: "",
        email: "",
        cpf: "",
        rg: "",
        dataNascimento: "",
        endereco: {
            cep: "",
            logradouro: "",
            numero: "",
            bairro: "",
            cidade: "",
            unidadeFederativa: "SP",
        },
    });

    // Máscaras de entrada
    const masks = {
        cpf: (v) =>
            v
                .replace(/\D/g, "")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d{1,2})/, "$1-$2")
                .slice(0, 14),
        rg: (v) =>
            v
                .replace(/\D/g, "")
                .replace(/(\d{2})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d{1})/, "$1-$2")
                .slice(0, 12),
        telefone: (v) =>
            v
                .replace(/\D/g, "")
                .replace(/^(\d{2})(\d)/, "($1) $2")
                .replace(/(\d)(\d{4})$/, "$1-$2")
                .slice(0, 15),
        cep: (v) =>
            v
                .replace(/\D/g, "")
                .replace(/^(\d{5})(\d)/, "$1-$2")
                .slice(0, 9),
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let finalVal = value;

        if (masks[name]) {
            finalVal = masks[name](value);
        }

        setFormData((prevState) => ({
            ...prevState,
            [name]: finalVal,
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        let finalVal = value;
        if (name === "cep") finalVal = masks.cep(value);

        setFormData((prev) => ({
            ...prev,
            endereco: { ...prev.endereco, [name]: finalVal },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErro("");

        try {
            const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
            const clienteId =
                usuarioLogado?.cliente?.id || usuarioLogado?.clienteId || 1;

            const payload = {
                ...formData,
                clienteId: clienteId, // Garante vínculo com o cliente
            };

            await FuncionarioService.criar(clienteId, payload);

            alert("Funcionário cadastrado com sucesso!");
            navigate("/colaboradores");
        } catch (error) {
            console.error("Erro ao salvar:", error);
            const msg =
                error.response?.data?.message ||
                "Erro ao cadastrar funcionário. Verifique CPF/RG/Email únicos.";
            setErro(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full bg-white px-4 py-8">
            <div className="flex items-center mb-6">
                <Link
                    to="/colaboradores"
                    className="mr-4 text-gray-600 hover:text-gray-800 transition rounded-full p-1 hover:bg-gray-100"
                    title="Voltar"
                >
                    <ArrowBack />
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">
                    Novo Funcionário
                </h1>
            </div>

            {erro && (
                <Alert severity="error" className="mb-6">
                    {erro}
                </Alert>
            )}

            <form onSubmit={handleSubmit} className="max-w-5xl space-y-6">
                {/* Dados Pessoais */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <h2 className="text-lg font-semibold mb-4 text-blue-600">
                        Dados Pessoais e Profissionais
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Nome Completo
                            </label>
                            <input
                                className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                name="nome"
                                type="text"
                                value={formData.nome}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Função / Cargo
                            </label>
                            <select
                                className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition"
                                name="funcao"
                                value={formData.funcao}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione...</option>
                                <option value="ENFERMEIRO">
                                    Enfermeiro(a)
                                </option>
                                <option value="CUIDADOR">Cuidador(a)</option>
                                <option value="MEDICO">Médico(a)</option>
                                <option value="ADMINISTRATIVO">
                                    Administrativo
                                </option>
                                <option value="LIMPEZA">Limpeza</option>
                                <option value="COZINHA">Cozinha</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Data de Nascimento
                            </label>
                            <input
                                className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                name="dataNascimento"
                                type="date"
                                value={formData.dataNascimento}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                CPF
                            </label>
                            <input
                                className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                name="cpf"
                                placeholder="000.000.000-00"
                                value={formData.cpf}
                                onChange={handleChange}
                                maxLength={14}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                RG
                            </label>
                            <input
                                className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                name="rg"
                                placeholder="00.000.000-0"
                                value={formData.rg}
                                onChange={handleChange}
                                maxLength={12}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Telefone
                            </label>
                            <input
                                className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                name="telefone"
                                placeholder="(00) 00000-0000"
                                value={formData.telefone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input
                                className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Endereço */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <h2 className="text-lg font-semibold mb-4 text-blue-600">
                        Endereço Residencial
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold mb-1">
                                CEP
                            </label>
                            <input
                                className="w-full p-2 border rounded"
                                name="cep"
                                value={formData.endereco.cep}
                                onChange={handleAddressChange}
                                required
                                maxLength={9}
                            />
                        </div>
                        <div className="md:col-span-3">
                            <label className="block text-sm font-bold mb-1">
                                Cidade
                            </label>
                            <input
                                className="w-full p-2 border rounded"
                                name="cidade"
                                value={formData.endereco.cidade}
                                onChange={handleAddressChange}
                                required
                            />
                        </div>
                        <div className="md:col-span-1">
                            <label className="block text-sm font-bold mb-1">
                                UF
                            </label>
                            <input
                                className="w-full p-2 border rounded"
                                name="unidadeFederativa"
                                value={formData.endereco.unidadeFederativa}
                                onChange={handleAddressChange}
                                required
                                maxLength={2}
                            />
                        </div>
                        <div className="md:col-span-4">
                            <label className="block text-sm font-bold mb-1">
                                Logradouro
                            </label>
                            <input
                                className="w-full p-2 border rounded"
                                name="logradouro"
                                value={formData.endereco.logradouro}
                                onChange={handleAddressChange}
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold mb-1">
                                Número
                            </label>
                            <input
                                className="w-full p-2 border rounded"
                                name="numero"
                                value={formData.endereco.numero}
                                onChange={handleAddressChange}
                                required
                            />
                        </div>
                        <div className="md:col-span-3">
                            <label className="block text-sm font-bold mb-1">
                                Bairro
                            </label>
                            <input
                                className="w-full p-2 border rounded"
                                name="bairro"
                                value={formData.endereco.bairro}
                                onChange={handleAddressChange}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end mt-8 space-x-4">
                    <Link to="/colaboradores">
                        <button
                            type="button"
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition"
                        >
                            Cancelar
                        </button>
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center transition shadow-md disabled:opacity-50"
                    >
                        {loading ? (
                            <CircularProgress
                                size={20}
                                color="inherit"
                                className="mr-2"
                            />
                        ) : (
                            <Save className="mr-2" />
                        )}
                        {loading ? "Salvando..." : "Salvar Funcionário"}
                    </button>
                </div>
            </form>
        </div>
    );
}
