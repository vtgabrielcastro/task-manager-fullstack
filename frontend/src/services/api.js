import axios from 'axios';

// Criei uma instância do axios já configurada
// Isso evita repetir baseURL em todas as requisições
const api = axios.create({
  baseURL: 'http://localhost:3001'
});

// Interceptor de requisição
// Ele é executado automaticamente ANTES de cada request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); //busca o token salvo no browser
  // Se existir token, adiciona no header Authorization
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;