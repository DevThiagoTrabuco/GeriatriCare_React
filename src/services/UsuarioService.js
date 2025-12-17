import api from './api';

export const UsuarioService = {
    criar: (dadosUsuario) => api.post('/usuarios', dadosUsuario),
    
    buscarPorId: (id) => api.get(`/usuarios/${id}`),
    
    listarTodos: () => api.get('/usuarios'),
    
    atualizar: (id, dadosUsuario, papel) => api.put(`/usuarios/${id}`, dadosUsuario, { params: { papel } }),
    
    alternarStatus: (id, status) => api.patch(`/usuarios/${id}/status`, null, { params: { status } }),
    
    deletar: (id) => api.delete(`/usuarios/${id}`),
};