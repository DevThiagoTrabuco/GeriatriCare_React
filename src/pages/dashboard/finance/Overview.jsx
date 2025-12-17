import { useState, useEffect } from "react";
import { Add, Edit, Delete, CheckCircle } from "@mui/icons-material";
import { Link } from "react-router";
import { ContasAPagarService } from "../../../services/ContasAPagarService";
import { CircularProgress } from "@mui/material";

export default function DebtsOverview() {
    const [debts, setDebts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarContas();
    }, []);

    const carregarContas = async () => {
        try {
            const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));
            const clienteId = usuarioLogado?.cliente?.id || usuarioLogado?.clienteId || 1;
            
            const response = await ContasAPagarService.listarPorCliente(clienteId);
            setDebts(response.data);
        } catch (error) {
            console.error("Erro ao carregar contas:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja remover este lançamento?")) {
            try {
                const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));
                const clienteId = usuarioLogado?.cliente?.id || usuarioLogado?.clienteId || 1;
                
                await ContasAPagarService.remover(clienteId, id);
                setDebts(debts.filter(d => d.id !== id));
            } catch (error) {
                alert("Erro ao excluir conta.");
            }
        }
    };

    const handlePagar = async (id) => {
        if (window.confirm("Confirmar pagamento desta conta?")) {
            try {
                const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));
                const clienteId = usuarioLogado?.cliente?.id || usuarioLogado?.clienteId || 1;

                await ContasAPagarService.pagarConta(clienteId, id);
                // Atualiza a lista localmente para refletir o status PAGO
                setDebts(debts.map(d => d.id === id ? { ...d, statusConta: "PAGO" } : d));
            } catch (error) {
                alert("Erro ao registrar pagamento.");
            }
        }
    };

    const getStatusStyle = (status) => {
        const s = status ? status.toUpperCase() : "";
        if (s === "PAGO") return "bg-green-100 text-green-600";
        if (s === "ABERTO") return "bg-yellow-100 text-yellow-600";
        if (s === "VENCIDO" || s === "ATRASADO") return "bg-red-100 text-red-600";
        return "bg-gray-100 text-gray-600";
    };

    const formatMoney = (val) => {
        if (!val) return "R$ 0,00";
        return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    if (loading) return <div className="p-8 flex justify-center"><CircularProgress /></div>;

    return (
        <div className="w-full h-full bg-white px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Contas a Pagar
                </h1>
                <Link
                    to="/financeiro/cadastrar"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300 shadow-md"
                >
                    <Add className="mr-2" />
                    Novo Débito
                </Link>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Descrição</th>
                                <th className="py-3 px-6 text-left">Categoria</th>
                                <th className="py-3 px-6 text-left">Valor</th>
                                <th className="py-3 px-6 text-left">Vencimento</th>
                                <th className="py-3 px-6 text-left">Status</th>
                                <th className="py-3 px-6 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {debts.length > 0 ? (
                                debts.map((debt) => (
                                    <tr
                                        key={debt.id}
                                        className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                                    >
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <span className="font-medium text-gray-800">
                                                {debt.descricao}
                                            </span>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            {debt.tipoConta || "-"}
                                        </td>
                                        <td className="py-3 px-6 text-left font-bold text-red-600">
                                            {formatMoney(debt.valor)}
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            {debt.dataVencimento ? new Date(debt.dataVencimento).toLocaleDateString("pt-BR", {timeZone: 'UTC'}) : "-"}
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getStatusStyle(debt.statusConta)}`}>
                                                {debt.statusConta}
                                            </span>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex item-center justify-center space-x-2">
                                                {debt.statusConta !== "PAGO" && (
                                                    <button
                                                        onClick={() => handlePagar(debt.id)}
                                                        className="w-8 h-8 rounded-full bg-green-100 text-green-600 hover:bg-green-200 flex items-center justify-center transition"
                                                        title="Marcar como Pago"
                                                    >
                                                        <CheckCircle fontSize="small" />
                                                    </button>
                                                )}
                                                <button
                                                    className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200 flex items-center justify-center transition"
                                                    title="Editar (Não implementado neste exemplo)"
                                                >
                                                    <Edit fontSize="small" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(debt.id)}
                                                    className="w-8 h-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center transition"
                                                    title="Excluir"
                                                >
                                                    <Delete fontSize="small" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="py-6 text-center text-gray-500">
                                        Nenhuma conta a pagar encontrada.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}