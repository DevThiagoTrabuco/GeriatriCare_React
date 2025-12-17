import { useState, useEffect } from "react";
import { Add, Visibility, Edit, Delete } from "@mui/icons-material";
import { Link } from "react-router";
import { FuncionarioService } from "../../../services/FuncionarioService"; // Ajuste o caminho conforme sua estrutura
import { CircularProgress } from "@mui/material";

export default function EmployeesList() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    // Recupera o ID do cliente logado
    const getClienteId = () => {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        return usuario?.cliente?.id || usuario?.clienteId || 1;
    };

    useEffect(() => {
        carregarFuncionarios();
    }, []);

    const carregarFuncionarios = async () => {
        try {
            const clienteId = getClienteId();
            const response = await FuncionarioService.listarPorCliente(
                clienteId
            );
            setEmployees(response.data);
        } catch (error) {
            console.error("Erro ao buscar funcionários:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (
            window.confirm("Tem certeza que deseja remover este funcionário?")
        ) {
            try {
                const clienteId = getClienteId();
                await FuncionarioService.remover(clienteId, id);
                setEmployees(employees.filter((emp) => emp.id !== id));
            } catch (error) {
                console.error("Erro ao excluir:", error);
                alert("Erro ao excluir funcionário.");
            }
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "ATIVO":
                return "bg-green-100 text-green-600";
            case "INATIVO":
                return "bg-red-100 text-red-600";
            case "FERIAS":
                return "bg-blue-100 text-blue-600";
            case "AFASTADO":
                return "bg-yellow-100 text-yellow-600";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    if (loading) {
        return (
            <div className="p-8 flex justify-center">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className="w-full h-full bg-white px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Lista de Funcionários
                </h1>
                <Link
                    to="/colaboradores/cadastrar"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300 shadow-md"
                >
                    <Add className="mr-2" />
                    Novo Funcionário
                </Link>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Nome</th>
                                <th className="py-3 px-6 text-left">Função</th>
                                <th className="py-3 px-6 text-left">
                                    Telefone
                                </th>
                                <th className="py-3 px-6 text-left">Email</th>
                                <th className="py-3 px-6 text-left">Status</th>
                                <th className="py-3 px-6 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {employees.length > 0 ? (
                                employees.map((employee) => (
                                    <tr
                                        key={employee.id}
                                        className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                                    >
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <span className="font-medium text-gray-800">
                                                {employee.nome}
                                            </span>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            {employee.funcao}
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            {employee.telefone}
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            {employee.email}
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <span
                                                className={`py-1 px-3 rounded-full text-xs font-semibold ${getStatusStyle(
                                                    employee.statusFuncionario
                                                )}`}
                                            >
                                                {employee.statusFuncionario}
                                            </span>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex item-center justify-center space-x-2">
                                                <button
                                                    className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 flex items-center justify-center transition"
                                                    title="Ver Perfil"
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
                                                            employee.id
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
                                        Nenhum funcionário cadastrado.
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
