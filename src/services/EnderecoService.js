import api from './api';

const ENDPOINT = '/enderecos';

export const EnderecoService = {
    criar: (dadosEndereco) => api.post(ENDPOINT, dadosEndereco),
    
    atualizar: (id, dadosEndereco) => api.put(`${ENDPOINT}/${id}`, dadosEndereco),
    
    remover: (id) => api.delete(`${ENDPOINT}/${id}`),
    
    listarTodos: () => api.get(ENDPOINT),
    
    buscarPorId: (id) => api.get(`${ENDPOINT}/${id}`),

    buscarPorCliente: (clienteId) => api.get(`/clientes/${clienteId}/endereco`),
    
    buscarPorFamiliar: (clienteId, familiarId) => api.get(`/clientes/${clienteId}/familiares/${familiarId}/endereco`),
    
    buscarPorFuncionario: (clienteId, funcionarioId) => api.get(`/clientes/${clienteId}/funcionarios/${funcionarioId}/endereco`),

    buscarPorUf: (uf) => api.get(`${ENDPOINT}/buscar`, { params: { uf } }), 
    
    buscarPorCidade: (cidade) => api.get(`${ENDPOINT}/buscar`, { params: { cidade } }),
};