import api from './api';

export const AgendamentoService = {
    criar: (dadosAgendamento) => api.post('/agendamentos', dadosAgendamento),
    
    buscarPorCliente: (clienteId) => api.get(`/clientes/${clienteId}/agendamentos`),
    
    buscarPorId: (clienteId, agendamentoId) => api.get(`/clientes/${clienteId}/agendamentos/${agendamentoId}`),
    
    buscarPorData: (clienteId, data) => api.get(`/clientes/${clienteId}/agendamentos/filtro`, { params: { data } }),
    
    buscarPorStatus: (clienteId, status) => api.get(`/clientes/${clienteId}/agendamentos/filtro`, { params: { status } }),
    
    atualizar: (clienteId, agendamentoId, dadosAgendamento) => api.put(`/clientes/${clienteId}/agendamentos/${agendamentoId}`, dadosAgendamento),
    
    fechar: (clienteId, agendamentoId) => api.patch(`/clientes/${clienteId}/agendamentos/${agendamentoId}/fechar`),
    
    remover: (clienteId, agendamentoId) => api.delete(`/clientes/${clienteId}/agendamentos/${agendamentoId}`),
};