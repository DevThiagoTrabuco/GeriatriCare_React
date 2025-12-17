import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { ArrowBack, Save } from "@mui/icons-material";
import { ContasAPagarService } from "../../../services/ContasAPagarService";
import { CircularProgress, Alert } from "@mui/material";

export default function DebtsRegister() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");

    const [formData, setFormData] = useState({
        description: "",
        supplier: "",
        amount: "",
        dueDate: "",
        category: "",
        notes: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
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

            // Preparação do Payload para o Java
            // Nota: Como o backend pode não ter campo 'fornecedor', concatenamos na descrição
            const descricaoFinal = formData.supplier
                ? `${formData.supplier} - ${formData.description}`
                : formData.description;

            // Adicionamos observações à descrição se houver, ou ignoramos se o backend tiver campo obs
            const descricaoCompleta = formData.notes
                ? `${descricaoFinal} (Obs: ${formData.notes})`
                : descricaoFinal;

            const payload = {
                descricao: descricaoCompleta,
                tipoConta: formData.category,
                valor: parseFloat(formData.amount),
                dataVencimento: formData.dueDate,
                dataEmissao: new Date().toISOString().split("T")[0], // Data de hoje
                // statusConta: "ABERTO", // Backend define como ABERTO na criação
                clienteId: clienteId,
            };

            await ContasAPagarService.criar(payload);

            alert("Conta lançada com sucesso!");
            navigate("/financeiro"); // Ajuste a rota conforme seu roteamento
        } catch (error) {
            console.error("Erro ao salvar:", error);
            const msg =
                error.response?.data?.message || "Erro ao lançar débito.";
            setErro(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full bg-white px-4 py-8">
            <div className="flex items-center mb-6">
                <Link
                    to="/financeiro"
                    className="mr-4 text-gray-600 hover:text-gray-800 transition rounded-full p-1 hover:bg-gray-100"
                    title="Voltar"
                >
                    <ArrowBack />
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">
                    Novo Débito (Conta a Pagar)
                </h1>
            </div>

            {erro && (
                <Alert severity="error" className="mb-6">
                    {erro}
                </Alert>
            )}

            <form onSubmit={handleSubmit} className="max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="supplier"
                        >
                            Fornecedor / Beneficiário
                        </label>
                        <input
                            className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                            id="supplier"
                            name="supplier"
                            type="text"
                            placeholder="Ex: Enel, Fornecedor ABC"
                            value={formData.supplier}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="description"
                        >
                            Descrição da Despesa
                        </label>
                        <input
                            className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                            id="description"
                            name="description"
                            type="text"
                            placeholder="Ex: Fatura Janeiro/2024"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="category"
                        >
                            Categoria (Tipo Conta)
                        </label>
                        <select
                            className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white transition"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione...</option>
                            <option value="UTILIDADES">
                                Utilidades (Água, Luz)
                            </option>
                            <option value="ALIMENTACAO">Alimentação</option>
                            <option value="MANUTENCAO">Manutenção</option>
                            <option value="SALARIOS">Salários</option>
                            <option value="IMPOSTOS">Impostos</option>
                            <option value="OUTROS">Outros</option>
                        </select>
                    </div>

                    <div>
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="amount"
                        >
                            Valor (R$)
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">
                                    R$
                                </span>
                            </div>
                            <input
                                className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 pl-10 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                                id="amount"
                                name="amount"
                                type="number"
                                step="0.01"
                                placeholder="0,00"
                                value={formData.amount}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="dueDate"
                        >
                            Data de Vencimento
                        </label>
                        <input
                            className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                            id="dueDate"
                            name="dueDate"
                            type="date"
                            value={formData.dueDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Status removido pois o backend define como ABERTO na criação */}

                    <div className="col-span-1 md:col-span-2">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="notes"
                        >
                            Observações Adicionais
                        </label>
                        <textarea
                            className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent h-24 transition"
                            id="notes"
                            name="notes"
                            placeholder="Detalhes adicionais..."
                            value={formData.notes}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                </div>

                <div className="flex items-center justify-end mt-8 space-x-4">
                    <Link to="/financeiro">
                        <button
                            type="button"
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                        >
                            Cancelar
                        </button>
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center focus:outline-none focus:shadow-outline transition duration-300 shadow-md disabled:opacity-50"
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
                        {loading ? "Salvando..." : "Salvar Débito"}
                    </button>
                </div>
            </form>
        </div>
    );
}
