import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

// Request interceptor
apiClient.interceptors.request.use(
  config => {
    // Ajouter un token d'authentification ici si nécessaire
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  response => response.data,
  error => {
    const errorMessage = error.response?.data?.error 
      || error.message 
      || 'Erreur inconnue';
    return Promise.reject(new Error(errorMessage));
  }
);

export default apiClient;