import { useEffect, useState } from "react";
import { ResidenteService } from "../../services/ResidenteService";
import { FuncionarioService } from "../../services/FuncionarioService";
import { AgendamentoService } from "../../services/AgendamentoService";
import { ContasAPagarService } from "../../services/ContasAPagarService";

export default function Overview() {
    const [stats, setStats] = useState({
        residentes: 0,
        funcionarios: 0,
        agendamentosHoje: 0,
        contasAbertas: 0,
    });

    const [proximosAgendamentos, setProximosAgendamentos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
            const clienteId =
                usuarioLogado?.cliente?.id || usuarioLogado?.clienteId || 1;

            const hoje = new Date().toISOString().split("T")[0];

            const [pacientesRes, funcionariosRes, agendamentosRes, contasRes] =
                await Promise.all([
                    ResidenteService.listarPorCliente(clienteId),
                    FuncionarioService.listarPorCliente(clienteId),
                    AgendamentoService.buscarPorData(clienteId, hoje),
                    ContasAPagarService.buscarPorStatus(clienteId, "ABERTO"),
                ]);

            setStats({
                residentes: pacientesRes.data.length,
                funcionarios: funcionariosRes.data.length,
                agendamentosHoje: agendamentosRes.data.length,
                contasAbertas: contasRes.data.length,
            });

            setProximosAgendamentos(agendamentosRes.data);
        } catch (error) {
            console.error("Erro ao carregar dashboard:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="p-5">Carregando dados do dashboard...</div>;
    }

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">Visão Geral</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="mb-2 text-gray-500 font-medium">
                        Residentes
                    </h3>
                    <p className="text-3xl font-bold my-1">
                        {stats.residentes}
                    </p>
                    <small className="text-green-600 font-medium">
                        Ativos na instituição
                    </small>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="mb-2 text-gray-500 font-medium">
                        Funcionários
                    </h3>
                    <p className="text-3xl font-bold my-1">
                        {stats.funcionarios}
                    </p>
                    <small className="text-gray-500">Cadastrados</small>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="mb-2 text-gray-500 font-medium">
                        Agendamentos Hoje
                    </h3>
                    <p className="text-3xl font-bold my-1">
                        {stats.agendamentosHoje}
                    </p>
                    <small className="text-orange-500 font-medium">
                        Verificar agenda
                    </small>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="mb-2 text-gray-500 font-medium">
                        Contas em aberto
                    </h3>
                    <p className="text-3xl font-bold my-1">
                        {stats.contasAbertas}
                    </p>
                    <small className="text-red-500 font-medium">
                        Aguardando pagamento
                    </small>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2 bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                    <h2 className="text-xl font-semibold mb-4">
                        Agendamentos de Hoje
                    </h2>
                    {proximosAgendamentos.length > 0 ? (
                        <ul className="list-none p-0">
                            {proximosAgendamentos.map((agendamento) => (
                                <li
                                    key={agendamento.id}
                                    className="py-3 border-b border-gray-100 flex justify-between"
                                >
                                    <span>
                                        <strong>
                                            {agendamento.hora?.substring(0, 5)}
                                        </strong>{" "}
                                        - {agendamento.procedimento}
                                    </span>
                                    <span className="text-gray-600">
                                        (Paciente:{" "}
                                        {agendamento.paciente?.nome || "N/A"})
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">
                            Nenhum agendamento para hoje.
                        </p>
                    )}
                </div>

                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                    <h2 className="text-xl font-semibold mb-4">
                        Ações Rápidas
                    </h2>
                    <div className="flex flex-col gap-3">
                        <button className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                            + Novo Residente
                        </button>
                        <button className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                            + Lançar Despesa
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
