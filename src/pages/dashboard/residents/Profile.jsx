import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import {
    ArrowBack,
    Edit,
    Phone,
    Cake,
    Description,
    CalendarToday,
    Person,
    Fingerprint,
    Email,
    FamilyRestroom,
    LocalPharmacy,
    Event,
    Add,
} from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { ResidenteService } from "../../../services/ResidenteService";
import { FamiliarService } from "../../../services/FamiliarService";
import { PrescricaoService } from "../../../services/PrescricaoService";
import { ObservacaoService } from "../../../services/ObservacaoService";
import { AgendamentoService } from "../../../services/AgendamentoService";

export default function Profile() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [paciente, setPaciente] = useState(null);
    const [familiares, setFamiliares] = useState([]);
    const [prescricoes, setPrescricoes] = useState([]);
    const [observacoes, setObservacoes] = useState([]);
    const [agendamentos, setAgendamentos] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarPerfilCompleto();
    }, [id]);

    const carregarPerfilCompleto = async () => {
        try {
            const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
            const clienteId =
                usuarioLogado?.cliente?.id || usuarioLogado?.clienteId || 1;

            const [
                pacienteRes,
                familiaresRes,
                prescricoesRes,
                observacoesRes,
                agendamentosRes,
            ] = await Promise.all([
                ResidenteService.buscarPorId(clienteId, id),
                FamiliarService.buscarPorPaciente(clienteId, id),
                PrescricaoService.listarPorPaciente(clienteId, id),
                ObservacaoService.listarPorPaciente(clienteId, id),
                AgendamentoService.buscarPorCliente(clienteId),
            ]);

            setPaciente(pacienteRes.data);
            setFamiliares(familiaresRes.data);
            setPrescricoes(prescricoesRes.data);
            setObservacoes(observacoesRes.data);

            const agendamentosDoPaciente = agendamentosRes.data.filter(
                (a) => a.paciente && a.paciente.id === parseInt(id)
            );
            setAgendamentos(agendamentosDoPaciente);
        } catch (error) {
            console.error("Erro ao carregar perfil:", error);
            alert("Erro ao carregar dados do paciente.");
        } finally {
            setLoading(false);
        }
    };

    const getAge = (dateString) => {
        if (!dateString) return "-";
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <CircularProgress />
            </div>
        );
    }

    if (!paciente) {
        return (
            <div className="p-8 text-center text-gray-500">
                Paciente não encontrado.
            </div>
        );
    }

    return (
        <div className="w-full bg-white px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="mr-4 text-gray-600 hover:text-gray-800 transition rounded-full p-1 hover:bg-gray-100"
                        title="Voltar"
                    >
                        <ArrowBack />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Perfil do Paciente
                    </h1>
                </div>
                <Link to={`/residentes/editar/${paciente.id}`}>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded inline-flex items-center transition shadow-md">
                        <Edit className="mr-2" />
                        Editar
                    </button>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-10xl">
                {/* Coluna 1: Dados Pessoais e Familiares */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Card Perfil */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                {paciente.nome}
                            </h2>
                            <span
                                className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                                    paciente.statusPaciente === "ATIVO"
                                        ? "bg-green-100 text-green-600"
                                        : "bg-gray-100 text-gray-600"
                                }`}
                            >
                                {paciente.statusPaciente}
                            </span>

                            <div className="mt-6 space-y-4">
                                <div className="flex items-center text-gray-600">
                                    <Cake className="w-5 h-5 mr-3 text-gray-400" />
                                    <span>
                                        {new Date(
                                            paciente.dataNascimento
                                        ).toLocaleDateString("pt-BR")}{" "}
                                        ({getAge(paciente.dataNascimento)} anos)
                                    </span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Person className="w-5 h-5 mr-3 text-gray-400" />
                                    <span className="capitalize">
                                        {paciente.genero
                                            ? paciente.genero.toLowerCase()
                                            : "-"}
                                    </span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Fingerprint className="w-5 h-5 mr-3 text-gray-400" />
                                    <div className="flex flex-col text-sm">
                                        <span>CPF: {paciente.cpf}</span>
                                        <span>RG: {paciente.rg}</span>
                                    </div>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Email className="w-5 h-5 mr-3 text-gray-400" />
                                    <span className="text-sm break-all">
                                        {paciente.email}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card Familiares */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                            <FamilyRestroom className="mr-2 text-purple-500" />
                            Familiares
                        </h3>
                        <div className="space-y-4">
                            {familiares.length > 0 ? (
                                familiares.map((familiar) => (
                                    <div
                                        key={familiar.id}
                                        className="border-b border-gray-100 last:border-0 pb-3 last:pb-0"
                                    >
                                        <p className="font-semibold text-gray-800">
                                            {familiar.nome}
                                        </p>
                                        <p className="text-sm text-gray-500 mb-1">
                                            {familiar.parentesco}
                                        </p>
                                        <div className="flex items-center text-gray-600 text-sm">
                                            <Phone className="w-4 h-4 mr-2 text-gray-400" />
                                            {familiar.telefone}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm italic">
                                    Nenhum familiar cadastrado.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Coluna 2: Prontuário (Prescrições e Observações) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Prescrições */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-800 flex items-center">
                                <LocalPharmacy className="mr-2 text-red-500" />
                                Prescrições
                            </h3>
                            <button
                                className="text-red-500 hover:bg-red-50 p-1 rounded-full transition"
                                title="Adicionar Prescrição"
                                onClick={() =>
                                    alert(
                                        "Funcionalidade de adicionar prescrição deve abrir modal"
                                    )
                                }
                            >
                                <Add />
                            </button>
                        </div>

                        {prescricoes.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {prescricoes.map((prescricao) => (
                                    <div
                                        key={prescricao.id}
                                        className="bg-red-50 rounded-lg p-4 border border-red-100"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-gray-800">
                                                {prescricao.medicamento}
                                            </h4>
                                            <span className="text-xs bg-white px-2 py-1 rounded border border-red-100 text-red-600 font-medium">
                                                {prescricao.quantidade} un.
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-1">
                                            <span className="font-medium">
                                                Posologia:
                                            </span>{" "}
                                            {prescricao.posologia}
                                        </p>
                                        <p className="text-sm text-gray-600 mb-2">
                                            {prescricao.descricao}
                                        </p>

                                        <div className="mt-3 flex items-center text-xs text-gray-500">
                                            <CalendarToday className="w-3 h-3 mr-1" />
                                            Início:{" "}
                                            {new Date(
                                                prescricao.dataInicio
                                            ).toLocaleDateString("pt-BR")}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">
                                Nenhuma prescrição registrada.
                            </p>
                        )}
                    </div>

                    {/* Observações */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-800 flex items-center">
                                <Description className="mr-2 text-blue-500" />
                                Observações e Histórico
                            </h3>
                            <button
                                className="text-blue-500 hover:bg-blue-50 p-1 rounded-full transition"
                                title="Adicionar Observação"
                                onClick={() =>
                                    alert(
                                        "Funcionalidade de adicionar observação deve abrir modal"
                                    )
                                }
                            >
                                <Add />
                            </button>
                        </div>

                        {observacoes.length > 0 ? (
                            <div className="space-y-4">
                                {observacoes.map((obs) => (
                                    <div
                                        key={obs.id}
                                        className="bg-blue-50 rounded-lg p-4 border border-blue-100"
                                    >
                                        <p className="text-gray-700 leading-relaxed mb-2">
                                            {obs.observacao}
                                        </p>
                                        <div className="flex items-center text-xs text-blue-400 font-medium">
                                            <CalendarToday className="w-3 h-3 mr-1" />
                                            {new Date(
                                                obs.dataCriacao
                                            ).toLocaleDateString("pt-BR")}{" "}
                                            às{" "}
                                            {new Date(
                                                obs.dataCriacao
                                            ).toLocaleTimeString("pt-BR", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">
                                Nenhuma observação registrada.
                            </p>
                        )}
                    </div>
                </div>

                {/* Coluna 3: Agendamentos */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-800 flex items-center">
                                <Event className="mr-2 text-orange-500" />
                                Agendamentos
                            </h3>
                            <button
                                className="text-orange-500 hover:bg-orange-50 p-1 rounded-full transition"
                                title="Adicionar Agendamento"
                                onClick={() =>
                                    alert(
                                        "Funcionalidade de adicionar agendamento"
                                    )
                                }
                            >
                                <Add />
                            </button>
                        </div>

                        {agendamentos.length > 0 ? (
                            <div className="space-y-4">
                                {agendamentos.map((agendamento) => (
                                    <div
                                        key={agendamento.id}
                                        className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-100"
                                    >
                                        <div>
                                            <p className="font-bold text-gray-800">
                                                {agendamento.procedimento}
                                            </p>
                                            <div className="flex items-center text-sm text-gray-600 mt-1">
                                                <CalendarToday className="w-4 h-4 mr-1 text-gray-400" />
                                                {new Date(
                                                    agendamento.data
                                                ).toLocaleDateString("pt-BR")}
                                                <span className="mx-2">•</span>
                                                {agendamento.hora
                                                    ? agendamento.hora.substring(
                                                          0,
                                                          5
                                                      )
                                                    : "--:--"}
                                            </div>
                                        </div>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                agendamento.statusAgendamento ===
                                                    "AGENDADO" ||
                                                agendamento.statusAgendamento ===
                                                    "ABERTO"
                                                    ? "bg-blue-100 text-blue-600"
                                                    : agendamento.statusAgendamento ===
                                                      "FECHADO"
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-yellow-100 text-yellow-600"
                                            }`}
                                        >
                                            {agendamento.statusAgendamento}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">
                                Nenhum agendamento registrado.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
