import api from './api';

export const PrescricaoService = {
    criar: (dadosPrescricao) => api.post('/prescricoes', dadosPrescricao),
    
    listarPorPaciente: (clienteId, pacienteId) => api.get(`/clientes/${clienteId}/pacientes/${pacienteId}/prescricoes`),
    
    atualizar: (id, dadosPrescricao) => api.put(`/prescricoes/${id}`, dadosPrescricao),
    
    remover: (id) => api.delete(`/prescricoes/${id}`),
};