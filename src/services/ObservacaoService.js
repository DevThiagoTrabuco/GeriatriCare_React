import api from './api';

export const ObservacaoService = {
    criar: (clienteId, pacienteId, dadosObservacao) => api.post(`/clientes/${clienteId}/pacientes/${pacienteId}/observacoes`, dadosObservacao),
    
    listarPorPaciente: (clienteId, pacienteId) => api.get(`/clientes/${clienteId}/pacientes/${pacienteId}/observacoes`),
    
    atualizar: (clienteId, pacienteId, observacaoId, dados) => api.put(`/clientes/${clienteId}/pacientes/${pacienteId}/observacoes/${observacaoId}`, dados),
    
    remover: (clienteId, pacienteId, observacaoId) => api.delete(`/clientes/${clienteId}/pacientes/${pacienteId}/observacoes/${observacaoId}`),
};