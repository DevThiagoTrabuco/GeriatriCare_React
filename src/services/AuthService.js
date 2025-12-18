import api from './api';

export const AuthService = {
    login: async (username, password) => {
        const token = 'Basic ' + btoa(`${username}:${password}`);

        try {
            
            const response = await api.get('/usuarios/me', {
                headers: { Authorization: token }
            });

            localStorage.setItem('auth_token', token);
            
            const usuarioDados = response.data;
            localStorage.setItem('usuario_dados', JSON.stringify(usuarioDados));

            return usuarioDados;

        } catch (error) {
            console.error("Falha na autenticação:", error);
            throw new Error("Usuário ou senha inválidos.");
        }
    },

    logout: () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('usuario_dados');
        window.location.href = '/login';
    },

    getUsuarioLogado: () => {
        const usuarioJson = localStorage.getItem('usuario_dados');
        return usuarioJson ? JSON.parse(usuarioJson) : null;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('auth_token');
    },
    
    getClienteId: () => {
        const usuarioJson = localStorage.getItem('usuario_dados');
        if (!usuarioJson) return null;
        const usuario = JSON.parse(usuarioJson);return usuario.cliente?.id || usuario.clienteId; 
    }
};