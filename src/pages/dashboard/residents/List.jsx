import { useState, useEffect } from "react";
import { Add, Visibility, Edit, Delete } from "@mui/icons-material";
import { Link } from "react-router";
import { ResidenteService } from "../../../services/ResidenteService";
import { CircularProgress } from "@mui/material";

export default function ResidentsList() {
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(true);

    const getClienteId = () => {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        return usuario?.cliente?.id || usuario?.clienteId || 1;
    };

    useEffect(() => {
        carregarPacientes();
    }, []);

    const carregarPacientes = async () => {
        try {
            const clienteId = getClienteId();
            const response = await ResidenteService.listarPorCliente(clienteId);
            setPacientes(response.data);
        } catch (error) {
            console.error("Erro ao buscar residentes:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este residente?")) {
            try {
                const clienteId = getClienteId();
                await ResidenteService.remover(clienteId, id);
                // Atualiza a lista removendo o item excluído visualmente
                setPacientes(pacientes.filter((p) => p.id !== id));
            } catch (error) {
                console.error("Erro ao excluir:", error);
                alert("Erro ao excluir residente. Verifique dependências.");
            }
        }
    };

    // Função auxiliar para calcular idade
    const calcularIdade = (dataNascimento) => {
        if (!dataNascimento) return "-";
        const hoje = new Date();
        const nascimento = new Date(dataNascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const m = hoje.getMonth() - nascimento.getMonth();
        if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        return idade;
    };

    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className="w-full h-full bg-white px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Lista de Residentes
                </h1>
                <Link
                    to="/residentes/cadastrar"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300 shadow-md"
                >
                    <Add className="mr-2" />
                    Novo Residente
                </Link>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left w-1/2">
                                    Nome
                                </th>
                                <th className="py-3 px-6 text-left w-1/4">
                                    Idade
                                </th>
                                <th className="py-3 px-6 text-center w-1/4">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {pacientes.length > 0 ? (
                                pacientes.map((paciente) => (
                                    <tr
                                        key={paciente.id}
                                        className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                                    >
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <div className="flex items-center">
                                                <span className="font-medium text-gray-800">
                                                    {paciente.nome}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            {calcularIdade(
                                                paciente.dataNascimento
                                            )}{" "}
                                            anos
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex item-center justify-center space-x-2">
                                                <Link
                                                    to={`/residentes/perfil/${paciente.id}`}
                                                >
                                                    <button
                                                        className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 flex items-center justify-center transition"
                                                        title="Ver Perfil"
                                                    >
                                                        <Visibility fontSize="small" />
                                                    </button>
                                                </Link>
                                                <Link
                                                    to={`/residentes/editar/${paciente.id}`}
                                                >
                                                    <button
                                                        className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200 flex items-center justify-center transition"
                                                        title="Editar"
                                                    >
                                                        <Edit fontSize="small" />
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            paciente.id
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
                                        colSpan="3"
                                        className="py-6 text-center text-gray-500"
                                    >
                                        Nenhum residente cadastrado.
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
