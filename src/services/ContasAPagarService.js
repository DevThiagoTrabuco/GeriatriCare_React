import api from './api';

export const ContasAPagarService = {
    criar: (dadosConta) => api.post('/contas-a-pagar', dadosConta),
    
    listarPorCliente: (clienteId) => api.get(`/clientes/${clienteId}/contas-a-pagar`),
    
    buscarPorId: (clienteId, contaId) => api.get(`/clientes/${clienteId}/contas-a-pagar/${contaId}`),
    
    buscarPorStatus: (clienteId, status) => api.get(`/clientes/${clienteId}/contas-a-pagar`, { params: { status } }),
    
    pagarConta: (clienteId, contaId) => api.patch(`/clientes/${clienteId}/contas-a-pagar/${contaId}/pagar`),
    
    atualizar: (clienteId, contaId, dadosConta) => api.put(`/clientes/${clienteId}/contas-a-pagar/${contaId}`, dadosConta),
    
    remover: (clienteId, contaId) => api.delete(`/clientes/${clienteId}/contas-a-pagar/${contaId}`),
};