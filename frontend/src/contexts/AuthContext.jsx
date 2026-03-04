import { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

// permitirá compartilhar dados de login entre todos os componentes
const AuthContext = createContext({});

// Hook personalizado para facilitar o uso do contexto
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Armazena os dados do usuário logado
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); //renderização

  // Executa apenas uma vez quando a aplicação inicia
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    // Se existir token e usuário salvos, restaura a sessão
    if (token && userData) {
      setUser(JSON.parse(userData));
      // todas as requisições já saem autenticadas
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Envia para o backend
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      // Salva dados no navegador
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Define o token padrão nas próximas requisições
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setUser(user); // atualiza estado global
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erro ao fazer login' 
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      const { token, user } = response.data;
      
      // Após cadastro, já autentica automaticamente
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      api.defaults.headers.Authorization = `Bearer ${token}`;
      setUser(user);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erro ao cadastrar' 
      };
    }
  };

  // Remove dados da sessão e desloga usuário
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    api.defaults.headers.Authorization = null;
    setUser(null);
  };

  // Disponibiliza dados e funções para toda aplicação
  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};