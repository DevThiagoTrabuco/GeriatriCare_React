import api from './api';

const ENDPOINT = '/admins';

export const AdminService = {
    criar: (dadosAdmin) => api.post(ENDPOINT, dadosAdmin),

    listarTodos: () => api.get(ENDPOINT),

    buscarPorId: (id) => api.get(`${ENDPOINT}/${id}`),

    buscarPorEmail: (email) => api.get(`${ENDPOINT}/buscar`, { params: { email } }),

    buscarPorNome: (nome) => api.get(`${ENDPOINT}/buscar`, { params: { nome } }),

    atualizar: (id, dadosAdmin) => api.put(`${ENDPOINT}/${id}`, dadosAdmin),

    remover: (id) => api.delete(`${ENDPOINT}/${id}`),
};