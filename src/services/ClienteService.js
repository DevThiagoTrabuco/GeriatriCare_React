import api from './api';

const ENDPOINT = '/clientes';

export const ClienteService = {
    criar: (dadosCliente) => api.post(ENDPOINT, dadosCliente),
    listarTodos: () => api.get(ENDPOINT),
    buscarPorId: (id) => api.get(`${ENDPOINT}/${id}`),
    buscarPorEmail: (email) => api.get(`${ENDPOINT}/buscar`, { params: { email } }),
    buscarPorCnpj: (cnpj) => api.get(`${ENDPOINT}/buscar`, { params: { cnpj } }),
    atualizar: (id, dadosCliente) => api.put(`${ENDPOINT}/${id}`, dadosCliente),
    remover: (id) => api.delete(`${ENDPOINT}/${id}`),
};