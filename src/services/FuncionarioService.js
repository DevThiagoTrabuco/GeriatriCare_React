import api from './api';

export const FuncionarioService = {
    criar: (clienteId, dadosFuncionario) => api.post(`/clientes/${clienteId}/funcionarios`, dadosFuncionario),
    
    listarPorCliente: (clienteId) => api.get(`/clientes/${clienteId}/funcionarios`),
    
    buscarPorId: (clienteId, funcionarioId) => api.get(`/clientes/${clienteId}/funcionarios/${funcionarioId}`),
    
    buscarPorFuncao: (clienteId, funcao) => api.get(`/clientes/${clienteId}/funcionarios/buscar`, { params: { funcao } }),
    
    atualizar: (clienteId, funcionarioId, dadosFuncionario) => api.put(`/clientes/${clienteId}/funcionarios/${funcionarioId}`, dadosFuncionario),
    
    ativar: (clienteId, funcionarioId) => api.patch(`/clientes/${clienteId}/funcionarios/${funcionarioId}/ativar`),
    
    inativar: (clienteId, funcionarioId) => api.patch(`/clientes/${clienteId}/funcionarios/${funcionarioId}/inativar`),
    
    remover: (clienteId, funcionarioId) => api.delete(`/clientes/${clienteId}/funcionarios/${funcionarioId}`),
};