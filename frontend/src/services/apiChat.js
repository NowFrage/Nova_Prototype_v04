/**
 * Service pour gérer les appels API liés au chat
 */
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const chatService = {
  async sendMessage(message, modelId) {
    try {
      const response = await axios.post(`${API_URL}/chat/messages`, {
        content: message,
        modelId,
      });
      return response.data;
    } catch (error) {
      console.error('Erreur API:', error);
      throw new Error("Erreur lors de l'appel à l'API");
    }
  },
};