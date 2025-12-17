import { useState, useEffect } from "react";
import { Visibility, Edit, Delete, AccessTime } from "@mui/icons-material";
import { AgendamentoService } from "../../../services/AgendamentoService";
import { CircularProgress } from "@mui/material";

export default function Daily() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarAgendamentosDoDia();
    }, []);

    const carregarAgendamentosDoDia = async () => {
        try {
            const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
            const clienteId =
                usuarioLogado?.cliente?.id || usuarioLogado?.clienteId || 1;

            // Obtém data de hoje no formato YYYY-MM-DD para compatibilidade com LocalDate do Java
            const hoje = new Date().toISOString().split("T")[0];

            // Chama o serviço Java: buscarPorClienteEData(clienteId, data)
            const response = await AgendamentoService.buscarPorData(
                clienteId,
                hoje
            );
            setAppointments(response.data);
        } catch (error) {
            console.error("Erro ao carregar agendamentos do dia:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (
            window.confirm("Tem certeza que deseja cancelar este agendamento?")
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
                alert("Erro ao remover agendamento.");
            }
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "ABERTO":
                return "bg-blue-100 text-blue-600"; // Status padrão de criação no Java
            case "FECHADO":
                return "bg-green-100 text-green-600"; // Status após fecharAgendamento
            case "CANCELADO":
                return "bg-red-100 text-red-600";
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
                    Agendamentos do Dia
                </h1>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
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
                                        <td className="py-3 px-6 text-left whitespace-nowrap font-bold text-blue-600">
                                            <div className="flex items-center">
                                                <AccessTime className="w-4 h-4 mr-2" />
                                                {/* Formata HH:MM:SS para HH:MM */}
                                                {appointment.hora
                                                    ? appointment.hora.substring(
                                                          0,
                                                          5
                                                      )
                                                    : "--:--"}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left font-medium text-gray-800">
                                            {/* Acessa o nome dentro do objeto Paciente aninhado */}
                                            {appointment.paciente?.nome ||
                                                "Paciente não identificado"}
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
                                        colSpan="5"
                                        className="py-6 text-center text-gray-500"
                                    >
                                        Nenhum agendamento para hoje.
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
