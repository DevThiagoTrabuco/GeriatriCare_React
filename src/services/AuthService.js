import api from './api';

export const AuthService = {
    login: async (username, password) => {
        const token = 'Basic ' + btoa(`${username}:${password}`);

        try {
            const response = await api.get('/usuarios', {
                headers: { Authorization: token }
            });

            localStorage.setItem('auth_token', token);
            const usuarioLogado = response.data.find(u => u.nomeUsuario === username);

            if (usuarioLogado) {
                localStorage.setItem('usuario_dados', JSON.stringify(usuarioLogado));
                return usuarioLogado;
            } else {
                const usuarioBasico = { nomeUsuario: username };
                localStorage.setItem('usuario_dados', JSON.stringify(usuarioBasico));
                return usuarioBasico;
            }

        } catch (error) {
            console.error("Falha na autenticação:", error);
            throw new Error("Usuário ou senha inválidos.");
        }
    },

    logout: () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('usuario_dados');
    },

    getUsuarioLogado: () => {
        const usuarioJson = localStorage.getItem('usuario_dados');
        return usuarioJson ? JSON.parse(usuarioJson) : null;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('auth_token');
    }
};