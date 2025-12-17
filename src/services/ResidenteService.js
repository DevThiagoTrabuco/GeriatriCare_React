import api from "./api";

export const ResidenteService = {
    criar: (clienteId, dadosPaciente) =>
        api.post(`/clientes/${clienteId}/pacientes`, dadosPaciente),

    listarPorCliente: (clienteId) =>
        api.get(`/clientes/${clienteId}/pacientes`),

    buscarPorId: (clienteId, pacienteId) =>
        api.get(`/clientes/${clienteId}/pacientes/${pacienteId}`),

    buscarPorCpf: (clienteId, cpf) =>
        api.get(`/clientes/${clienteId}/pacientes/buscar`, { params: { cpf } }),

    buscarPorNome: (clienteId, nome) =>
        api.get(`/clientes/${clienteId}/pacientes/buscar`, {
            params: { nome },
        }),

    atualizar: (clienteId, pacienteId, dadosPaciente) =>
        api.put(
            `/clientes/${clienteId}/pacientes/${pacienteId}`,
            dadosPaciente
        ),

    alterarStatus: (clienteId, pacienteId, status) =>
        api.patch(`/clientes/${clienteId}/pacientes/${pacienteId}/status`, {
            status,
        }),

    associarFamiliar: (clienteId, pacienteId, familiarId) =>
        api.post(
            `/clientes/${clienteId}/pacientes/${pacienteId}/familiares/${familiarId}`
        ),

    remover: (clienteId, pacienteId) =>
        api.delete(`/clientes/${clienteId}/pacientes/${pacienteId}`),
};
