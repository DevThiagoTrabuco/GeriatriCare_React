import { useState, useEffect } from "react";
import { Visibility, Edit, Delete, CalendarToday } from "@mui/icons-material";
import { AgendamentoService } from "../../../services/AgendamentoService";
import { CircularProgress } from "@mui/material";

export default function Monthly() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarAgendamentosMensais();
    }, []);

    const carregarAgendamentosMensais = async () => {
        try {
            const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
            const clienteId =
                usuarioLogado?.cliente?.id || usuarioLogado?.clienteId || 1;

            // Busca TODOS os agendamentos do cliente
            // O Java AgendamentoService tem buscarPorCliente(id)
            const response = await AgendamentoService.buscarPorCliente(
                clienteId
            );
            const todosAgendamentos = response.data;

            // Filtra no Frontend pelo mês atual
            const dataAtual = new Date();
            const mesAtual = dataAtual.getMonth(); // 0-11
            const anoAtual = dataAtual.getFullYear();

            const agendamentosFiltrados = todosAgendamentos.filter((app) => {
                if (!app.data) return false;
                // app.data vem como string "YYYY-MM-DD" do backend Java LocalDate
                const dataApp = new Date(app.data);
                // Ajuste de timezone simples para garantir comparação correta do mês
                // (Muitas vezes "2023-10-01" vira "2023-09-30 21:00" dependendo do fuso)
                // Usamos split para ser mais seguro com datas YYYY-MM-DD puras
                const [ano, mes] = app.data.split("-");

                return (
                    parseInt(ano) === anoAtual && parseInt(mes) - 1 === mesAtual
                );
            });

            // Ordena por data
            agendamentosFiltrados.sort(
                (a, b) => new Date(a.data) - new Date(b.data)
            );

            setAppointments(agendamentosFiltrados);
        } catch (error) {
            console.error("Erro ao carregar agendamentos mensais:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (
            window.confirm("Tem certeza que deseja remover este agendamento?")
        ) {
            try {
                const usuarioLogado = JSON.parse(
                    localStorage.getItem("usuario")
                );
                const clienteId =
                    usuarioLogado?.cliente?.id || usuarioLogado?.clienteId || 1;
                await AgendamentoService.remover(clienteId, id);
                setAppointments(appointments.filter((app) => app.id !== id));
            } catch (error) {
                alert("Erro ao excluir.");
            }
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "ABERTO":
                return "bg-blue-100 text-blue-600";
            case "FECHADO":
                return "bg-green-100 text-green-600";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    if (loading)
        return (
            <div className="p-8 flex justify-center">
                <CircularProgress />
            </div>
        );

    return (
        <div className="w-full h-full bg-white px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Agendamentos do Mês
                </h1>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Data</th>
                                <th className="py-3 px-6 text-left">Horário</th>
                                <th className="py-3 px-6 text-left">
                                    Residente
                                </th>
                                <th className="py-3 px-6 text-left">
                                    Procedimento
                                </th>
                                <th className="py-3 px-6 text-left">Status</th>
                                <th className="py-3 px-6 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {appointments.length > 0 ? (
                                appointments.map((appointment) => (
                                    <tr
                                        key={appointment.id}
                                        className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                                    >
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <div className="flex items-center font-medium text-gray-800">
                                                <CalendarToday className="w-4 h-4 mr-2 text-gray-500" />
                                                {/* Formata a data YYYY-MM-DD para o local */}
                                                {new Date(
                                                    appointment.data
                                                ).toLocaleDateString("pt-BR", {
                                                    timeZone: "UTC",
                                                })}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            {appointment.hora
                                                ? appointment.hora.substring(
                                                      0,
                                                      5
                                                  )
                                                : "--:--"}
                                        </td>
                                        <td className="py-3 px-6 text-left font-medium">
                                            {appointment.paciente?.nome ||
                                                "Paciente Excluído"}
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            {appointment.procedimento}
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <span
                                                className={`py-1 px-3 rounded-full text-xs font-semibold ${getStatusStyle(
                                                    appointment.statusAgendamento
                                                )}`}
                                            >
                                                {appointment.statusAgendamento}
                                            </span>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex item-center justify-center space-x-2">
                                                <button
                                                    className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 flex items-center justify-center transition"
                                                    title="Ver Detalhes"
                                                >
                                                    <Visibility fontSize="small" />
                                                </button>
                                                <button
                                                    className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200 flex items-center justify-center transition"
                                                    title="Editar"
                                                >
                                                    <Edit fontSize="small" />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            appointment.id
                                                        )
                                                    }
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
                                    <td
                                        colSpan="6"
                                        className="py-6 text-center text-gray-500"
                                    >
                                        Nenhum agendamento encontrado para este
                                        mês.
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
