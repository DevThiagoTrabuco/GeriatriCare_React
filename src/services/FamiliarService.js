import api from './api';

const ENDPOINT = '/familiares';

export const FamiliarService = {
    criar: (dadosFamiliar) => api.post(ENDPOINT, dadosFamiliar),
    
    atualizar: (id, dadosFamiliar) => api.put(`${ENDPOINT}/${id}`, dadosFamiliar),
    
    remover: (id) => api.delete(`${ENDPOINT}/${id}`),
    
    listarTodos: () => api.get(ENDPOINT),
    
    buscarPorId: (id) => api.get(`${ENDPOINT}/${id}`),

    buscarPorNome: (clienteId, nome) => api.get(`/clientes/${clienteId}/familiares/buscar`, { params: { nome } }),
    
    buscarPorEmail: (clienteId, email) => api.get(`/clientes/${clienteId}/familiares/buscar`, { params: { email } }),
    
    buscarPorCpf: (clienteId, cpf) => api.get(`/clientes/${clienteId}/familiares/buscar`, { params: { cpf } }),
    
    buscarPorRg: (clienteId, rg) => api.get(`/clientes/${clienteId}/familiares/buscar`, { params: { rg } }),

    buscarPorPaciente: (clienteId, pacienteId) => api.get(`/clientes/${clienteId}/pacientes/${pacienteId}/familiares`),
    
    associarAoPaciente: (clienteId, pacienteId, familiarId) => 
        api.post(`/clientes/${clienteId}/pacientes/${pacienteId}/familiares/${familiarId}`),
};